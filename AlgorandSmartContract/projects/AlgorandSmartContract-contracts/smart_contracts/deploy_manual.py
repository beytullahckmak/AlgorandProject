from algosdk.v2client import algod
from algosdk.transaction import ApplicationCreateTxn, StateSchema, wait_for_confirmation
from algosdk import account, mnemonic

# ---------------- Algod Client (Testnet) ----------------
algod_address = "https://testnet-api.algonode.cloud"  # DİKKAT: HTTPS!
algod_token = ""  # Algonode testnet public API, token boş
algod_client = algod.AlgodClient(algod_token, algod_address)

# ---------------- Deployer ----------------
deployer_mnemonic = "inner tuna crouch dawn tomorrow artwork deal duck client minute regret verify bachelor grab tag royal spend guilt penalty index era across uniform absorb catch"
deployer_private_key = mnemonic.to_private_key(deployer_mnemonic)
deployer_address = account.address_from_private_key(deployer_private_key)
print("Deployer Address:", deployer_address)

# ---------------- Smart Contract Deploy ----------------
global_schema = StateSchema(2, 2)
local_schema = StateSchema(2, 2)

with open("../approval.teal", "r") as f:
    approval_program = f.read()

with open("../clear_state.teal", "r") as f:
    clear_program = f.read()

sp = algod_client.suggested_params()
app_txn = ApplicationCreateTxn(
    deployer_address,
    sp,
    0,
    approval_program.encode(),
    clear_program.encode(),
    global_schema,
    local_schema
)

signed_app_txn = app_txn.sign(deployer_private_key)
try:
    app_txid = algod_client.send_transaction(signed_app_txn)
    wait_for_confirmation(algod_client, app_txid, 4)
    response = algod_client.pending_transaction_info(app_txid)
    app_id = response["application-index"]
    app_address = account.address_from_application(app_id)

    print("✅ App Deployed!")
    print("App ID:", app_id)
    print("App Address:", app_address)
except Exception as e:
    print("Smart contract deploy hatası:", e)