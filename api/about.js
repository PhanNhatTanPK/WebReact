/* eslint linebreak-style: ["error", "windows"] */

const { mustBeSignedIn } = require('./auth');

let aboutMessage = 'Issue Tracker API v1.0';

function setMessage(_, { message }) {
  aboutMessage = message;
  return aboutMessage;
}

function getMessage() {
  return aboutMessage;
}

module.exports = { getMessage, setMessage: mustBeSignedIn(setMessage) };
