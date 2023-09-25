const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const handler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {

    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if (urlStruct[parsedUrl.pathname]) {
    return urlStruct[parsedUrl.pathname](request, response);
  }

  return handler.handler(request, response, parsedUrl.pathname, 'application/json', params);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
