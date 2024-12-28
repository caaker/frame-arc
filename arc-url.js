class URL {

  constructor(url) {
    this.url = url;
    this.arr = [];
    this.parse(url);
  }

  // an actual non-empty string
  isString() {
    return (this.url && (typeof this.url === 'string') && this.url !== '') ? true : false;
  }

  parse(url) {
    this.url = url;

    // nice string check
    if (this.isString()) {
      try {
        
        // analyze the string
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

  // from Crockford book but broken into parts for readability
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

  // make this beautiful object from the regex array - 6 points
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

  // take this beautiful object and validate via simple domain check
  addValidatedProps() {
    let res = this.domain.split('.');
    if(res.length > 1 && res[res.length - 2] !== '') {
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
    const four = this.name.slice(0, 4);
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

export default URL;
// quick checks
// let url = new URL('http://dom1.com:30/foo?q=1#foo');
// let url = new URL('http://dom1.com');
// console.log(url);
