const { app } = require('@azure/functions');
const { getMessages, updateMessage, deleteMessage } = require('../data');

app.http('messageById', {
  methods: ['GET', 'PUT', 'DELETE'],
  route: 'messages/{id}',
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const id = parseInt(context.bindingData.id, 10);

    if (request.method === 'GET') {
      const msg = getMessages().find(m => m.id === id);
      return { status: msg ? 200 : 404, body: msg || "Not found" };
    }

    if (request.method === 'PUT') {
      const body = await request.json();
      const msg = updateMessage(id, body.text);
      return { status: msg ? 200 : 404, body: msg || "Not found" };
    }

    if (request.method === 'DELETE') {
      const deleted = deleteMessage(id);
      return { status: deleted ? 204 : 404 };
    }

    return { status: 405, body: "Method not allowed" };
  }
});
