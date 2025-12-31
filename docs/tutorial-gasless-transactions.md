# Tutorial: Triggering Gasless Transactions

Gasless transactions (sponsored transactions) allow users to interact with your dApp without holding any SOL. LazorKit makes this process seamless via its Paymaster integration.

## How Gasless Transactions Work

1. **dApp** builds a transaction instruction.
2. **dApp** calls `signAndSendTransaction`.
3. **LazorKit SDK** contacts the configured **Paymaster**.
4. **Paymaster** adds itself as the fee payer and signs the transaction.
5. **Solana Network** processes the transaction, charging the Paymaster instead of the user.

## Step 1: Configure the Paymaster

In your `LazorkitProvider` configuration, include the `paymasterConfig`.

```tsx
const config = {
  rpcUrl: "https://api.devnet.solana.com",
  portalUrl: "https://portal.lazor.sh",
  paymasterConfig: {
    paymasterUrl: "https://your-paymaster-endpoint.com",
  },
};
```

## Step 2: Build and Send a Transaction

Use the `signAndSendTransaction` function from `useWallet`. You don't need to worry about fee payers or signing — LazorKit handles it.

```tsx
import { useWallet } from "@lazorkit/wallet";
import { TransactionInstruction, PublicKey } from "@solana/web3.js";

export function SendMessage() {
  const { signAndSendTransaction, isSigning } = useWallet();

  const handleSend = async () => {
    // 1. Create a simple instruction (e.g., a Memo)
    const instruction = new TransactionInstruction({
      keys: [],
      programId: new PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'),
      data: Buffer.from('Testing gasless flow!'),
    });

    try {
      // 2. Send it gasless!
      const signature = await signAndSendTransaction({
        instructions: [instruction],
      });
      
      console.log("Transaction Link:", `https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  return (
    <button onClick={handleSend} disabled={isSigning}>
      {isSigning ? "Processing..." : "Send Gasless Message"}
    </button>
  );
}
```

## Step 3: Setting up your own Paymaster

To run your own paymaster service, you can use the example provided in the `/paymaster` directory of this repo. 

A paymaster is a simple Express server that:
1. Receives a request from the SDK.
2. Returns a public key of an account that has SOL to pay for fees.
3. (Optionally) Validates and signs the transaction if using more complex sponsorship logic.

## Summary

With LazorKit, gasless transactions are as simple as calling one function. The SDK handles the heavy lifting of routing through the paymaster.
