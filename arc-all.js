const gen = {};

/****************************************************************************************************/
// Functions here can run both on the server and on the client - considered universal or isomorphic

gen.makeAnchorHash = function(text) {
  let hash = encodeURIComponent(text);
  hash = hash.replace(/%[0-9A-F]{2}/g, '_');
  hash = hash.replace(/_{2,10}/g, '_');
  return hash;
};

gen.inStrictMode = function() {
  return (() => this === undefined)();
};

gen.URL = class URL {

  constructor(url) {
    this.url = url;
    this.arr = [];
    this.make(url);
  }

  // check that url exists, is a string, and is not empty
  isString() {
    return ((this.url) && (typeof this.url === 'string') && (this.url !== '')) ? true : false;
  }

  make(url) {
    if (this.isString()) {
      try {
        
        // analyze the regular expression string
        this.execute();

        // make it readable by creating an object
        this.makeObject();

        // now validate the domain
        this.addValidatedProps();

        // if a www escaped in remove it
        this.removeWWW();
      } catch (error) {
        console.error('Error parsing URL:', error);
        this.resetObj(); // Reset in case of any error
      }
    } else {
      this.resetObj();
    }

  }

  // from Crockford book but refactored into parts for readability
  execute() {

    // start
    const start =     '^';

    // holds entire input                    // 0

    // optional - don't capture ':'
    const protocol =  '(?:([A-Za-z]+):)?';   // 1

    // only non captured group
    const slash =     '(?:\\/{0,3})';

    // only required group
    const domain =    '([0-9.\\-A-Za-z]+)';  // 2

    // these 4 groups are optional via `?`

    // don't capture ':'
    const port =      '(?::(\\d+))?';        // 3

    // don't capture '/'
    const path =      '(?:\\/([^?#]*))?';    // 4

    // don't capture '?''
    const query =     '(?:\\?([^#]*))?';     // 5

    // don't capture '#'
    const hash =      '(?:#(.*))?';          // 6

    // end
    const end =       '$';

    // concatenate the regex string, create the RegExp, and finally execute it via exec()
    const whole = start + protocol + slash + domain + port + path + query + hash + end;
    const regexp = new RegExp(whole, 'g');
    this.arr = regexp.exec(this.url);
  }

  // below we have the 6 components of a url
  makeObject() {
    if(this.arr) {
      this.protocol = this.arr[1];
      this.domain = this.arr[2];
      this.port = this.arr[3];
      this.path = this.arr[4];
      this.query = this.arr[5];
      this.hash = this.arr[6];
    }

    if(this.arr === null) {
      this.resetObj();
    }
  }

  // add properties to the url and validate
  // to validate we need something of the form x.y
  addValidatedProps() {
    let res = this.domain.split('.');
    if (res.length > 1 && res[res.length - 1] !== '' && res[res.length - 2] !== '') {
      this.tld = res[res.length - 1];
      this.name = res[res.length - 2];
      this.valid = true;
    } else {
      this.tld = '';
      this.name = '';
      this.valid = false;
    }
  }

  // if a www escaped in, remove it
  removeWWW() {
    const four = this?.name?.slice(0, 4);
    if(four === 'www.') {
      this.name = this.name.slice(4);
      this.domain = this.domain.slice(4);
    }
  }

  resetObj() {

    // reset properties from regex - 6
    this.protocol = '';
    this.domain = '';
    this.port = '';
    this.path = '';
    this.query = '';
    this.hash = '';

    // reset created properties - 3
    this.tld = '';
    this.name = '';
    this.valid = false;
  }
};


/****************************************************************************************************/
// Code here requires access to the browser 

// requires window
gen.makeAnchorHashLink = function(text) {
  return window.location.origin + '#' + gen.makeAnchorHash(text);
};

// requires window
gen.scrollToHash = function(delay = 0, offset = 0) {
  window.setTimeout(() => {
    const hash = document.location.hash.slice(1);
    if(!hash) {
      return;
    }
    const element = document.getElementById(hash);
    if(!element) {
      return;
    }
    window.scrollTo({
      top: element.getBoundingClientRect().top - offset,
      behavior: 'smooth'
    });
  }, delay);
};

// requires navigator
gen.copyToClipboard = async function(text_to_copy) {
  try {
    await navigator.clipboard.writeText(text_to_copy);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};


/****************************************************************************************************/
// Export all code

// module.exports = gen;
export default gen;
