import about from './me.json';
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

export const mainHint = 'Use arrow keys. Return to view page.';
export const linkHint = 'Use arrow keys. Return to open link.';