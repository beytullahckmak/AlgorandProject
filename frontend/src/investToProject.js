import algosdk from "algosdk";
import deflyWallet  from "./DeflyConnect"; // cüzdan bağlama componentin

// Contract bilgileri
const APP_ID = 1002; // senin smart contract ID
const ALGOD_SERVER = "https://testnet-api.algonode.cloud";
const ALGOD_TOKEN = ""; // public API için boş bırakabilirsin

const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER);

// Yatırımcıdan ALGO gönderme (Invest)
export const investToProject = async (sender, amount) => {
    try {
      const params = await algodClient.getTransactionParams().do();
  
      const appCallTxn = algosdk.makeApplicationNoOpTxn(
        sender,
        params,
        APP_ID,
        [new TextEncoder().encode("invest")]
      );
  
      const payTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender,
        to: algosdk.getApplicationAddress(APP_ID),
        amount: parseInt(amount) * 1e6,
        suggestedParams: params,
      });
  
      algosdk.assignGroupID([appCallTxn, payTxn]);
  
      const txnsToSign = [appCallTxn, payTxn].map((txn) => ({
        txn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64"),
      }));
  
      const signed = await deflyWallet.signTransaction(txnsToSign);
      const signedTxns = signed.map((stxn) => new Uint8Array(Buffer.from(stxn, "base64")));
  
      const { txId } = await algodClient.sendRawTransaction(signedTxns).do();
      await algosdk.waitForConfirmation(algodClient, txId, 4);
  
      alert(`✅ Yatırım başarılı! TXID: ${txId}`);
    } catch (err) {
      console.error(err);
      alert("Yatırım sırasında hata: " + err.message);
    }
}