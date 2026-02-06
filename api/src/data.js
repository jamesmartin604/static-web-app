let messages = [];
let nextId = 1;

module.exports = {
  getMessages: () => messages,
  addMessage: (text) => {
    const msg = { id: nextId++, text };
    messages.push(msg);
    return msg;
  },
};
