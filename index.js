const core = require('@actions/core');
const Dates = require('./dates');
const CheckCertificate = require('./tasks/check-certificate');
const CheckPaidTillDate = require('./tasks/check-paid-till-date');

try {
    /**
     * Site domain to be checked
     * @type {string}
     */
    const URL = core.getInput('url');
    // const URL = 'https://codex.so';

    CheckCertificate(URL)
        .then(date => {
            core.setOutput("ssl-expire-date", date.toString());
            core.setOutput("ssl-expire-days-left", Dates.countDays(date));

            console.log(`SSL: ${Dates.countDays(date)} days left — ssl cert valid till: ${date.toString()}`);
        })

    CheckPaidTillDate(URL)
        .then(date => {
            core.setOutput("paid-till-date", date.toString());
            core.setOutput("paid-till-days-left", Dates.countDays(date));

            console.log(`PAID: ${Dates.countDays(date)} days left — paid till: ${date.toString()}`);
        });
} catch (error) {
    core.setFailed(error.message);
}