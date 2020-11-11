const core = require('@actions/core');
const github = require('@actions/github');

import querystring from 'querystring';
import axios from 'axios';

/**
 * Message formatting styles
 * @type {string[]}
 */
const PARSE_MODE_STYLES = [
    'HTML',
    'Markdown',
    'MarkdownV2'
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
    if (parse_mode && !PARSE_MODE_STYLES.includes(parse_mode)) {
        throw new Error(`Bad \`parse_mode\` param. Use one of the following: ${PARSE_MODE_STYLES.join(', ')}`);
    }

    const disable_web_page_preview = core.getInput('disable_web_page_preview');

    axios({
        method: 'POST',
        url: webhook,
        data: querystring.stringify({
            message: message,
            parse_mode: parse_mode,
            disable_web_page_preview: !!disable_web_page_preview,
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