/**
 * Jest Node.js Globals for Browser API Polyfills
 * This file sets up global browser APIs that aren't available in Node.js
 */

// Step 1: Import and define TextEncoder/TextDecoder first
import { ReadableStream, TransformStream, WritableStream } from 'node:stream/web';
import { TextDecoder, TextEncoder } from 'util';

// Step 2: Add TextEncoder and TextDecoder to global object
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Step 3: Add Web Streams API polyfills before importing undici
try {

  global.ReadableStream = ReadableStream;
  global.WritableStream = WritableStream;
  global.TransformStream = TransformStream;
} catch {
  // Fallback for older Node.js versions
  console.warn('Web Streams API not available in this Node.js version, using polyfill');

  // Simplified polyfill for ReadableStream if needed
  global.ReadableStream = class ReadableStream {
    constructor() { }
    getReader() { return { read: async () => ({ done: true }) }; }
  };

  global.WritableStream = class WritableStream {
    constructor() { }
    getWriter() { return { write: async () => { }, close: async () => { } }; }
  };

  global.TransformStream = class TransformStream {
    constructor() {
      this.readable = new global.ReadableStream();
      this.writable = new global.WritableStream();
    }
  };
}

// Step 4: Add MessagePort and Web Messaging API polyfills
class MessagePort {
  constructor() {
    this.onmessage = null;
  }

  postMessage(message) {
    // Simplified implementation
    if (this.onmessage) {
      const event = { data: message };
      setTimeout(() => this.onmessage(event), 0);
    }
  }

  start() { }
  close() { }

  addEventListener(type, listener) {
    if (type === 'message') {
      this.onmessage = listener;
    }
  }

  removeEventListener() { }
}

class MessageChannel {
  constructor() {
    this.port1 = new MessagePort();
    this.port2 = new MessagePort();

    // Connect the ports
    const port1 = this.port1;
    const port2 = this.port2;

    this.port1.postMessage = message => {
      if (port2.onmessage) {
        const event = { data: message };
        setTimeout(() => port2.onmessage(event), 0);
      }
    };

    this.port2.postMessage = message => {
      if (port1.onmessage) {
        const event = { data: message };
        setTimeout(() => port1.onmessage(event), 0);
      }
    };
  }
}

class MessageEvent {
  constructor(type, options = {}) {
    this.type = type;
    this.data = options.data || null;
    this.origin = options.origin || '';
    this.lastEventId = options.lastEventId || '';
    this.source = options.source || null;
    this.ports = options.ports || [];
  }
}

// Add Web Messaging API to global
global.MessagePort = MessagePort;
global.MessageChannel = MessageChannel;
global.MessageEvent = MessageEvent;

// Step 5: Add BroadcastChannel polyfill
// Create a shared registry for broadcast channels to communicate
const broadcastChannelRegistry = {};

class BroadcastChannel {
  constructor(name) {
    this.name = name;
    this.onmessage = null;
    this.onmessageerror = null;
    this.closed = false;

    // Register this channel instance
    if (!broadcastChannelRegistry[name]) {
      broadcastChannelRegistry[name] = [];
    }
    broadcastChannelRegistry[name].push(this);
  }

  postMessage(message) {
    if (this.closed) return;

    // Clone the message (simulating structured clone algorithm)
    const messageClone = JSON.parse(JSON.stringify(message));

    // Deliver to all other channels with the same name
    if (broadcastChannelRegistry[this.name]) {
      broadcastChannelRegistry[this.name].forEach(channel => {
        if (channel !== this && channel.onmessage && !channel.closed) {
          const event = new MessageEvent('message', { data: messageClone });
          setTimeout(() => channel.onmessage(event), 0);
        }
      });
    }
  }

  close() {
    this.closed = true;

    // Remove this channel from the registry
    if (broadcastChannelRegistry[this.name]) {
      const index = broadcastChannelRegistry[this.name].indexOf(this);
      if (index !== -1) {
        broadcastChannelRegistry[this.name].splice(index, 1);
      }

      // Clean up empty registries
      if (broadcastChannelRegistry[this.name].length === 0) {
        delete broadcastChannelRegistry[this.name];
      }
    }
  }

  addEventListener(type, listener) {
    if (type === 'message') {
      this.onmessage = listener;
    } else if (type === 'messageerror') {
      this.onmessageerror = listener;
    }
  }

  removeEventListener(type, listener) {
    if (type === 'message' && this.onmessage === listener) {
      this.onmessage = null;
    } else if (type === 'messageerror' && this.onmessageerror === listener) {
      this.onmessageerror = null;
    }
  }
}

// Add BroadcastChannel to global
global.BroadcastChannel = BroadcastChannel;

// Step 6: Add Blob polyfill
class BlobPolyfill {
  constructor(blobParts = [], options = {}) {
    this.parts = blobParts || [];
    this.type = options.type || '';

    // Calculate size
    this.size = this.parts.reduce((acc, part) => {
      if (part instanceof Uint8Array) {
        return acc + part.length;
      }
      // Convert strings to Uint8Array
      if (typeof part === 'string') {
        const encoder = new TextEncoder();
        return acc + encoder.encode(part).length;
      }
      // Handle other Blobs
      if (part instanceof BlobPolyfill) {
        return acc + part.size;
      }
      return acc;
    }, 0);
  }

  // Method to convert blob to array buffer
  async arrayBuffer() {
    // Simple implementation
    const textContent = await this.text();
    const encoder = new TextEncoder();
    return encoder.encode(textContent).buffer;
  }

  // Method to slice a blob
  slice(start = 0, end = this.size, contentType = '') {
    return new BlobPolyfill([], { type: contentType });
  }

  // Method to convert blob to text
  async text() {
    const parts = await Promise.all(
      this.parts.map(async (part) => {
        if (typeof part === 'string') {
          return part;
        }
        if (part instanceof Uint8Array) {
          const decoder = new TextDecoder();
          return decoder.decode(part);
        }
        if (part instanceof BlobPolyfill) {
          return await part.text();
        }
        return '';
      })
    );
    return parts.join('');
  }

  // Method to read as stream
  stream() {
    const encoder = new TextEncoder();
    return new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(''));
        controller.close();
      }
    });
  }
}

// Set the BlobPolyfill as global Blob
global.Blob = BlobPolyfill;

// Step 7: Import URL and URLSearchParams
global.URL = global.URL || require('url').URL;
global.URLSearchParams = global.URLSearchParams || require('url').URLSearchParams;

// Step 8: Only after all required polyfills are defined, import undici
const { fetch, Headers, Request, Response, FormData } = require('undici');

// Step 9: Add fetch API components to global object, but keep our Blob
global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.FormData = FormData;

// Step 5: Add any additional browser APIs needed for tests
global.URL = global.URL || require('url').URL;
global.URLSearchParams = global.URLSearchParams || require('url').URLSearchParams;

// Add any other browser globals needed for testing
// For example, if your tests use these:

// Mock window.matchMedia if needed
if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      addListener: function () { },
      removeListener: function () { }
    };
  };
}

