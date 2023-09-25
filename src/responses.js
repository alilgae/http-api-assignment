const toXML = (messageJSON) => {
  let XML = '<response>';
  XML += `<message>${messageJSON.message}</message>`;
  XML += messageJSON.id ? `<id>${messageJSON.id}</id></response>` : '</response>';
  return XML;
};

const sendResponse = (request, response, status, type, content) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(type === 'application/json' ? JSON.stringify(content) : toXML(content));
  response.end();
};

const handler = (request, response, value, type, query) => {
  let statusCode = 404;
  const responseJSON = {
    message: 'This is a successful response',
  };
  switch (value) {
    case '/success':
      // 200
      statusCode = 200;
      break;

    case '/badRequest':
      if (query.valid === 'true') {
        statusCode = 200;
      } else {
        // 400
        responseJSON.message = 'Missing valid query parameter set to true.';
        responseJSON.id = 'badRequest';
        statusCode = 400;
      }
      break;

    case '/unauthorized':
      if (query.loggedIn === 'yes') {
        statusCode = 200;
      } else {
        // 401
        responseJSON.message = 'Missing loggedIn query parameter set to yes.';
        responseJSON.id = 'unathorized';
        statusCode = 401;
      }
      break;

    case '/forbidden':
      // 403
      responseJSON.message = 'You do not have access to this content.';
      responseJSON.id = 'forbidden';
      statusCode = 403;
      break;

    case '/internal':
      // 500
      responseJSON.message = 'Internal server error. Something went wrong.';
      responseJSON.id = 'internalError';
      statusCode = 500;
      break;

    case '/notImplemented':
      // 501
      responseJSON.message = 'A get request for this page has not been implemented yet. Check again later for updated content.';
      responseJSON.id = 'notImplemented';
      statusCode = 501;
      break;

    default:
      // 404
      responseJSON.message = 'The page you are looking for was not found.';
      responseJSON.id = 'notFound';
      statusCode = 404;
      break;
  }

  return sendResponse(request, response, statusCode, type, responseJSON);
};

module.exports = {
  handler,
};
