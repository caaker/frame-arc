// This test file was generated with the assistance of ChatGPT

// adjust this path
import URL from '../path/to/your/URL';

describe('URL class', () => {
  test('should parse a complete URL correctly', () => {
    const url = new URL('http://example.com:80/path?query=value#hash');
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
    const url = new URL('http://example.com');
    expect(url.protocol).toBe('http');
    expect(url.domain).toBe('example.com');
    expect(url.port).toBe('');
    expect(url.path).toBe('');
    expect(url.query).toBe('');
    expect(url.hash).toBe('');
    expect(url.valid).toBe(true);
  });

  test('should reset properties for invalid URL', () => {
    const url = new URL('invalid-url');
    expect(url.valid).toBe(false);
    expect(url.domain).toBe('');
    expect(url.tld).toBe('');
    expect(url.name).toBe('');
  });

  test('should remove "www." from the domain', () => {
    const url = new URL('http://www.example.com');
    expect(url.name).toBe('example');
    expect(url.domain).toBe('example.com');
  });

  test('should validate that a non-empty string is parsed', () => {
    const url = new URL('');
    expect(url.valid).toBe(false);
  });
});
