const parser = require('parse-whois');
const whois = require('node-whois');

const KEYS = [
    'Registry Expiry Date',
    'paid-till'
];

function getDatePaidTill(domain) {
    domain = (new URL(domain)).host;

    return new Promise((resolve, reject) => {
        whois.lookup(domain, function (err, data) {
            if (err) reject(err);

            const parsedData = parser.parseWhoIsData(data);
            let paidTillDate;

            for (const [key, param] of Object.entries(parsedData)) {
                if (KEYS.includes(param['attribute'].trim())) {
                    paidTillDate = new Date(param.value);
                    break;
                }
            }

            if (!paidTillDate) reject(new Error(`No date was found. Domain: ${domain}`));

            resolve(paidTillDate);
        });
    });
}

module.exports = getDatePaidTill;