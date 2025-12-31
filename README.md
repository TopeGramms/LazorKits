# LazorKit Passkey & Gasless Starter

**A premium, high-quality starter template for building seamless Solana applications with the LazorKit SDK.**

This repository is designed to help developers bridge the gap between Web2 UX and Web3 power. No seed phrases, no browser extensions, and no gas fees for your users.

[![Live Demo](https://img.shields.io/badge/Demo-Live-green)](https://lazor-kits.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)

---

## ✨ Features

- 👤 **Passkey Authentication**: Secure FaceID/TouchID login via WebAuthn.
- ⛽ **Gasless Transactions**: Seamless sponsorship via the LazorKit Paymaster.
- 📱 **Responsive UI**: A modern, premium dashboard built with React + Tailwind CSS.
- 🔄 **Session Persistence**: Automatic wallet reconnection across refreshes and devices.
- 📖 **Documentation-First**: Step-by-step tutorials included for every core feature.

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
npm install
```

### 2. Start Developing
```bash
npm run dev
```
Open `http://localhost:5173` to see the app.

### 3. (Optional) Run Local Paymaster
To test gasless transactions locally:
```bash
npm run paymaster
```
*Note: See the `/paymaster` directory for configuration instructions.*

---

## 📚 Tutorials

We've provided high-quality, step-by-step guides to help you master LazorKit:

1.  [**Creating a Passkey-based Wallet**](./docs/tutorial-passkey-wallet.md) - Learn how to onboard users with biometrics.
2.  [**Triggering Gasless Transactions**](./docs/tutorial-gasless-transactions.md) - How to sponsor user fees with a Paymaster.
3.  [**Persisting Sessions Across Devices**](./docs/tutorial-session-persistence.md) - Understanding how passkey syncing works.

---

## 📂 Project Structure

```text
├── src/
│   ├── components/       # Reusable UI components
│   ├── lib/              # SDK config and clients
│   ├── pages/            # Application views (Home, Wallet)
│   └── App.tsx           # Main application logic
├── paymaster/            # Standalone paymaster service example
├── docs/                 # In-depth tutorials
├── public/               # Static assets
└── index.html            # Entry point
```

---

## 🛠️ Configuration

Central configuration is located in `src/lib/lazorkit.ts`. Update this file to change your RPC provider or Paymaster endpoint.

```typescript
export const lazorkitConfig: LazorkitConfig = {
  rpcUrl: "https://api.devnet.solana.com",
  portalUrl: "https://portal.lazor.sh",
  paymasterConfig: {
    paymasterUrl: "https://your-paymaster.com",
  },
};
```

---

## 🤝 Contributing

This is a starter template intended to accelerate Solana development. If you'd like to improve it, feel free to open an issue or submit a PR!

---

## 📜 License

MIT © 2025 Adekalu Temitope
