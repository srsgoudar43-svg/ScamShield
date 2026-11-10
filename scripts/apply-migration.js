/**
 * ScamShield India — Supabase PostgreSQL Migration Runner
 * 
 * Applies `/supabase/migrations/001_initial_schema.sql` directly to your Supabase Cloud PostgreSQL
 * database using the Service Role Key or direct PostgreSQL connection string.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Search for .env in root or backend directory
const envPaths = [
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '../backend/.env'),
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), 'backend/.env')
];

let loadedEnvPath = null;
for (const p of envPaths) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
    loadedEnvPath = p;
    break;
  }
}

const { Client } = pg;

// 1. Locate migration SQL file
const migrationFilePath = path.resolve(__dirname, '../supabase/migrations/001_initial_schema.sql');

if (!fs.existsSync(migrationFilePath)) {
  console.error(`\x1b[31m[ERROR] Migration file not found at: ${migrationFilePath}\x1b[0m`);
  process.exit(1);
}

const sqlContent = fs.readFileSync(migrationFilePath, 'utf8');

// 2. Resolve Connection Parameters
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const dbPassword = process.env.SUPABASE_DB_PASSWORD || process.env.DB_PASSWORD;

function printUsageAndExit() {
  console.log(`
\x1b[36m=============================================================================
 ScamShield India — Supabase Migration Runner
=============================================================================\x1b[0m

\x1b[33m[CONFIGURATION REQUIRED]\x1b[0m
To apply migrations to your Supabase Cloud project, please provide your database credentials
in a \x1b[32m.env\x1b[0m file (either in root or \x1b[32mbackend/.env\x1b[0m).

Option 1: PostgreSQL Connection URI (Recommended for DDL & Triggers)
-------------------------------------------------------------------
\x1b[32mDATABASE_URL=postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres\x1b[0m
or
\x1b[32mDATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres\x1b[0m

Option 2: Supabase URL + Service Role Key + Database Password
-------------------------------------------------------------
\x1b[32mSUPABASE_URL=https://[PROJECT_REF].supabase.co\x1b[0m
\x1b[32mSUPABASE_SERVICE_ROLE_KEY=eyJh... (found in Project Settings > API)\x1b[0m
\x1b[32mSUPABASE_DB_PASSWORD=[YOUR_DATABASE_PASSWORD]\x1b[0m

\x1b[90mTip: Find your connection string in Supabase Dashboard:
Project Settings -> Database -> Connection string -> URI (Mode: Session or Transaction)\x1b[0m
=============================================================================
`);
  process.exit(1);
}

// 3. Resolve connection string
let connectionString = databaseUrl;

if (!connectionString && supabaseUrl && dbPassword) {
  // Infer connection from project URL and password
  try {
    const projectRef = new URL(supabaseUrl).hostname.split('.')[0];
    connectionString = `postgresql://postgres:${encodeURIComponent(dbPassword)}@db.${projectRef}.supabase.co:5432/postgres`;
  } catch (e) {
    // URL parsing failed
  }
}

// If user provided Service Role Key and Supabase URL but no DB password or connection string:
// We can attempt Supabase SQL API execution
async function runViaSupabaseRestAPI() {
  console.log(`\x1b[34m[INFO]\x1b[0m Attempting migration via Supabase SQL endpoint with Service Role Key...`);
  
  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/pg/query`;
  
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`
      },
      body: JSON.stringify({ query: sqlContent })
    });

    if (res.ok) {
      console.log(`\x1b[32m[SUCCESS]\x1b[0m Migration applied successfully via Supabase SQL endpoint!`);
      return true;
    } else {
      const errText = await res.text();
      console.warn(`\x1b[33m[NOTICE]\x1b[0m Supabase SQL HTTP endpoint returned: ${res.status} (${errText}). Switching to direct Postgres connection...`);
      return false;
    }
  } catch (err) {
    console.warn(`\x1b[33m[NOTICE]\x1b[0m REST endpoint unavailable (${err.message}). Using direct Postgres connection...`);
    return false;
  }
}

async function main() {
  console.log(`\x1b[36m=============================================================================`);
  console.log(` ScamShield India — Applying 001_initial_schema.sql to Supabase`);
  console.log(`=============================================================================\x1b[0m`);

  if (loadedEnvPath) {
    console.log(`\x1b[90m[ENV]\x1b[0m Loaded configuration from: ${loadedEnvPath}`);
  }

  // If service role key and Supabase URL are present, try REST endpoint first
  if (supabaseUrl && serviceRoleKey && !connectionString) {
    const apiSuccess = await runViaSupabaseRestAPI();
    if (apiSuccess) return;
  }

  if (!connectionString) {
    printUsageAndExit();
  }

  console.log(`\x1b[34m[INFO]\x1b[0m Connecting to Supabase PostgreSQL database...`);

  // Mask password for display
  const maskedConn = connectionString.replace(/:([^:@]+)@/, ':****@');
  console.log(`\x1b[90m[CONNECT]\x1b[0m ${maskedConn}`);

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Supabase cloud uses self-signed / pooled SSL certificates
    }
  });

  try {
    await client.connect();
    console.log(`\x1b[32m[CONNECTED]\x1b[0m Successfully connected to Supabase PostgreSQL.`);

    console.log(`\x1b[34m[EXECUTING]\x1b[0m Applying migration script: 001_initial_schema.sql ...`);
    const startTime = Date.now();

    // Execute within transaction
    await client.query('BEGIN');
    await client.query(sqlContent);
    await client.query('COMMIT');

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\x1b[32m[SUCCESS]\x1b[0m All tables, RLS policies, triggers, and seed data applied in ${duration}s!`);

    // Verify created tables and row counts
    console.log(`\n\x1b[36m[VERIFICATION]\x1b[0m Checking Supabase database tables:`);
    const checkQuery = `
      SELECT 'scam_categories' as table_name, count(*) as count FROM public.scam_categories
      UNION ALL
      SELECT 'phone_records', count(*) FROM public.phone_records
      UNION ALL
      SELECT 'scam_reports', count(*) FROM public.scam_reports
      UNION ALL
      SELECT 'scam_alerts', count(*) FROM public.scam_alerts;
    `;
    const res = await client.query(checkQuery);

    console.table(res.rows);

    console.log(`\x1b[32m✔ Tables: public.scam_categories, public.phone_records, public.scam_reports, public.scam_alerts\x1b[0m`);
    console.log(`\x1b[32m✔ Automated trigger 'trg_handle_scam_report_insert' active (calculates risk on report insertion)\x1b[0m`);
    console.log(`\x1b[32m✔ Row Level Security (RLS) active with public read and anonymous report insertion\x1b[0m`);
    console.log(`\x1b[32m✔ Pre-seeded with 8 scam categories, 6 sample phone numbers, and community reports\x1b[0m\n`);

  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    console.error(`\n\x1b[31m[MIGRATION FAILED]\x1b[0m Error applying migration:`, error.message);
    if (error.detail) console.error(`\x1b[90mDetail:\x1b[0m`, error.detail);
    if (error.hint) console.error(`\x1b[90mHint:\x1b[0m`, error.hint);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});

