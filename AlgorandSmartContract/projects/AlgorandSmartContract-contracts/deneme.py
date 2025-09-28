from pyteal import *

def approval_program():
    on_call = Seq([
        # Arguman kontrolü
        Assert(Txn.application_args.length() == Int(1)),
        If(Txn.application_args[0] == Bytes("invest"),
            Seq([
                # Invest logic: yatırılan ALGO’yu kaydet
                Approve()
            ]),
            If(Txn.application_args[0] == Bytes("claim"),
                Seq([
                    # Claim logic: token ver / state update
                    Approve()
                ]),
                Reject()
            )
        )
    ])
    
    return on_call

def clear_state_program():
    return Approve()

if __name__ == "__main__":
    with open("approval.teal", "w") as f:
        compiled = compileTeal(approval_program(), mode=Mode.Application, version=6)
        f.write(compiled)

    with open("clear_state.teal", "w") as f:
        compiled = compileTeal(clear_state_program(), mode=Mode.Application, version=6)
        f.write(compiled)