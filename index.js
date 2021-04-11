/**
 * Redirects HTTP requests to HTTPS in the production environment.
 *
 * @typedef {import('express').RequestHandler} RequestHandler
 * @see https://github.com/paulomcnally/node-heroku-ssl-redirect
 */

const { StatusCodes } = require('http-status-codes');

/**
 * @return {RequestHandler}
 */
const herokuSslRedirect = () => {
  /** @type {RequestHandler} */
  const middleware = (req, res, next) => {
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
      const status = StatusCodes.MOVED_TEMPORARILY;
      const url = `https://${req.hostname}${req.originalUrl}`;
      return res.redirect(status, url);
    }

    return next();
  }

  return middleware;
}

module.exports = herokuSslRedirect;
