const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const handler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
  },

};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (!urlStruct[request.method]) {
    // return urlStruct.HEAD.notFound(request, response);
  }

  if (urlStruct[request.method][parsedUrl.pathname]) {
    return urlStruct[request.method][parsedUrl.pathname](request, response);
  }

  // return urlStruct[request.method].notFound(request, response);

  return handler.handler(request, response, parsedUrl, 'application/json');
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
