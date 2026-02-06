const { app } = require('@azure/functions');

let messages = [];
let nextId = 1;

app.http('messages', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    if (request.method === 'GET') {
      return { body: messages };
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const message = {
        id: nextId++,
        text: body.text || "No text"
      };
      messages.push(message);

      return {
        status: 201,
        body: message
      };
    }

    return { status: 405, body: "method not allowed" };
  }
});
