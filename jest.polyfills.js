// First define TextEncoder and TextDecoder before importing undici
import { TextEncoder, TextDecoder } from 'util';

// Add TextEncoder and TextDecoder to the global object first
Object.assign(global, {
  TextEncoder,
  TextDecoder,
});

// Now import undici which depends on TextEncoder
import { fetch, Headers, Request, Response, FormData, Blob } from 'undici';

// Add undici exports to global
Object.assign(global, {
  fetch,
  Headers,
  Request,
  Response,
  FormData,
  Blob,
});
