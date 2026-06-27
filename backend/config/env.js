import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Load either deployment-root or backend-local settings without replacing
// environment variables configured directly by the hosting platform.
dotenv.config({ quiet: true });
dotenv.config({
  path: fileURLToPath(new URL('../.env', import.meta.url)),
  quiet: true,
});
