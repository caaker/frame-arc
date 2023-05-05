/**************************************************************************************************/
// used in Node.js
/**************************************************************************************************/

const gen = {};

gen.makeAnchorHash = function(user_text) {
  let ret = encodeURIComponent(user_text);
  ret = ret.replace(/%[0-9A-F]{2}/g, '_');
  ret = ret.replace(/_{2,10}/g, '_');
  return ret;
};

gen.inStrictMode = function() {
  return (() => this === undefined)();
};

// Node.js < 14 requires CommonJS syntax
module.exports = gen;

// Node.js >= 14
// export default gen;