const jwt = require("jsonwebtoken");
const ncrypt = require("ncrypt-js");
// const config = require('../config/index');
const secret = process.env.JWT_SECRET || "J7i6fUIhNq";
const ncryptObj = new ncrypt(secret); // eslint-disable-line new-cap

module.exports = {
  issue(payload, expiresIn) {
    const token = jwt.sign(payload, secret, {
      expiresIn: expiresIn || "24h",
    });
    // encrypt the token for further security
    // return token;
    return ncryptObj.encrypt(token);
  },

  verify(token) {
    try {
      // decrypt the token
      token = ncryptObj.decrypt(token); // eslint-disable-line no-param-reassign

      return jwt.verify(token, secret);
    } catch (err) {
      return false;
    }
  },

  issueUnEncrypted(payload, expiresIn) {
    const token = jwt.sign(payload, secret, {
      expiresIn: expiresIn || "24h",
    });
    // encrypt the token for further security
    return token;
  },

  verifyUnEncrypted(token) {
    try {
      // eslint-disable-line no-param-reassign
      console.log("secret---", secret);
      return jwt.verify(token, secret);
    } catch (err) {
      return false;
    }
  },
};
