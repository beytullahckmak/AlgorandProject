import algosdk from "algosdk";
import { deflyWallet } from "./DeflyConnect"; // cüzdan bağlama componentin

// Contract bilgileri
const APP_ID = 1002; // senin smart contract ID
const ALGOD_SERVER = "https://testnet-api.algonode.cloud";
const ALGOD_TOKEN = ""; // public API için boş bırakabilirsin

const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER);

// ---------------- Claim ----------------
export const claimReward = async (sender) => {
  try {
    const params = await algodClient.getTransactionParams().do();

    const appCallTxn = algosdk.makeApplicationNoOpTxn(
      sender,
      params,
      APP_ID,
      [new TextEncoder().encode("claim")]
    );

    const txnToSign = {
      txn: Buffer.from(algosdk.encodeUnsignedTransaction(appCallTxn)).toString("base64"),
    };

    const signed = await deflyWallet.signTransaction([txnToSign]);
    const signedTxn = new Uint8Array(Buffer.from(signed[0], "base64"));

    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    await algosdk.waitForConfirmation(algodClient, txId, 4);

    alert(`✅ Claim başarılı! TXID: ${txId}`);
  } catch (err) {
    console.error(err);
    alert("Claim sırasında hata: " + err.message);
  }
};