import { prompt } from './vendor/prompts';
import { bold } from 'turbocolor';
import { readAbout, linksToChoices, emojify } from './utils';
import open from 'opn';


async function run() {
    const about = await readAbout();

    console.log();
    console.log(bold(`${about.name}\n`));

    const menu = {
        type: 'select',
        name: 'selected',
        message: `Explore`,
        choices: [
            { title: emojify('Links', '🌐'), value: 'links' },
            { title: emojify('Open Source', '🛠'), value: 'oss' }
        ]
    }    
    const { selected } = await prompt(menu);

    let result: null | { url: string } = null;
    switch (selected) {
        case 'links':
            const links = {
                type: 'select',
                name: 'url',
                message: 'Open URL',
                choices: linksToChoices(about.links)
            }
            result = await prompt(links);
            break;
        case 'oss':
            const oss = {
                type: 'select',
                name: 'url',
                message: 'View Project',
                choices: linksToChoices(about.oss)
            }
            result = await prompt(oss);
            break;
    }

    if (result && result.url) {
        open(result.url);
        setTimeout(() => process.exit(), 500);
    }
    
    return;
};

run();