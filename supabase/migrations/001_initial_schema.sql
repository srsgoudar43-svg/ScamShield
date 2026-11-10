-- ==============================================================================
-- ScamShield India — Supabase PostgreSQL Initial Database Schema
-- Migration: 001_initial_schema.sql
-- Description: Core tables, automated risk triggers, RLS policies, and seed data.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. SCAM CATEGORIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.scam_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT DEFAULT 'ShieldAlert',
    severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.scam_categories IS 'Taxonomy of telecom and digital fraud categories targeting Indian citizens.';

-- ==============================================================================
-- 2. PHONE RECORDS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.phone_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    formatted_number VARCHAR(25) NOT NULL,
    carrier VARCHAR(100),
    circle VARCHAR(100),
    risk_score INT NOT NULL DEFAULT 10 CHECK (risk_score >= 0 AND risk_score <= 100),
    risk_level VARCHAR(20) NOT NULL DEFAULT 'SAFE' CHECK (risk_level IN ('CRITICAL', 'HIGH', 'SUSPICIOUS', 'MODERATE', 'SAFE')),
    category_id TEXT REFERENCES public.scam_categories(id) ON DELETE SET NULL,
    caller_name VARCHAR(255),
    report_count INT NOT NULL DEFAULT 0 CHECK (report_count >= 0),
    monetary_loss_reported BOOLEAN NOT NULL DEFAULT FALSE,
    reasons TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.phone_records IS 'Aggregated telecom phone records with computed fraud risk scores and telemetry.';

-- ==============================================================================
-- 3. SCAM REPORTS TABLE (COMMUNITY SUBMISSIONS)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.scam_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_record_id UUID REFERENCES public.phone_records(id) ON DELETE CASCADE,
    phone_number VARCHAR(15) NOT NULL,
    category_id TEXT REFERENCES public.scam_categories(id) ON DELETE SET NULL,
    caller_claimed VARCHAR(255),
    location VARCHAR(100),
    loss_incurred BOOLEAN DEFAULT FALSE NOT NULL,
    loss_amount VARCHAR(100),
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'verified' NOT NULL CHECK (status IN ('pending', 'verified', 'flagged')),
    ip_hash VARCHAR(64),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.scam_reports IS 'Individual citizen scam incident reports and modus operandi transcripts.';

-- ==============================================================================
-- 4. SCAM ALERTS TABLE (NATIONAL CYBER THREAT BULLETIN)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.scam_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    advice TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.scam_alerts IS 'National threat bulletin entries warning citizens of active scam syndicates.';

-- ==============================================================================
-- 5. PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_phone_records_number ON public.phone_records(phone_number);
CREATE INDEX IF NOT EXISTS idx_phone_records_risk ON public.phone_records(risk_score DESC);
CREATE INDEX IF NOT EXISTS idx_phone_records_category ON public.phone_records(category_id);
CREATE INDEX IF NOT EXISTS idx_scam_reports_phone ON public.scam_reports(phone_number);
CREATE INDEX IF NOT EXISTS idx_scam_reports_created_at ON public.scam_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scam_alerts_active ON public.scam_alerts(is_active);

-- ==============================================================================
-- 6. AUTOMATED TIMESTAMP & RISK ASSESSMENT TRIGGERS
-- ==============================================================================

-- Trigger to maintain updated_at on phone_records
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_phone_records_updated_at ON public.phone_records;
CREATE TRIGGER trg_phone_records_updated_at
BEFORE UPDATE ON public.phone_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to automatically update or create phone_records whenever a scam_report is inserted
CREATE OR REPLACE FUNCTION public.handle_new_scam_report()
RETURNS TRIGGER AS $$
DECLARE
    v_record_id UUID;
    v_current_score INT;
    v_new_score INT;
    v_new_level VARCHAR(20);
    v_category_name TEXT;
BEGIN
    -- Resolve category display name
    SELECT name INTO v_category_name FROM public.scam_categories WHERE id = NEW.category_id;
    IF v_category_name IS NULL THEN
        v_category_name := 'Suspicious Fraudulent Call';
    END IF;

    -- Check if record already exists
    SELECT id, risk_score INTO v_record_id, v_current_score 
    FROM public.phone_records 
    WHERE phone_number = NEW.phone_number;

    IF FOUND THEN
        -- Recalculate score (boost score dynamically)
        v_new_score := LEAST(99, GREATEST(v_current_score + 12, 75));
        IF NEW.loss_incurred THEN
            v_new_score := LEAST(99, v_new_score + 8);
        END IF;

        IF v_new_score >= 80 THEN
            v_new_level := 'CRITICAL';
        ELSIF v_new_score >= 50 THEN
            v_new_level := 'HIGH';
        ELSE
            v_new_level := 'SUSPICIOUS';
        END IF;

        -- Update existing record
        UPDATE public.phone_records
        SET 
            report_count = report_count + 1,
            risk_score = v_new_score,
            risk_level = v_new_level,
            monetary_loss_reported = monetary_loss_reported OR NEW.loss_incurred,
            category_id = COALESCE(NEW.category_id, category_id),
            caller_name = COALESCE(NEW.caller_claimed, caller_name),
            reasons = array_append(reasons, 'Citizen reported: ' || LEFT(NEW.description, 80) || '...'),
            updated_at = NOW()
        WHERE id = v_record_id;

        -- Attach the report to the phone_record_id
        NEW.phone_record_id := v_record_id;
    ELSE
        -- Calculate initial score for newly reported number
        v_new_score := CASE WHEN NEW.loss_incurred THEN 84 ELSE 72 END;
        v_new_level := CASE WHEN v_new_score >= 80 THEN 'CRITICAL' ELSE 'HIGH' END;

        -- Insert new phone record
        INSERT INTO public.phone_records (
            phone_number,
            formatted_number,
            carrier,
            circle,
            risk_score,
            risk_level,
            category_id,
            caller_name,
            report_count,
            monetary_loss_reported,
            reasons
        ) VALUES (
            NEW.phone_number,
            '+91 ' || SUBSTRING(NEW.phone_number FROM 1 FOR 5) || ' ' || SUBSTRING(NEW.phone_number FROM 6 FOR 5),
            'Indian Telecom',
            COALESCE(NEW.location, 'National Circle'),
            v_new_score,
            v_new_level,
            NEW.category_id,
            COALESCE(NEW.caller_claimed, 'Flagged Caller'),
            1,
            NEW.loss_incurred,
            ARRAY[
                'Newly reported by citizen under ' || v_category_name || '.',
                CASE WHEN NEW.loss_incurred THEN 'Financial loss reported during interaction.' ELSE 'Unsolicited fraudulent solicitation reported.' END
            ]
        ) RETURNING id INTO v_record_id;

        NEW.phone_record_id := v_record_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_handle_scam_report_insert ON public.scam_reports;
CREATE TRIGGER trg_handle_scam_report_insert
BEFORE INSERT ON public.scam_reports
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_scam_report();

-- ==============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.scam_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phone_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scam_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scam_alerts ENABLE ROW LEVEL SECURITY;

-- Scam Categories Policies
CREATE POLICY "Allow public read access on scam_categories"
ON public.scam_categories
FOR SELECT
TO anon, authenticated
USING (true);

-- Phone Records Policies
CREATE POLICY "Allow public read access on phone_records"
ON public.phone_records
FOR SELECT
TO anon, authenticated
USING (true);

-- Scam Reports Policies (Public can read verified reports and submit new reports)
CREATE POLICY "Allow public read access on verified scam_reports"
ON public.scam_reports
FOR SELECT
TO anon, authenticated
USING (status = 'verified');

CREATE POLICY "Allow citizen anonymous insert on scam_reports"
ON public.scam_reports
FOR INSERT
TO anon, authenticated
WITH CHECK (
    char_length(phone_number) = 10 AND 
    char_length(description) >= 15
);

-- Scam Alerts Policies
CREATE POLICY "Allow public read access on active scam_alerts"
ON public.scam_alerts
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- ==============================================================================
-- 8. SEED DATA (REALISTIC INDIAN SCAM TELEMETRY)
-- ==============================================================================

-- Insert Categories
INSERT INTO public.scam_categories (id, name, icon, severity, description)
VALUES
    ('digital_arrest', 'Digital Arrest / Police Impersonation', 'ShieldAlert', 'critical', 'Fraudsters impersonating CBI, ED, Mumbai Police, or Customs threatening arrest over fake parcels or illegal transactions.'),
    ('bank_kyc', 'Fake Bank KYC / Account Expiry', 'CreditCard', 'critical', 'Urgent SMS or call claiming SBI, HDFC, or ICICI account is suspended unless PAN/Aadhaar is updated via phishing links or APK downloads.'),
    ('otp_upi', 'OTP & UPI Refund / Request Fraud', 'KeyRound', 'high', 'Tricking victims into entering their UPI PIN on "Receive Money" requests, or sharing 6-digit OTPs under false pretenses.'),
    ('fake_job', 'Fake Job & Part-Time Task Scam', 'Briefcase', 'high', 'Promises of ₹3,000 - ₹10,000 daily for liking YouTube videos or reviewing Google maps, leading to prepaid crypto deposit traps.'),
    ('electricity_bill', 'Electricity / Utility Disconnection Alert', 'ZapOff', 'high', 'Urgent SMS threatening power disconnection tonight unless an overdue bill is paid to a private mobile number.'),
    ('lottery_gift', 'Lottery, Gift & KBC Prize Fraud', 'Gift', 'medium', 'Bogus notices claiming the recipient has won ₹25 Lakhs or a luxury vehicle, requiring advance tax or processing fees.'),
    ('loan_app', 'Instant Loan & Blackmail Apps', 'Coins', 'critical', 'Predatory lending apps that harvest phone contacts and extort users with morphed photos.'),
    ('courier_customs', 'FedEx / DHL Customs Seizure Fraud', 'Package', 'high', 'Automated robocall claiming a parcel sent to Taiwan or UAE containing passports and contraband was intercepted.')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    icon = EXCLUDED.icon,
    severity = EXCLUDED.severity,
    description = EXCLUDED.description;

-- Insert Seed Phone Records
INSERT INTO public.phone_records (
    id, phone_number, formatted_number, carrier, circle, risk_score, risk_level, category_id, caller_name, report_count, monetary_loss_reported, reasons
) VALUES 
    (
        '00000000-0000-0000-0000-000000000001',
        '9876543210',
        '+91 98765 43210',
        'Bharti Airtel',
        'Delhi NCR',
        96,
        'CRITICAL',
        'digital_arrest',
        'Claimed: CBI Cyber Cell New Delhi',
        142,
        TRUE,
        ARRAY[
            'Over 140 community complaints within 72 hours.',
            'Caller uses threats of "immediate arrest warrant" and demands Skype video interrogation.',
            'Associated with fake courier seizure threats (FedEx parcel containing narcotics).',
            'Requests victims to liquidate mutual funds into "RBI verification escrow accounts".'
        ]
    ),
    (
        '00000000-0000-0000-0000-000000000002',
        '9123456789',
        '+91 91234 56789',
        'Reliance Jio',
        'Maharashtra & Goa',
        92,
        'CRITICAL',
        'bank_kyc',
        'Claimed: SBI YONO Head Office Helpdesk',
        89,
        TRUE,
        ARRAY[
            'Sending spoofed SMS with malicious .apk file download links.',
            'Falsely claims debit card or net banking will be deactivated within 24 hours.',
            'Directs users to fake SBI YONO clone login portals to steal credentials.'
        ]
    ),
    (
        '00000000-0000-0000-0000-000000000003',
        '8899011223',
        '+91 88990 11223',
        'Vodafone Idea (Vi)',
        'Uttar Pradesh (West)',
        88,
        'HIGH',
        'electricity_bill',
        'Claimed: State Electricity Board Officer',
        64,
        FALSE,
        ARRAY[
            'Bulk SMS campaign warning power will be disconnected at 9:30 PM.',
            'Asks users to pay ₹10 or ₹15 token amount via a phishing payment portal to restore connection.',
            'Uses urgent psychological pressure to force hasty transactions.'
        ]
    ),
    (
        '00000000-0000-0000-0000-000000000004',
        '7001122334',
        '+91 70011 22334',
        'Reliance Jio',
        'Karnataka',
        68,
        'SUSPICIOUS',
        'fake_job',
        'Claimed: Global HR Talent Coordinator',
        31,
        TRUE,
        ARRAY[
            'Unsolicited WhatsApp messaging promising ₹150 per YouTube video liked.',
            'Transitions victim into a Telegram group with fake testimonials.',
            'Requires "prepaid security deposit" for VIP earning tasks that cannot be withdrawn.'
        ]
    ),
    (
        '00000000-0000-0000-0000-000000000005',
        '9455667788',
        '+91 94556 67788',
        'BSNL Mobile',
        'West Bengal',
        54,
        'SUSPICIOUS',
        'otp_upi',
        'Claimed: PhonePe Merchant Support',
        18,
        FALSE,
        ARRAY[
            'Sends QR code claiming user has won a cashback reward.',
            'Prompts user to scan QR and enter their UPI PIN to "receive" funds.',
            'Mimics official digital wallet support representatives.'
        ]
    ),
    (
        '00000000-0000-0000-0000-000000000006',
        '9820012345',
        '+91 98200 12345',
        'Bharti Airtel',
        'Mumbai',
        8,
        'SAFE',
        NULL,
        'Standard Subscriber Line',
        0,
        FALSE,
        ARRAY[
            'Zero community fraud reports recorded.',
            'Consistent carrier registration with normal calling patterns.',
            'No association with phishing URLs, SMS spam blasts, or impersonation complaints.'
        ]
    )
ON CONFLICT (phone_number) DO UPDATE SET
    risk_score = EXCLUDED.risk_score,
    risk_level = EXCLUDED.risk_level,
    caller_name = EXCLUDED.caller_name,
    report_count = EXCLUDED.report_count,
    reasons = EXCLUDED.reasons;

-- Insert Seed Incident Reports
INSERT INTO public.scam_reports (
    id, phone_record_id, phone_number, category_id, caller_claimed, location, loss_incurred, loss_amount, description, status, created_at
) VALUES 
    (
        '10000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000001',
        '9876543210',
        'digital_arrest',
        'Inspector Vikram Rathore (CBI)',
        'New Delhi',
        TRUE,
        'Attempted ₹3.5 Lakhs (Blocked)',
        'Received a video call on WhatsApp. Man in police uniform claimed a parcel under my Aadhaar was caught at Mumbai airport with drugs. Demanded I stay on video and transfer money to verify.',
        'verified',
        NOW() - INTERVAL '14 minutes'
    ),
    (
        '10000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000001',
        '9876543210',
        'digital_arrest',
        'Customs Department Officer',
        'Bengaluru',
        FALSE,
        'None (Hung up)',
        'Automated interactive voice response said "Press 9 to speak with customs officer". Then an aggressive man demanded my Aadhaar number.',
        'verified',
        NOW() - INTERVAL '2 hours'
    ),
    (
        '10000000-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000002',
        '9123456789',
        'bank_kyc',
        'SBI NetBanking Support',
        'Mumbai',
        TRUE,
        '₹84,000 lost',
        'Got an SMS saying "Dear SBI user, your YONO account is locked. Update PAN immediately via bit.ly/sbi-pan-update". Called this number and was asked for OTP.',
        'verified',
        NOW() - INTERVAL '42 minutes'
    ),
    (
        '10000000-0000-0000-0000-000000000004',
        '00000000-0000-0000-0000-000000000003',
        '8899011223',
        'electricity_bill',
        'Electricity Officer RK Verma',
        'Lucknow',
        FALSE,
        'Attempted ₹1,200',
        'Message said: "Dear customer your electricity power will be disconnected tonight at 9.30pm from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer 8899011223".',
        'verified',
        NOW() - INTERVAL '1 hour'
    )
ON CONFLICT (id) DO NOTHING;

-- Insert Seed National Alerts
INSERT INTO public.scam_alerts (id, title, category, severity, advice, is_active)
VALUES 
    (
        '20000000-0000-0000-0000-000000000001',
        'Surge in "Digital Arrest" Video Calls Impersonating CBI & Customs',
        'Impersonation',
        'critical',
        'Never join a video call demanding payment for legal clearance. Police and CBI do not arrest citizens via Skype or WhatsApp.',
        TRUE
    ),
    (
        '20000000-0000-0000-0000-000000000002',
        'Fake "Electricity Bill Not Updated" SMS with Malicious Helpline Numbers',
        'Utility Fraud',
        'high',
        'Electricity distribution companies (DISCOMs) never send personal 10-digit mobile numbers for overdue bill settlements.',
        TRUE
    ),
    (
        '20000000-0000-0000-0000-000000000003',
        'Work-from-Home Telegram Groups Promising ₹5,000/day for Simple Tasks',
        'Job Scam',
        'high',
        'Any job asking you to deposit money or recharge a wallet to withdraw earnings is guaranteed fraud.',
        TRUE
    ),
    (
        '20000000-0000-0000-0000-000000000004',
        'Bank APK Malware ("SBI_Reward.apk") Circulating via WhatsApp',
        'Malware / APK',
        'critical',
        'Never install .apk files received via WhatsApp or SMS. Banks only distribute official apps through Google Play Store and Apple App Store.',
        TRUE
    )
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- END OF MIGRATION 001_initial_schema.sql
-- ==============================================================================

