// Functions here can run in both the browser and the server

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

// Exporting for Node.js and ES modules
if (typeof module !== 'undefined' && module.exports) {

  // CommonJS syntax for Node.js < 14
  module.exports = gen;
} else {

   // ES module syntax for Node.js >= 14
  export default gen;
}
