const https = require('https');

function checkCertificate(domain) {
    return new Promise((resolve, reject) => {
        https.get(domain, {agent: false}, response => {
            const certificate = response.connection.getPeerCertificate();
            if (!certificate.valid_to) reject(new Error(`Cannot get certificate date valid to for domain ${domain}`));

            resolve(new Date(certificate.valid_to));

        })
            .on('error', reject);
    });
}

module.exports = checkCertificate;