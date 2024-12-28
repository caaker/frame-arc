 // Functions here can run both on the server and on the client - considered universal or isomorphic

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

// CommonJS syntax for Node.js < 14 and // ES module syntax for Node.js >= 14
if (typeof module !== 'undefined' && module.exports) {
  module.exports = gen;
} else {
  export default gen;
}
