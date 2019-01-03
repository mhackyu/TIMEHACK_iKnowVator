const errors = {
  INTERNAL_SERVER_ERROR: {
    status: 500,
    error: {
      code: -1,
      message: 'Internal server error.'
    }
  },
  NOT_FOUND: {
    status: 404,
    error: {
      code: -2,
      message: 'Not found.'
    }
  },
  UNAUTHORIZED: {
    status: 401,
    error: {
      code: -3,
      message: 'Unauthorized'
    }
  },
  WA_SEND_MSG_ERROR: {
    status: 401,
    error: {
      code: -4,
      message: 'Error sending message.'
    }
  }
};

exports.raise = (e, details) => {
  const error = errors[e];
  if (details) error.error.details = details;
  return error;
};
