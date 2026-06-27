import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Resolve the repository-root .env independently of cPanel's working directory.
dotenv.config({
  path: fileURLToPath(new URL('../../.env', import.meta.url)),
  quiet: true,
});
