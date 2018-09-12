import { prompt } from './vendor/prompts';
import { dim, bold } from 'turbocolor';
import { readAbout } from './utils';
import open from 'opn';


async function run() {
    const about = await readAbout();

    console.log();
    console.log(bold(`${about.name}'s digital card\n`));

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
                choices: Object.entries(about.links).map(([platform, data]) => ({ title: `${platform} ${dim(data.text)}`, value: data.url }))
            }
            const { url } = await prompt(links);
            return open(url);
        case 'projects':
            console.log('Coming soon...');
            break;
    }
    
    return;
};

run();