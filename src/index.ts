import { spawn } from 'child_process';
import { prompt } from './vendor/prompts';
import { green, bold, dim, italic, reset } from 'turbocolor';
import { readAbout, onlyUnix } from './utils';
import { h, linksToChoices, companyToLine, emojify } from './format';
import open from 'opn';

const onCancel = () => {
    console.log(`\n  Thanks for taking the time to look around!${onlyUnix(' 🎉')}\n`);
    process.exit();
}

async function back() {
    console.log();
    const { value } = await prompt({
        type: 'toggle',
        name: 'value',
        message: '',
        initial: false,
        active: 'CLOSE',
        inactive: 'BACK'
    }, { onCancel });

    if (value === undefined) {
        process.exit();
    }
    return (!value) ? run() : onCancel();
}

async function main() {
    console.clear();
    const about = await readAbout();

    console.log();
    console.log(`${h(about.name)} is ${green(about.status)}`);
    console.log('  ' + dim('Get in touch at ' + italic(about.email) + reset('')));
    console.log();
    const menu = {
        type: 'select',
        name: 'selected',
        message: `Explore`,
        choices: [
            { title: emojify('About', 'ℹ️'), value: 'about' },
            { title: emojify('Links', '🌐'), value: 'links' },
            { title: emojify('Open Source', '📘'), value: 'oss' },
            { title: emojify('Projects', '💎'), value: 'projects' }
        ]
    }    
    const { selected } = await prompt(menu, { onCancel });

    let result: null | { url: string } = null;
    switch (selected) {
        case 'about':
            console.clear();
            console.log();

            const sections: { title: string, content: string | string[] }[] = [];

            sections.push({
                title: 'About',
                content: about.about
            });
            sections.push({
                title: 'Career',
                content: [...about.companies].map((c, i) => companyToLine(c, i === 0))
            });
            sections.push({
                title: 'Skills',
                content: [
                    `${bold(green('Design'))}  ` + [...about.skills.design].join(dim(' | ')),
                    `${bold(green('Development'))}  ` + [...about.skills.development].join(dim(' | '))
                ].join('\n  ')
            })

            sections.forEach(({ title, content }, i) => {
                console.log(h(title));

                if (Array.isArray(content)) {
                    content.forEach(c => console.log('  ' + c));
                } else {
                    console.log('  ' + content);
                }
                if (i !== sections.length - 1) { console.log(); }
            });

            break;
        case 'links':
            const links = {
                type: 'select',
                name: 'url',
                message: 'Links',
                choices: linksToChoices(about.links)
            }
            result = await prompt(links, { onCancel });
            break;
        case 'oss':
            const oss = {
                type: 'select',
                name: 'url',
                message: 'Open Source',
                choices: linksToChoices(about.oss)
            }
            result = await prompt(oss, { onCancel });
            break;
        case 'projects':
            const projects = {
                type: 'select',
                name: 'url',
                message: 'Projects',
                choices: linksToChoices(about.projects)
            }
            result = await prompt(projects, { onCancel });
            break;
    }

    if (result && result.url) {
        open(result.url, { wait: false });
        return Promise.resolve();
    }
    
    return Promise.resolve();
};

async function run() {
    await main();
    await back();
}

run();