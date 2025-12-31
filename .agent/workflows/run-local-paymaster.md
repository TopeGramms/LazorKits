---
description: How to start and configure the local Solana paymaster
---

// turbo-all
1. Navigate to the paymaster directory:
   `cd Passkey-Solana-Kit-1/paymaster`

2. Install dependencies:
   `npm install`

3. Create the configuration file:
   Rename `.env.example` to `.env` if it doesn't exist.

4. Set your `PAYER_SECRET_KEY`:
   Open the `.env` file and paste your Solana keypair as a JSON array (e.g., `[123, 45, ...]`).
   > [!IMPORTANT]
   > This account must have Devnet SOL to sponsor transactions.

5. Start the paymaster:
   `npm run dev` (starts on `http://localhost:3000`)

6. Update the frontend config:
   Open `client/src/lib/lazorkit.ts` and uncomment the `paymasterConfig`, setting `paymasterUrl` to `http://localhost:3000`.
