# Tutorial: Persisting Sessions Across Devices

One of the best features of Passkeys is that they are synced across devices via iCloud Keychain, Google Password Manager, or Bitwarden. 

## How LazorKit Handles Sessions

LazorKit automatically handles session persistence for your application:

1. **Local Persistence**: When a user connects, the session token is stored in the browser's `localStorage`. As long as the user doesn't clear their site data, they stay logged in.
2. **Auto-Reconnect**: On page refresh, the `LazorkitProvider` checks for an existing session and restores the `isConnected` state automatically.

## Re-authenticating on New Devices

When a user opens your dApp on a *different* device (e.g., they first used it on iPhone and now on MacBook):

1. They click **"Connect with Passkey"**.
2. Their device asks them to use a "Saved Passkey".
3. Because their passkey is synced in the cloud, they can choose the same passkey they created on their iPhone.
4. LazorKit recognizes the passkey and reconnects them to the **same Smart Wallet address**.

## Cross-Browser Persistence

If the user switches browsers on the same device (e.g., from Chrome to Firefox), they will need to click "Connect" again, but using the same passkey will land them in the same wallet.

## Best Practices for Developers

- **Check Connection Status**: Always use the `isConnecting` flag to show a loading state while LazorKit is checking for an existing session on mount.
- **Don't store private keys**: LazorKit is non-custodial. The "keys" are the passkeys managed by the OS. Your application never sees them.

```tsx
const { isConnected, isConnecting } = useWallet();

if (isConnecting) return <LoadingSpinner />;
if (!isConnected) return <LoginButton />;

return <Dashboard />;
```

LazorKit's architecture ensures that as long as the user has access to their device's passkey vault, they have access to their wallet.
