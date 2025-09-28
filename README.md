<img width="1015" height="565" alt="image" src="https://github.com/user-attachments/assets/f9b446ff-e575-42eb-be1f-d05c3d41367e" />
# BLAZER APP [ Berk , Beytullah , Talha ]
*Tinder-Style Project Discovery & Investment Platform*

## 📌 Overview  
This project is a **micro-investment launchpad** built on the **Algorand blockchain**, enabling users to invest small amounts (e.g., 5–20 USDCa) into curated projects.  
The unique feature: **Tinder-like swipe mechanics** for project discovery — swipe right to invest, swipe left to skip.  

## ✨ Key Features  
- 🔥 **Swipe-to-Invest**: Simple Tinder-style user experience.  
- 💵 **Micro Investments**: Start with as little as 5 USDCa.  
- ⚡ **Atomic Transfers**: Secure fund flow from investor → escrow → project.  
- 🛡 **Escrow Mechanism**: Smart contracts ensure funds are locked until conditions are met.  
- 📊 **Project Listing**: Verified projects can be registered on-chain with goal targets.  
- 🌍 **Decentralized Access**: Anyone with an Algorand wallet can participate.  

## 🛠 Smart Contract Functions  

### 1. `register_project`  
Registers a new project on-chain.  

**Parameters:**  
- Project name  
- Description  
- Wallet address  
- Target amount  

**Output:**  
- Unique Project ID  

---

### 2. `micro_invest`  
Executes an investment via swipe action.  

**Parameters:**  
- Project ID  
- Investment amount (5–20 USDCa)  

**Process:**  
1. User confirms investment.  
2. Atomic Transfer sends funds → escrow → project.  
3. Contract enforces min/max limits.  

---

### 3. `claim_funds` *(Future Extension)*  
- Project owners can claim funds once the target is reached.  
- Investors can reclaim funds if project fails (via escrow refund logic).  

---

## 🚀 Roadmap  

- **09.25**: Demo released at AlgoHackathon  
- **10.25**: Participation in Algorand Startup Challenge  
- **11.25**: MVP launch  
- **12.25**: Open Beta with first projects listed  
- **Q1 2026**: Integration of social discovery features (comments, likes)  
- **Q2 2026**: Mobile app release (iOS & Android)  
- **Q3 2026**: Multi-chain support (EVM compatibility)  
- **Q4 2026**: DAO governance for project selection  

---

## 🏗 Tech Stack  
- **Blockchain**: Algorand  
- **Smart Contracts**: PyTeal / Beaker  
- **Frontend**: React + Tailwind  
- **Backend**: Python (FastAPI)  
- **Wallets**: Pera, Defly, AlgoSigner  

---

## 📦 Installation & Setup  

```bash
# Clone the repository
cd micro-invest-launchpad

# Install dependencies
pip install -r requirements.txt

# Run local Algorand sandbox or Algokit localnet
algokit localnet start

# Deploy contracts
python -m scripts.deploy

# Run frontend
cd frontend
npm install
npm run dev



<img width="715" height="340" alt="Ekran görüntüsü 2025-09-26 202145" src="https://github.com/user-attachments/assets/de99f347-6f31-45ea-9be5-9cbf42637a90" />

