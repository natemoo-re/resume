import { resolve } from 'path';
import { cwd } from 'process';
import { promisify } from 'util';
import { readFile as _readFile } from 'fs';
import about from './me.json';
const readFile = promisify(_readFile);

import { About } from './models';

export function readAbout(): Promise<About> {
    return Promise.resolve(about);
}

export function isWin() {
    return process.platform === 'win32';
}
export function onlyUnix(str: string) {
    return !isWin() ? str : '';
}