# LazorKit Paymaster

A simple Solana paymaster service for sponsoring gasless transactions with LazorKit.

## Setup

### 1. Install Dependencies

```bash
cd paymaster
npm install
```

### 2. Create a Payer Account

You need a Solana account with SOL to sponsor transactions. Create one or use an existing keypair.

To generate a new keypair:
```bash
solana-keygen new --outfile payer-keypair.json
```

Get your keypair as a JSON array:
```bash
cat payer-keypair.json
# Output: [123, 45, 67, ...]
```

### 3. Fund the Account

Transfer SOL to your payer account for sponsoring transactions. On Devnet:
```bash
solana airdrop 10 <YOUR_PAYER_PUBLIC_KEY> -u devnet
```

### 4. Set Environment Variable

Create a `.env` file or set the environment variable:

```bash
export PAYER_SECRET_KEY='[123, 45, 67, ...]'  # Your keypair as JSON array
export RPC_URL='https://api.devnet.solana.com'  # Optional, defaults to Devnet
```

### 5. Start the Paymaster

```bash
npm run dev
```

The paymaster will start on `http://localhost:3000`

## Deployment to Vercel

### 1. Create a new Vercel project:
```bash
vercel
```

### 2. Add environment variables in Vercel dashboard:
- `PAYER_SECRET_KEY` - Your keypair as JSON array
- `RPC_URL` - Solana RPC endpoint (optional)

### 3. Deploy:
```bash
vercel --prod
```

### 4. Update your LazorKit config with the Vercel URL:

In `client/src/lib/lazorkit.ts`:
```typescript
paymasterConfig: {
  paymasterUrl: "https://your-vercel-project.vercel.app",
}
```

## Environment Variables

- `PAYER_SECRET_KEY` (required) - Base58 or JSON array encoded keypair for sponsoring transactions
- `RPC_URL` (optional) - Solana RPC endpoint. Defaults to `https://api.devnet.solana.com`
- `PORT` (optional) - Server port. Defaults to 3000

## API Endpoints

### GET /health
Returns paymaster status and configuration

### POST /
Main paymaster endpoint called by LazorKit SDK
- Returns the payer public key for gasless transactions

### POST /api/paymaster
Alternative endpoint for paymaster requests

## Security Notes

⚠️ **Important for Production:**
- Never commit `PAYER_SECRET_KEY` to version control
- Use environment variables only
- Implement transaction validation and spending limits
- Monitor for abuse
- Consider a transaction review/approval system
- Rotate payer accounts regularly
- Set maximum transaction size limits

## License

MIT
