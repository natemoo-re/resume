import { dim, bold, green, cyan } from 'turbocolor';
import { onlyUnix } from './utils';
import { Company, Link } from './models';

export function h(str: string): string {
    return `${cyan('■')} ${bold(str)}`;
}

export function linksToChoices(links: { [key: string]: Link }) {
    return Object.entries(links).map(([name, data]) => ({ title: `${name} ${dim(data.text)}`, value: data.url }));
}

export function companyToLine({ company, role, time }: Company, isCurrent = false) {
    const line = `${bold(role)} at ${bold(company)}`.padEnd(80 - time.length) + `${dim(time)}`
    return isCurrent ? green(line) : line;
}

export function emojify(str: string, emoji: string): string {
    return onlyUnix(`${emoji}  `) + str;
}

export function parens(str: string): string {
    return `(${str})`;
}