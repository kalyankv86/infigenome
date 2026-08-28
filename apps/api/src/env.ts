import {existsSync} from 'node:fs';

// Load apps/api/.env when present (local dev). In production real env vars win.
if(existsSync('.env'))process.loadEnvFile('.env');
