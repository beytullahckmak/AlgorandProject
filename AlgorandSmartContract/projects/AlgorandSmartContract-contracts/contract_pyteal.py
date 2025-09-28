# contract_pyteal.py
from pyteal import *

def approval_program():
    OWNER_KEY = Bytes("Owner")
    TOTAL_KEY = Bytes("TotalRaised")
    CLAIMABLE_KEY = Bytes("Claimable")
    TOKENID_KEY = Bytes("TokenID")   # optional: ASA id to distribute (default 0)
    RATE_KEY = Bytes("Rate")         # optional: tokens per microalgo (default 1)
    INVEST_KEY = Bytes("Invest")     # local state key per account
    CLAIMED_KEY = Bytes("Claimed")   # local state key per account

    # On create - initialize globals
    on_creation = Seq([
        App.globalPut(OWNER_KEY, Txn.sender()),
        App.globalPut(TOTAL_KEY, Int(0)),
        App.globalPut(CLAIMABLE_KEY, Int(0)),
        App.globalPut(TOKENID_KEY, Int(0)),
        App.globalPut(RATE_KEY, Int(1)),
        Approve()
    ])

    # On opt-in - create local keys
    on_opt_in = Seq([
        App.localPut(Txn.sender(), INVEST_KEY, Int(0)),
        App.localPut(Txn.sender(), CLAIMED_KEY, Int(0)),
        Approve()
    ])

    # Invest: expects group size == 2
    # Gtxn[0] : PaymentTxn (from sender -> appAddress)
    # Gtxn[1] : ApplicationCall (this txn)
    invest_checks = And(
        Global.group_size() == Int(2),
        Gtxn[0].type_enum() == TxnType.Payment,
        Gtxn[0].receiver() == Global.current_application_address(),
        Gtxn[0].sender() == Txn.sender(),
        Gtxn[0].amount() > Int(0)
    )
    invest = Seq([
        Assert(invest_checks),
        # add to local and global
        App.localPut(Txn.sender(),
                     INVEST_KEY,
                     App.localGet(Txn.sender(), INVEST_KEY) + Gtxn[0].amount()),
        App.globalPut(TOTAL_KEY, App.globalGet(TOTAL_KEY) + Gtxn[0].amount()),
        Approve()
    ])

    # set_claimable: only owner can call, arg1 = "1" or "0"
    set_claimable = Seq([
        Assert(Txn.sender() == App.globalGet(OWNER_KEY)),
        If(Txn.application_args.length() > Int(1),
           App.globalPut(CLAIMABLE_KEY, Btoi(Txn.application_args[1])),
           Reject()
        ),
        Approve()
    ])

    # set_token (optional): owner sets token id and rate (usage: ["set_token", <tokenId>, <rate>])
    set_token = Seq([
        Assert(Txn.sender() == App.globalGet(OWNER_KEY)),
        Assert(Txn.application_args.length() == Int(3)),
        App.globalPut(TOKENID_KEY, Btoi(Txn.application_args[1])),
        App.globalPut(RATE_KEY, Btoi(Txn.application_args[2])),
        Approve()
    ])

    # Claim: check claimable, user has invest > 0, not claimed yet
    claim_checks = And(
        App.globalGet(CLAIMABLE_KEY) == Int(1),
        App.localGet(Txn.sender(), INVEST_KEY) > Int(0),
        App.localGet(Txn.sender(), CLAIMED_KEY) == Int(0)
    )
    claim = Seq([
        Assert(claim_checks),
        # mark claimed
        App.localPut(Txn.sender(), CLAIMED_KEY, Int(1)),
        # NOTE: token transfer not implemented here; optionally implement inner-tx in next iteration
        Approve()
    ])

    # Handler for NoOp (app call)
    handle_noop = Cond(
        [Txn.application_args[0] == Bytes("invest"), invest],
        [Txn.application_args[0] == Bytes("claim"), claim],
        [Txn.application_args[0] == Bytes("set_claimable"), set_claimable],
        [Txn.application_args[0] == Bytes("set_token"), set_token],
    )

    # other handlers: delete / update only owner (optional)
    on_delete = Return(Txn.sender() == App.globalGet(OWNER_KEY))
    on_update = Return(Txn.sender() == App.globalGet(OWNER_KEY))
    on_closeout = Seq([
        # if user closes out, allow only if they haven't invested or they have claimed already
        Assert(Or(App.localGet(Txn.sender(), INVEST_KEY) == Int(0),
                  App.localGet(Txn.sender(), CLAIMED_KEY) == Int(1))),
        Approve()
    ])

    program = Cond(
        [Txn.application_id() == Int(0), on_creation],
        [Txn.on_completion() == OnComplete.OptIn, on_opt_in],
        [Txn.on_completion() == OnComplete.CloseOut, on_closeout],
        [Txn.on_completion() == OnComplete.UpdateApplication, on_update],
        [Txn.on_completion() == OnComplete.DeleteApplication, on_delete],
        [Txn.on_completion() == OnComplete.NoOp, handle_noop]
    )
    return program

def clear_state_program():
    return Approve()

if __name__ == "__main__":
    import os
    approval = compileTeal(approval_program(), mode=Mode.Application, version=6)
    clear = compileTeal(clear_state_program(), mode=Mode.Application, version=6)
    open("approval.teal", "w").write(approval)
    open("clear_state.teal", "w").write(clear)
    print("Wrote approval.teal and clear_state.teal")