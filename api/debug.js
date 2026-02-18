import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdirSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function handler(req, res) {
  let structure = {};

  try {
    structure['cwd'] = readdirSync(process.cwd());
    structure['api_dirname'] = readdirSync(__dirname);
    structure['api_lib_check'] = existsSync(join(__dirname, '_lib'))
      ? readdirSync(join(__dirname, '_lib'))
      : 'No _lib found';
  } catch (e) {
    structure['error'] = e.message;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    message: "FS Debug v3",
    env: process.env.NODE_ENV,
    structure
  }, null, 2));
}
