const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { pubKeyToAccount, hashMessage } = require("./helper/utils");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const {
  toHex,
  utf8ToBytes,
  hexToBytes,
} = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "03a969ca1f9e6e6a628ea4177a62ba0294eeeb60664fb103786dc56eb2b48b750a": 100,
  "02fdfbf3da2f07d3e5b149d9094ac86e1602acc991fa4284ccc0d076858843913f": 50,
  "023251965c579158028358d60adfe1301b83659b8a124e0a044f6af6977822aa44": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, sender } = req.body;
  const { recipient, amount } = message;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
