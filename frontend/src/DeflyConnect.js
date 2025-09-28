import React, { useState } from "react";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import "./DeflyConnect.css";
import { useEffect } from "react";

const deflyWallet = new DeflyWalletConnect();

const clearDeflyWalletLocal = () => {
    localStorage.removeItem("defly_wallet_address");
    localStorage.removeItem("DeflyWallet.Wallet");
    localStorage.removeItem("walletconnect");
};

const DeflyConnect = () => {
    const [accountAddress, setAccountAddress] = useState(null);
    
    useEffect(() => {
        // Sayfa ilk açıldığında localden adresi ve session var mı bak
        const addr = localStorage.getItem("defly_wallet_address");
        if (addr) setAccountAddress(addr);
        // İstersen session keylerini de kontrol edip, session varsa yeniden bağlanmayı tetikleyebilirsin
    }, []);


    // Disconnect handler
    const handleDisconnectWalletClick = () => {
        setAccountAddress(null);
        deflyWallet.disconnect();
        clearDeflyWalletLocal();
    };

    // Connect handler
    const handleConnectWalletClick = async () => {
        clearDeflyWalletLocal();
        setAccountAddress(null);

        try {
            const newAccounts = await deflyWallet.connect();
            deflyWallet.connector?.on("disconnect", handleDisconnectWalletClick);
            setAccountAddress(newAccounts[0]);
            localStorage.setItem("defly_wallet_address", newAccounts[0]);
        } catch (error) {
            // Modal kapatılırsa burası tetiklenir!
            if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
                alert("Bağlantı hatası: " + error.message);
            }
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: 32 }}>
            {accountAddress ? (
                <div className="defly-connected-box">
                    <p className="defly-address">
                        linked account: <b>{accountAddress}</b>
                    </p>
                    <button className="defly-disconnect-btn" onClick={handleDisconnectWalletClick}>
                        Disconnect
                    </button>
                </div>
            ) : (
                <button className='wallet' onClick={handleConnectWalletClick}>Defly Wallet Connect</button>
            )}
        </div>
    );
};

export default DeflyConnect;