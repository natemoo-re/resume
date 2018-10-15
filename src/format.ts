import { dim, bold, green, cyan } from 'turbocolor';
import { onlyUnix } from './utils';
import { Company, Link } from './models';

const width = 120;
export function signature() {
    const one = ` _       __   _____  ____      _      ___   ___   ___   ____ `;
    const two = `| |\\ |  / /\\   | |  | |_      | |\\/| / / \\ / / \\ | |_) | |_  `;
    const three = `|_| \\| /_/--\\  |_|  |_|__     |_|  | \\_\\_/ \\_\\_/ |_| \\ |_|__ `;
    const pad = (width - one.length) / 2;
    for (let ln of [one, two, three]) {
        console.log('  ' + dim(ln));
    }
    console.log('\n');
}

export function hr() {
    console.log(dim('  ' + '-'.repeat(width - 18)) + '\n');
}

export function h(str: string): string {
    return `${cyan('■')} ${bold(str)}`;
}

export function linksToChoices(links: { [key: string]: Link }) {
    return [...Object.entries(links).map(([name, data]) => ({ title: `${name} ${dim(data.text)}`, value: data.url })), { title: dim('Back'), value: 'back' }];
}

export function companyToLine({ company, role, time, description }: Company, isCurrent = false) {
    const line = `${bold(role)} at ${bold(company)}`.padEnd(width - time.length) + `${dim(time)}`
    return (isCurrent ? green(line) : line) + `\n\n${description}`.replace(/\n/g, '\n  ') + '\n';
}

export function skillList(skills: { [key: string]: string[] }) {
    return Object.entries(skills).map(([title, list]) => {
        const items = `${dim(list.map(x => x).join(', '))}`;
        return `${title.padEnd((width - 9) - items.length)}${items}`;
    }).join('\n  ');
}

export function emojify(str: string, emoji: string): string {
    return onlyUnix(`${emoji}  `) + str;
}

export function parens(str: string): string {
    return `(${str})`;
}