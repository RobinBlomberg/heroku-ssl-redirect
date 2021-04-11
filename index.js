/**
 * Redirects HTTP requests to HTTPS in the production environment.
 *
 * @typedef {import('express').RequestHandler} RequestHandler
 * @see https://github.com/paulomcnally/node-heroku-ssl-redirect
 */

/**
 * @return {RequestHandler}
 */
const herokuSslRedirect = () => {
  /** @type {RequestHandler} */
  const middleware = (req, res, next) => {
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(302, `https://${req.hostname}${req.originalUrl}`);
    }

    return next();
  }

  return middleware;
}

module.exports = {
  herokuSslRedirect
};
