let crypto = require("crypto");

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
let genSalt = function(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

/**
 * hash password with sha512 using a password and salt
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
let hashPassword = function(password, salt) {
  let hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
  hash.update(password);
  let value = hash.digest("hex");
  return {
    passwordSalt: salt,
    passwordHash: value
  };
};

export { genSalt, hashPassword };
