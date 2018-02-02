#!/usr/bin/env node

const Helper = require('./helper/lmHelper');

const vorpal = require('vorpal')();
if (parseInt(process.version.substr(1, 2)) < 6) {
    console.error('Please use node version >= 6');
    process.exit(1);
}
const versionArg = ['-v', '-V', '--version'];

if (process.argv[2] !== 'new' && versionArg.indexOf(process.argv[2]) === -1) {
    if (!Helper.Project.isInProjectDirectory()) {
        console.log('Please go to a valid jovo project.');
        process.exit(1);
    }
}


if (process.argv.length <= 2) {
    console.log('help + examples');
} else if (process.argv.length === 3 &&
    (versionArg.indexOf(process.argv[2]) > -1)) {
    console.log('Jovo CLI Version: ' + require('./package').version);
} else {
    vorpal
        .use(require('./commands/new.js'))
        .use(require('./commands/init.js'))
        .use(require('./commands/build.js'))
        .use(require('./commands/deploy.js'))
        .use(require('./commands/get.js'))
        .use(require('./commands/run.js'))
        .delimiter('')
        .show()
        .parse(process.argv);
}
