import { resolve } from 'path';
import { cwd } from 'process';
import { promisify } from 'util';
import { readFile as _readFile } from 'fs';
const readFile = promisify(_readFile);

import { About } from './models';

export function readAbout(): Promise<About> {
    return readFile(resolve(cwd(), 'me.json'))
        .then(buffer => JSON.parse(buffer.toString()));
}

export function isWin() {
    return process.platform === 'win32';
}
export function onlyUnix(str: string) {
    return !isWin() ? str : '';
}