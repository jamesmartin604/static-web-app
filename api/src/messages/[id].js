const { app } = require('@azure/functions');

let messages = [];
let nextId = 1;

app.http('messagesById', {
  methods: ['GET', 'PUT', 'DELETE'],
  route: 'messages/{id}',
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const id = parseInt(context.bindingData.id, 10);

    if (request.method === 'GET') {
      const msg = messages.find(m => m.id === id);
      return { status: msg ? 200 : 404, body: msg || "Not found" };
    }

    if (request.method === 'PUT') {
      const body = await request.json();
      const msg = messages.find(m => m.id === id);

      if (!msg) return { status: 404, body: "Not found" };

      msg.text = body.text || msg.text;
      return { status: 200, body: msg };
    }

    if (request.method === 'DELETE') {
      messages = messages.filter(m => m.id !== id);
      return { status: 204 };
    }

    return { status: 405, body: "Method not allowed" };
  }
});
