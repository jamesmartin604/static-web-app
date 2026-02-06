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

function updateMessage(id, text) {
  const msg = messages.find(m => m.id === id);
  if (!msg) return null;
  msg.text = text || msg.text;
  return msg;
}

function deleteMessage(id) {
  const index = messages.findIndex(m => m.id === id);
  if (index === -1) return false;
  messages.splice(index, 1);
  return true;
}

module.exports = {
  getMessages,
  addMessage,
  updateMessage,
  deleteMessage
};
