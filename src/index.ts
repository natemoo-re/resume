import { prompt } from './vendor/prompts';
import { bold } from 'turbocolor';
import { readAbout, linksToChoices } from './utils';
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
            { title: `links`, value: 'links' },
            { title: `projects`, value: 'projects' }
        ]
    }
    const { selected } = await prompt(menu);

    switch (selected) {
        case 'links':
            const links = {
                type: 'select',
                name: 'url',
                message: 'Open URL',
                choices: linksToChoices(about.links)
            }
            const { url } = await prompt(links);
            open(url);
            process.exit();
            break;
        case 'projects':
            console.log('Coming soon...');
            break;
    }
    
    return;
};

run();