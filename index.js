const core = require('@actions/core');
const github = require('@actions/github');

import querystring from 'querystring';
import axios from 'axios';

/**
 * Message formatting styles
 * @type {string[]}
 */
const PARSE_MODE_STYLES = [
    '',
    'html',
    'markdown'
]

try {
    /**
     * Webhook url
     * @type {string}
     */
    const webhook = core.getInput('webhook');
    if (!webhook) {
        throw new Error('`webhook` param is missing');
    }

    /**
     * Message to send
     * @type {string}
     */
    const message = core.getInput('message');
    if (!message) {
        throw new Error('`message` param is missing');
    }

    /**
     * Message formatting style
     * @type {string}
     */
    const parse_mode = core.getInput('parse_mode');
    if (parse_mode && !PARSE_MODE_STYLES.includes(parse_mode.toLowerCase())) {
        throw new Error(`Bad \`parse_mode\` param. Use one of the following: ${PARSE_MODE_STYLES.join(', ')}`);
    }

    const disable_web_page_preview = core.getInput('disable_web_page_preview') || false;

    axios({
        method: 'POST',
        url: webhook,
        data: querystring.stringify({
            message,
            parse_mode,
            disable_web_page_preview,
        })
    })
        .then(response => {
            core.setOutput("response-body", response.data);
            core.setOutput("response-code", response.status);
        })
        .catch(error => {
            core.setFailed(error.message);
        });
} catch (error) {
    core.setFailed(error.message);
}