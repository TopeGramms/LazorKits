import express from 'express';
import cors from 'cors';
import { PublicKey, Connection, Keypair, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Configuration
const RPC_URL = process.env.RPC_URL || 'https://api.devnet.solana.com';
const PAYER_SECRET = process.env.PAYER_SECRET_KEY;
const connection = new Connection(RPC_URL, 'confirmed');

let payerAccount = null;

// Initialize payer account if secret key is provided
if (PAYER_SECRET) {
  try {
    const secretArray = JSON.parse(PAYER_SECRET);
    payerAccount = Keypair.fromSecretKey(new Uint8Array(secretArray));
    console.log(`Paymaster initialized with account: ${payerAccount.publicKey.toString()}`);
  } catch (error) {
    console.error('Failed to initialize payer account:', error);
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    paymaster: 'LazorKit Starter Paymaster',
    network: RPC_URL,
  });
});

// Paymaster endpoint - called by LazorKit SDK to get a payer for gasless transactions
app.post('/', async (req, res) => {
  try {
    // If no payer account is configured, return an error
    if (!payerAccount) {
      return res.status(400).json({
        error: 'Paymaster not configured',
        message: 'Please set PAYER_SECRET_KEY environment variable with a base58 or JSON encoded keypair',
      });
    }

    // Log the request (in production, you'd validate the transaction here)
    console.log('Paymaster request received');

    // Return the payer account public key
    // The LazorKit SDK will use this to add the payer to transactions
    res.json({
      payer: payerAccount.publicKey.toString(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Paymaster error:', error);
    res.status(500).json({
      error: 'Paymaster processing failed',
      message: error?.message || 'Unknown error',
    });
  }
});

// Fallback route
app.post('/api/paymaster', async (req, res) => {
  // Forward to main endpoint
  try {
    if (!payerAccount) {
      return res.status(400).json({
        error: 'Paymaster not configured',
        message: 'Please set PAYER_SECRET_KEY environment variable',
      });
    }

    res.json({
      payer: payerAccount.publicKey.toString(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Paymaster error:', error);
    res.status(500).json({
      error: 'Paymaster processing failed',
      message: error?.message || 'Unknown error',
    });
  }
});

app.listen(port, () => {
  console.log(`Paymaster server running on port ${port}`);
  if (!payerAccount) {
    console.warn('⚠️  WARNING: PAYER_SECRET_KEY not set. Paymaster will not function.');
    console.warn('Set PAYER_SECRET_KEY environment variable to enable gasless transactions.');
  } else {
    console.log(`✅ Paymaster ready. Payer: ${payerAccount.publicKey.toString()}`);
  }
});
