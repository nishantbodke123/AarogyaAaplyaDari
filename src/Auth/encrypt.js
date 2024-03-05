import CryptoJS from "crypto-js";

// function generateRandomIV() {
//   // Generate 16 random bytes for the IV
//   const iv = CryptoJS.lib.WordArray.random(16); // Convert the IV to hexadecimal representation
//   const ivHex = iv.toString(CryptoJS.enc.Hex);
//   return ivHex;
// }

const Encrypt = (data) => {
  const SECRET_KEY =
    "d73b3572d4b6e4df6c5b0efb0616e9a8c9266ba6d6a10abdc78a11485d002fd8";

  // Convert key and iv from hex to WordArray
  const keyBytes = CryptoJS.enc.Hex.parse(SECRET_KEY);
  const ivBytes = CryptoJS.enc.Hex.parse("00000000000000000000000000000000==");

  // Create the AES cipher
  const cipher = CryptoJS.AES.encrypt(data, keyBytes, {
    iv: ivBytes,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Convert the ciphertext to base64
  //   const encryptedData = cipher.toString(CryptoJS.Base16);
  const encryptedData = cipher.toString();
  return encryptedData;
};

export default Encrypt;
