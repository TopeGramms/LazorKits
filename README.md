# LazorKit Passkey Starter

**A minimal, production-ready starter for building passkey-based Solana apps using LazorKit.**

This repository demonstrates how to integrate the **LazorKit Wallet SDK** to create smart wallets with passkeys (WebAuthn) and send **gasless transactions on Solana Devnet** — without browser extensions or seed phrases.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![React](https://img.shields.io/badge/React-18.3-blue)
![Solana](https://img.shields.io/badge/Solana-Devnet-purple)

**Live Demo:** https://lazor-kits.vercel.app/  
**License:** MIT

---

## What is LazorKit?

LazorKit is an open-source passkey wallet SDK for Solana that removes the biggest UX barriers in blockchain applications.

| Traditional Solana UX | With LazorKit |
|-----------------------|---------------|
| Seed phrases          | Face ID / Touch ID |
| Wallet extensions     | In-browser only |
| Users pay gas         | Gasless via paymaster |
| Manual setup          | One-click wallet creation |

This starter shows **practical integration patterns** you can reuse immediately.

---

## Why This Starter Exists

Most Solana examples fall into one of two traps:
- Too basic to be useful
- Too complex to learn from quickly

This project sits in the middle.

The goal is to provide a **clear, copy-paste-friendly reference implementation** that demonstrates:

- Passkey authentication using WebAuthn  
- Smart wallet creation and reconnection  
- Gasless transactions via LazorKit paymaster  
- A simple UI that keeps focus on the integration  

This is **not a full product** — it's a starter and learning reference.

---

## Features

- ✅ **Passkey-based wallet creation** (Face ID / Touch ID / biometrics)
- ✅ **Smart wallet on Solana Devnet**
- ✅ **Gasless transactions** sponsored by paymaster
- ✅ **Session persistence** across refresh
- ✅ **Clean, modular project structure**
- ✅ **Easy to adapt** for Next.js or other frameworks

---

## Quick Start

```bash
# Install dependencies
npm install

# Start the dev server (runs both backend + frontend)
npm run dev
```

Then open the printed URL in your browser, click **"Connect with Passkey"** on the home page, and you'll be taken to the wallet dashboard where you can fire a gasless Devnet transaction.

---

## Project Structure

```
Passkey-Solana-Kit-1/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── passkey-login.tsx    # Passkey authentication button
│   │   │   ├── send-usdc.tsx        # Gasless transaction demo
│   │   │   ├── wallet-status.tsx    # Wallet info display
│   │   │   └── ui/                  # shadcn/ui components
│   │   ├── lib/
│   │   │   └── lazorkit.ts          # LazorKit configuration
│   │   ├── pages/
│   │   │   ├── home.tsx             # Landing page
│   │   │   └── wallet.tsx           # Wallet dashboard
│   │   └── App.tsx                  # Root component
│   └── index.html
├── server/                           # Express backend
└── package.json
```

### Key Files

**`client/src/lib/lazorkit.ts`**
- Central configuration for LazorKit SDK
- Single place to update RPC URL, portal URL, and paymaster settings
- Exported as `lazorkitConfig` and spread into `LazorkitProvider`

**`client/src/components/passkey-login.tsx`**
- Simple button component that triggers wallet creation/connection
- Uses `useWallet().connect()` from `@lazorkit/wallet`
- Automatically redirects to `/wallet` on successful connection

**`client/src/components/send-usdc.tsx`**
- Demonstrates gasless transaction flow
- Sends a Memo instruction (swap for SPL transfer in production)
- Uses `signAndSendTransaction` with paymaster sponsorship

**`client/src/components/wallet-status.tsx`**
- Displays connected wallet address
- Copy address and disconnect functionality

---

## How It Works

### 1. App Initialization
`main.tsx` renders `App`, which wraps the application with:
- `QueryClientProvider` (React Query for data fetching)
- `LazorkitProvider` with configuration from `lazorkitConfig`

This gives LazorKit access to your RPC endpoint, portal URL, and paymaster configuration.

### 2. Passkey Authentication
1. User visits `/` and sees the `PasskeyLogin` button
2. Clicking triggers `useWallet().connect()`
3. LazorKit opens its passkey UI (hosted at `portalUrl`)
4. User authenticates with Face ID / Touch ID / device password
5. Wallet is created or reconnected
6. User is automatically redirected to `/wallet`

### 3. Wallet Dashboard
The `/wallet` route displays:
- **WalletStatus**: Shows smart wallet address with copy/disconnect
- **SendUsdc**: Button to send a gasless transaction

### 4. Gasless Transaction Flow
1. User clicks "Send Gasless Transaction"
2. `SendUsdc` builds a transaction instruction (Memo for demo)
3. Calls `signAndSendTransaction({ instructions: [...] })`
4. LazorKit routes through the paymaster, which sponsors fees
5. Transaction is signed and sent to Solana Devnet
6. Success message shows with link to Solana Explorer

---

## Customization

### Changing Networks / Infrastructure

Update `lazorkitConfig` in `client/src/lib/lazorkit.ts`:

```typescript
export const lazorkitConfig: LazorkitConfig = {
  rpcUrl: "https://api.mainnet-beta.solana.com",  // Change to mainnet
  portalUrl: "https://portal.lazor.sh",
  paymasterConfig: {
    paymasterUrl: "https://your-paymaster-url.com",  // Your paymaster
  },
};
```

This is the **single source of truth** — change it here and everything else picks it up.

### Important: Paymaster Service

The default paymaster URL (`https://lazorkit-paymaster.onrender.com`) is hosted on Render's free tier and may go offline or have suspension issues.

### Important: Paymaster Service

> [!NOTE]
> **Paymaster Note**  
> Gasless transactions require a funded paymaster. At the time of submission, I do not currently have SOL available to run a dedicated paymaster, so gas sponsorship is documented and optional. Passkey authentication and smart wallet creation work independently and are fully functional.

To enable gasless transactions, you can:
- Open `client/src/lib/lazorkit.ts` and uncomment the `paymasterConfig`.
- Deploy your own paymaster instance (see the `/paymaster` directory).
- Use a reliable hosting service (Vercel, AWS, etc.) instead of Render free tier
- Test the paymaster endpoint manually before deploying

**If you get CORS errors:**
```
Access to fetch at 'https://lazorkit-paymaster.onrender.com/' has been blocked by CORS policy
```

This means the paymaster is either offline or not configured for CORS. Either:
1. Wait for the service to come back online (if using the demo paymaster)
2. Deploy your own paymaster with proper CORS headers (use the included `/paymaster` code)
3. Check if the paymaster is running: `curl https://lazorkit-paymaster.onrender.com/`

### Using in Next.js

1. Move `lib/lazorkit.ts` to `app/lib/lazorkit.ts` (or `src/lib/`)
2. Copy components from `client/src/components/` to your Next.js `components/` folder
3. Wrap your root layout with providers:

```tsx
// app/layout.tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { LazorkitProvider } from "@lazorkit/wallet";
import { lazorkitConfig } from "@/lib/lazorkit";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          <LazorkitProvider {...lazorkitConfig}>
            {children}
          </LazorkitProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

### Adding Real Token Transfers

Replace the Memo instruction in `SendUsdc` with an SPL token transfer:

```typescript
import { createTransferInstruction } from "@solana/spl-token";

const transferInstruction = createTransferInstruction(
  sourceTokenAccount,
  destinationTokenAccount,
  walletPublicKey,
  amount
);

const sig = await signAndSendTransaction({
  instructions: [transferInstruction],
});
```

The paymaster will still sponsor the fees automatically.

---

## Tech Stack

- **React 18** + **Vite** + **TypeScript**
- **LazorKit Wallet SDK** (`@lazorkit/wallet`)
- **Solana Web3.js** (`@solana/web3.js`)
- **React Query** (`@tanstack/react-query`)
- **shadcn/ui** components
- **Tailwind CSS**

---

## Contributing

This is a starter template — feel free to fork, modify, and use it for your own projects. If you find bugs or have suggestions, issues and PRs are welcome!

---

## License

MIT © 2025 Adekalu Temitope


