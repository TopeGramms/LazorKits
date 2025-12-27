
```md
# Passkey Solana Starter (LazorKit)

A minimal, hackathon-ready starter for building **passkey-based Solana wallets** with **gasless Devnet transactions** using the LazorKit Wallet SDK.

Designed to be **copy-paste friendly**, not a heavyweight boilerplate.

---

## What This Demonstrates

- Passkey smart wallet creation (WebAuthn, no seed phrase, no extension)
- Passkey-based login / reconnect flow
- Gasless Solana Devnet transactions via LazorKit paymaster
- Simple React app structure that mirrors a Next.js setup

---

## Tech Stack

- React
- Vite
- TypeScript
- Solana (Devnet)
- LazorKit Wallet SDK

---

## Quick Start

- Install dependencies  
  `npm install`

- Start development server  
  `npm run dev`

- Open the printed local URL  
- Click **“Connect with Passkey”**  
- Access wallet dashboard and send a gasless Devnet transaction

---

## Project Structure

```
client/
  src/
    components/
      passkey-login.tsx
      wallet-status.tsx
      send-usdc.tsx
    lib/
      lazorkit.ts
    pages/
      home.tsx
      wallet.tsx
    App.tsx
    main.tsx
```

---

## Core Files

### `client/src/lib/lazorkit.ts`
Central LazorKit configuration:
- Solana RPC (Devnet)
- LazorKit portal URL (passkey UI)
- Paymaster URL (gas sponsorship)

Used by `LazorkitProvider` in `App.tsx`.

---

### `PasskeyLogin`
`client/src/components/passkey-login.tsx`

- Single entry point for wallet creation / login
- Calls `useWallet().connect()`
- Redirects to `/wallet` when connected
- Drop-in component for any app

---

### `WalletStatus`
`client/src/components/wallet-status.tsx`

- Displays connected smart wallet address
- Copy address
- Disconnect wallet

---

### `SendUsdc`
`client/src/components/send-usdc.tsx`

- Demonstrates a **gasless transaction**
- Uses a Memo instruction (safe demo default)
- Calls `signAndSendTransaction`
- Transaction routed through LazorKit paymaster
- Displays status + Solana Explorer link

---

## End-to-End Flow

- App boots with:
  - `QueryClientProvider`
  - `LazorkitProvider { ...lazorkitConfig }`

- User connects via passkey:
  - Browser biometric prompt (WebAuthn)
  - Smart wallet created or restored
  - Redirect to `/wallet`

- Wallet dashboard:
  - Wallet address shown
  - Gasless transaction executed via paymaster

---

## Customization

### Change RPC / Network
- Update `lazorkitConfig` in `client/src/lib/lazorkit.ts`

### Use in Next.js
- Move `lib/lazorkit.ts` into your Next.js `lib/`
- Copy components into `components/`
- Wrap root layout with:
  - `QueryClientProvider`
  - `LazorkitProvider`

### Real Token Transfers
- Replace Memo instruction in `SendUsdc`
- Use SPL token or SOL transfer
- Keep `signAndSendTransaction` for gasless support

---

## Notes

- Devnet only
- Intended for demos, hackathons, and reference use
- Not audited for mainnet use

---

## Why This Exists

This repo is meant to be:
- A **reference implementation**
- A **learning aid**
- A **starter you can fork and demo in minutes**

No abstractions you don’t need. No magic. Just the core LazorKit flow, end to end.
```

---
