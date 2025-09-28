from algosdk import account, mnemonic

private_key, address = account.generate_account()
print("Funder Address:", address)
print("Funder Private Key:", private_key)
print("Funder Mnemonic:", mnemonic.from_private_key(private_key))