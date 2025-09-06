import CryptoJS from 'crypto-js';

// Must be 256-bit (32 bytes) key for AES-256
const secretKey = CryptoJS.enc.Hex.parse(import.meta.env.VITE_ENCRYPTION_KEY); // 64-char hex = 32 bytes

export function encrypt(data) {
  const iv = CryptoJS.lib.WordArray.random(16); // 16-byte IV

  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey,
    { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );

  // Return iv + encrypted string (in hex)
  return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

export function decrypt(encryptedString) {
  const [ivHex, encryptedHex] = encryptedString.split(':');
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);

  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: encrypted },
    secretKey,
    { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedText);
}
