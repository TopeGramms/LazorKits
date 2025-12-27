# Passkey Solana Starter (LazorKit)

This starter is built for hackathons and demos: you can clone it, plug in your own RPC/Paymaster if needed, and have a passkey-based Solana wallet with gasless Devnet transactions running in a few minutes. The goal is to be more "copy-paste friendly" than a full-blown boilerplate.

It demonstrates how to use the **LazorKit Wallet SDK** to:

- **Create / connect a smart wallet with passkeys** (WebAuthn, no browser extension or seed phrase)
- **Send a gasless transaction on Solana Devnet** using LazorKit's paymaster

The frontend is built with **React + Vite + TypeScript**, but the structure mirrors what you'd use in a Next.js app (`components`, `lib`, etc.) so you can easily migrate.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start the dev server (runs both backend + frontend)
npm run dev
```

Then open the printed URL in your browser, click "Connect with Passkey" on the home page, and you'll be taken to the wallet dashboard where you can fire a gasless Devnet transaction.

---

## Key Pieces

- **`client/src/lib/lazorkit.ts`**
  - Central place for LazorKit configuration:
    - `rpcUrl` (Solana Devnet endpoint)
    - `portalUrl` (LazorKit hosted passkey UI)
    - `paymasterConfig.paymasterUrl` (for gasless tx sponsorship)
  - Imported in `App.tsx` and spread into `LazorkitProvider`.

- **`client/src/components/passkey-login.tsx` (`PasskeyLogin`)**
  - Single button that triggers LazorKit's passkey flow and sends the user to `/wallet` when they're connected.
  - Calls `useWallet().connect()` from `@lazorkit/wallet` - that's pretty much it.
  - You can drop this component anywhere in your app as the entry point for wallet creation/login.

- **`client/src/components/send-usdc.tsx` (`SendUsdc`)**
  - Demonstrates a **gasless transaction** by sending a Memo instruction (for the demo we use Memo instead of moving real tokens).
  - Uses `signAndSendTransaction` which routes through LazorKit's paymaster so the user doesn't need SOL for fees.
  - Shows status, error messages, and a link to Solana Explorer on success. Swap out the Memo instruction with an SPL transfer if you want a "real" token flow.

- **`client/src/components/wallet-status.tsx` (`WalletStatus`)**
  - Displays the connected smart wallet address and lets the user copy or disconnect.
  - Used on the `/wallet` page alongside `SendUsdc`.

- **Routing / Layout**
  - `client/src/App.tsx` wires:
    - `QueryClientProvider` (React Query)
    - `LazorkitProvider` (configured via `lazorkitConfig`)
    - `Layout` + `wouter` routes for:
      - `/` → `Home` (shows `PasskeyLogin`)
      - `/wallet` → `WalletPage` (shows `WalletStatus` + `SendUsdc`)
      - Fallback → `NotFound`

---

## How It Works (End‑to‑End)

1. **App bootstraps providers**
   - `main.tsx` renders `App`, which wraps everything with `QueryClientProvider` and `LazorkitProvider {...lazorkitConfig}`.
   - Once that's set up, LazorKit has access to your RPC, portal, and paymaster configuration.

2. **User connects via passkey**
   - On `/`, the `Home` page renders `PasskeyLogin`.
   - Clicking the button calls `connect()` from `useWallet()`.
   - LazorKit opens its passkey UI (hosted at `portalUrl`) and handles wallet creation / login.
   - Once `isConnected` is true, `PasskeyLogin` automatically redirects to `/wallet`.

3. **Wallet dashboard**
   - `/wallet` shows:
     - `WalletStatus` - displays the smart wallet address and lets you copy/disconnect.
     - `SendUsdc` - runs a sample gasless transaction.

4. **Gasless transaction**
   - `SendUsdc` builds a **Memo instruction** and calls `signAndSendTransaction(instruction)`.
   - LazorKit routes this through the configured paymaster (`paymasterUrl`), which sponsors the fees.
   - On success, you'll see the transaction signature with a link to Solana Explorer (Devnet).

---

## Adapting This Starter

**Changing networks / infra**
- Update `lazorkitConfig` in `client/src/lib/lazorkit.ts` - that's the single place where RPC URL, portal, and paymaster live. Change it there and everything else picks it up.

**Using in Next.js**
- Move `lib/lazorkit.ts` to `app/lib/lazorkit.ts` (or `src/lib` if you use that structure).
- Copy components from `client/src/components` into your Next.js `components` folder.
- Wrap your root layout with `QueryClientProvider` + `LazorkitProvider {...lazorkitConfig}` just like `App.tsx` does here.

**Adding real token transfers**
- Replace the Memo instruction in `SendUsdc` with an SPL token transfer or SOL transfer.
- Keep using `signAndSendTransaction` so LazorKit + the paymaster can handle the gasless behavior.

---

This codebase is intentionally small and focused so you can treat it as a **reference implementation** or a **copy-pasteable starter** for your own LazorKit + Solana projects. If you run into issues or want to extend it, the structure should make it pretty straightforward to find what you need.


