import { join } from 'path';
import { promisify } from 'util';
import { readFile as _readFile } from 'fs';
const readFile = promisify(_readFile);

import { About } from './models';

export function readAbout(): Promise<About> {
    return readFile(join('dist', 'me.json'))
        .then(buffer => JSON.parse(buffer.toString()));
}