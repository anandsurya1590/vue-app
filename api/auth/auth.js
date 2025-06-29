// auth.js
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://anand-surya.us.auth0.com/.well-known/jwks.json"
  }),
  audience: "https://anand-surya.us.auth0.com/api/v2/",
  issuer: "https://anand-surya.us.auth0.com/",
  algorithms: ["RS256"]
});

module.exports = checkJwt;
