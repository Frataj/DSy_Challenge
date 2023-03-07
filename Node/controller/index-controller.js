import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class IndexController {
    index(req, res) {
        res.sendFile(__dirname + '/twitter.html');
    };
}

export const indexController = new IndexController();
