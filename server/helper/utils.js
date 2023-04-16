const { keccak256 } = require('ethereum-cryptography/keccak');
const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");

const pubKeyToAccount = (pubKey) => {
  const address = toHex(keccak256(pubKey.slice(1).slice(-20)));
  return "0x" + address.toString();
};

const hashMessage = (message) => {
  const bytes = utf8ToBytes(message)
  const hash = keccak256(bytes)
  
  return hash
}

const signatureToPubKey = (message, signature) => {
  const hash = hashMessage(message);
  const fullSignatureBytes = utf8ToBytes(signature);
  console.log('fullSignatureBytes', fullSignatureBytes)
  const recoveryBit = fullSignatureBytes[0];
  const signatureBytes = fullSignatureBytes.slice(1);

  return signature.recoverPublicKey(hash);
};

module.exports = {
  pubKeyToAccount,
  hashMessage,
  signatureToPubKey
};