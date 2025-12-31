# Tutorial: Creating a Passkey-based Wallet

This tutorial will guide you through integrating passkey authentication into your Solana application using the LazorKit SDK.

## Prerequisites

- React application (Vite recommended)
- `@lazorkit/wallet` installed
- `@solana/web3.js` installed

## Step 1: Configure LazorKitProvider

Wrap your application with `LazorkitProvider`. This provider manages the wallet state and connection to the passkey portal.

```tsx
// src/App.tsx
import { LazorkitProvider } from "@lazorkit/wallet";

const config = {
  rpcUrl: "https://api.devnet.solana.com",
  portalUrl: "https://portal.lazor.sh",
};

export function App() {
  return (
    <LazorkitProvider {...config}>
      <YourAppContents />
    </LazorkitProvider>
  );
}
```

## Step 2: Use the `useWallet` Hook

Inside your components, use the `useWallet` hook to access the `connect` function and connection state.

```tsx
// src/components/LoginButton.tsx
import { useWallet } from "@lazorkit/wallet";

export function LoginButton() {
  const { connect, isConnecting, isConnected } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
      console.log("Connected successfully!");
    } catch (error) {
      console.error("Connection failed", error);
    }
  };

  return (
    <button onClick={handleConnect} disabled={isConnecting}>
      {isConnecting ? "Connecting..." : "Connect with Passkey"}
    </button>
  );
}
```

## Step 3: Handling Successful Connection

Once `isConnected` becomes true, LazorKit has established a session. You can now access the user's public key.

```tsx
const { publicKey, status } = useWallet();

if (isConnected) {
  return <p>Connected: {publicKey?.toString()}</p>;
}
```

## How it works under the hood

1. **`connect()`**: Triggers the browser's WebAuthn API.
2. **Biometric Auth**: The user authenticates with FaceID, TouchID, or Passcode.
3. **Session Generation**: LazorKit creates a cryptographic session bound to the passkey.
4. **Smart Wallet**: A smart wallet is derived/created for the user on Solana.

That's it! You've successfully implemented passkey-based onboarding.
