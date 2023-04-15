import { useState } from "react";
import server from "./server";
import { signMessage, toJson } from "./helper/utils";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    // Sign the message using the sender's private key
    const privateKey = prompt("Please enter your private key:");

    const amount = parseInt(sendAmount);
    const signature = await signMessage(privateKey, `${recipient}:${amount}`);

    const transaction = {
      message: {
        amount,
        recipient,
      },
      signature: toJson(signature),
    };

    console.log('transaction', transaction)

    try {
      const {
        data: { balance },
      } = await server.post(`send`, transaction);
      setBalance(balance);
    } catch (error) {
      console.log("error", error);
      alert(error);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
