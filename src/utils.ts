import { join } from 'path';
import { promisify } from 'util';
import { readFile as _readFile } from 'fs';
const readFile = promisify(_readFile);

import { dim } from 'turbocolor';
import { About, Link } from './models';

export function readAbout(): Promise<About> {
    return readFile(join('dist', 'me.json'))
        .then(buffer => JSON.parse(buffer.toString()));
}

export function linksToChoices(links: { [key: string]: Link }) {
    return Object.entries(links).map(([name, data]) => ({ title: `${name} ${dim(data.text)}`, value: data.url }));
}

export function emojify(str: string, emoji: string): string {
    return onlyUnix(`${emoji}  `) + str;
}

export function isWin() {
    return process.platform === 'win32';
}
export function onlyUnix(str: string) {
    return !isWin() ? str : '';
}