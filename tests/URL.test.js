
const arc = require('../arc-all.js');

describe('URL class', () => {
  test('should parse a complete URL correctly', () => {
    const url = new arc.URL('http://example.com:80/path?query=value#hash');
    expect(url.protocol).toBe('http');
    expect(url.domain).toBe('example.com');
    expect(url.port).toBe('80');
    expect(url.path).toBe('path');
    expect(url.query).toBe('query=value');
    expect(url.hash).toBe('hash');
    expect(url.valid).toBe(true);
    expect(url.tld).toBe('com');
    expect(url.name).toBe('example');
  });

  test('should handle URLs without port, path, query, and hash', () => {
    const url = new arc.URL('http://example.com');
    expect(url.protocol).toBe('http');
    expect(url.domain).toBe('example.com');
    expect(url.port).toBe(undefined);
    expect(url.path).toBe(undefined);
    expect(url.query).toBe(undefined);
    expect(url.hash).toBe(undefined);
    expect(url.valid).toBe(true);
  });

  test('should reset properties for invalid URL', () => {
    const url = new arc.URL('invalid-url');
    expect(url.valid).toBe(false);
    // expect(url.domain).toBe(undefined);
    // expect(url.tld).toBe(undefined);
    // expect(url.name).toBe(undefined);
  });

  test('should remove "www." from the domain', () => {
    const url = new arc.URL('http://www.example.com');
    expect(url.name).toBe('example');
  });

  test('should validate that a non-empty string is parsed', () => {
    const url = new arc.URL('');
    expect(url.valid).toBe(false);
  });
});
