const { app } = require('@azure/functions');
const { getMessages, addMessage } = require('../src/data');

app.http('messages', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {

    if (request.method === 'GET') {
      return { body: getMessages() };
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const msg = addMessage(body.text || "No text");
      return { status: 201, body: msg };
    }

    return { status: 405, body: "Method not allowed" };
  }
});
