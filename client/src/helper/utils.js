import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

export function hashMessage(message) {
  const bytes = utf8ToBytes(message)
  const hash = keccak256(bytes)
  
  return hash
}

export async function signMessage(privateKey, message) {
  const signature = await secp256k1.sign(message, privateKey);

  return signature;
}

export function toJson(data) {
  if (data !== undefined) {
      return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
          .replace(/"(-?\d+)n"/g, (_, a) => a);
  }
}