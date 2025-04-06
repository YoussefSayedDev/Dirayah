import { scrypt } from "scrypt-js";
import "server-only";

// Convert string to Uint8Array
const textToBuffer = (text: string): Uint8Array => {
  return new TextEncoder().encode(text);
};

// Convert Uint8Array to hex string
const bufferToHex = (buffer: Uint8Array): string => {
  return Array.from(buffer)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Parse hex string to Uint8Array
const hexToBuffer = (hex: string): Uint8Array => {
  const matches = hex.match(/.{1,2}/g) || [];
  return new Uint8Array(matches.map(byte => parseInt(byte, 16)));
};

// Hash password with scrypt
export const hashPassword = async (password: string): Promise<string> => {
  // Parameters: N=16384, r=8, p=1 (recommended values)
  const N = 16384, r = 8, p = 1;
  const dkLen = 32; // 32 bytes output
  const salt = crypto.getRandomValues(new Uint8Array(16)); // 16 bytes salt
  
  const passwordBuffer = textToBuffer(password);
  const derivedKey = await scrypt(passwordBuffer, salt, N, r, p, dkLen);
  
  // Format: N:r:p:salt:derivedKey
  return `${N}:${r}:${p}:${bufferToHex(salt)}:${bufferToHex(derivedKey)}`;
};

// Verify password against hash
export const comparePassword = async (password: string, storedHash: string): Promise<boolean> => {
  try {
    // Parse stored hash
    const [N, r, p, saltHex, keyHex] = storedHash.split(':');
    const dkLen = hexToBuffer(keyHex).length;
    
    // Convert parameters
    const params = {
      N: parseInt(N, 10),
      r: parseInt(r, 10),
      p: parseInt(p, 10)
    };
    
    const salt = hexToBuffer(saltHex);
    const passwordBuffer = textToBuffer(password);
    
    // Compute hash with same parameters
    const derivedKey = await scrypt(
      passwordBuffer, 
      salt, 
      params.N, 
      params.r, 
      params.p, 
      dkLen
    );
    
    // Compare computed hash with stored hash
    const derivedKeyHex = bufferToHex(derivedKey);
    return derivedKeyHex === keyHex;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};
