import { prompt } from './vendor/prompts';
import { dim } from 'turbocolor';
import { readAbout } from './utils';




async function run() {
    const about = await readAbout();
    console.log();
    console.log(`You have reached the digital resume of ${about.name}!`);
    // console.log(about);
    // const menu = {
    //     type: 'select',
    //     name: 'selected',
    //     message: 'What would you like to see?',
    //     choices: [
    //         { title: `Social ${dim('Links')}`, value: 'social' },
    //         { title: `Projects ${dim('Sites')}`, value: 'projects' },
    //         { title: `Open Source ${dim('Github, NPM')}`, value: 'oss' },
    //     ]
    // }

    // const { selected } = await prompt(menu);
    // console.log(selected);
};

run();