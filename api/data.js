let messages = [];
let nextId = 1;

function getMessages() {
  return messages;
}

function addMessage(text) {
  const msg = { id: nextId++, text };
  messages.push(msg);
  return msg;
}

module.exports = { getMessages, addMessage };
