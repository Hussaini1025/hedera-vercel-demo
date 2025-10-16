import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Client, Hbar, TransferTransaction, AccountId, PrivateKey } from "@hashgraph/sdk";

dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Simple test route
app.get("/", (req, res) => {
  res.send("Agritrust Hedera Backend Live 🚀");
});

// ✅ Transfer route
app.post("/transfer", async (req, res) => {
  try {
    const { receiverId, amount } = req.body;

    const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
    const operatorKey = PrivateKey.fromString(process.env.OPERATOR_KEY);

    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    const tx = await new TransferTransaction()
      .addHbarTransfer(operatorId, Hbar.fromTinybars(-amount))
      .addHbarTransfer(receiverId, Hbar.fromTinybars(amount))
      .execute(client);

    const receipt = await tx.getReceipt(client);
    const txId = tx.transactionId.toString();

    res.json({
      success: true,
      txId,
      status: receipt.status.toString(),
      explorer: `https://hashscan.io/testnet/transaction/${txId}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default app;