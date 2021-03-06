import { prompt } from './vendor/prompts';
import { green, dim, italic, reset, red } from 'turbocolor';
import { readAbout, onlyUnix, mainHint, linkHint } from './utils';
import { h, linksToChoices, companyToLine, emojify, skillList, signature, hr } from './format';
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
    const about = await readAbout();
    console.clear();

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
        ],
        hint: mainHint
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
                content: about.about.replace(/\n/g, '\n  ')
            });
            sections.push({
                title: 'Career',
                content: [...about.companies].map((c, i) => companyToLine(c, i === 0))
            });
            sections.push({
                title: 'hr',
                content: ''
            });
            sections.push({
                title: 'Development Skills',
                content: skillList(about.skills.development)
            });
            sections.push({
                title: 'Design Skills',
                content: skillList(about.skills.design)
            });
            sections.push({
                title: 'Personal Skills',
                content: about.skills.personal.map((item) => `- ${item}`).join('\n  ')
            });

            signature();

            sections.forEach(({ title, content }, i) => {
                if (title === 'hr') {
                    hr();
                } else {
                    console.log(h(title));
    
                    if (Array.isArray(content)) {
                        content.forEach(c => console.log('  ' + c));
                    } else {
                        console.log('  ' + content);
                    }
                    if (i !== sections.length - 1) { console.log(); }
                }
            });

            console.log('\n');

            break;
        case 'links':
            const links = {
                type: 'select',
                name: 'url',
                message: 'Links',
                choices: linksToChoices(about.links),
                hint: linkHint
            }
            result = await prompt(links, { onCancel });
            break;
        case 'oss':
            const oss = {
                type: 'select',
                name: 'url',
                message: 'Open Source',
                choices: linksToChoices(about.oss),
                hint: linkHint
            }
            result = await prompt(oss, { onCancel });
            break;
        case 'projects':
            const projects = {
                type: 'select',
                name: 'url',
                message: 'Projects',
                choices: linksToChoices(about.projects),
                hint: linkHint
            }
            result = await prompt(projects, { onCancel });
            break;
    }

    if (result && result.url) {
        if (result.url === 'back') {
            return Promise.resolve(true);
        } else {
            open(result.url, { wait: false });
            return Promise.resolve();
        }
    }
    
    return Promise.resolve();
};

async function run() {
    try {
        const skipBack = await main();
        if (skipBack) {
            run();
        } else {
            await back();
        }
    } catch (err) {
        console.log(red('Please ensure you are using a recent LTS version of Node\n'));
        console.error(err);
    }
}

run();