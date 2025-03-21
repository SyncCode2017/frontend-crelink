import { ethers } from 'ethers';

export type WalletType = 'metamask' | 'phantom';

interface WalletConnection {
    address: string;
    type: WalletType;
    provider?: ethers.BrowserProvider;
    chainId?: number;
    signer?: ethers.JsonRpcSigner;
}

class WalletService {
    private static instance: WalletService;
    private _connection: WalletConnection | null = null;

    private constructor() { 

    }

    static getInstance(): WalletService {
        if (!WalletService.instance) {
            WalletService.instance = new WalletService();
        }
        return WalletService.instance;
    }

    get connection() {
        return this._connection;
    }

    async connectMetamask(): Promise<WalletConnection> {
        try {
            if (!window.ethereum) {
                throw new Error('MetaMask is not installed');
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            const network = await provider.getNetwork();
            const signer = await provider.getSigner();

            this._connection = {
                address: accounts[0],
                type: 'metamask',
                provider: provider,
                chainId: Number(network.chainId),
                signer: signer
            };

            return this._connection;
        } catch (error) {
            console.error('MetaMask connection error:', error);
            throw error;
        }
    }

    async connectPhantom(): Promise<WalletConnection> {
        try {
            if (!window.solana) {
                throw new Error('Phantom wallet is not installed');
            }

            const resp = await window.solana.connect();

            this._connection = {
                address: resp.publicKey.toString(),
                type: 'phantom'
            };

            return this._connection;
        } catch (error) {
            console.error('Phantom wallet connection error:', error);
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        if (!this._connection) return;

        try {
            if (this._connection.type === 'phantom' && window.solana) {
                await window.solana.disconnect();
            }
            this._connection = null;
        } catch (error) {
            console.error('Wallet disconnection error:', error);
            throw error;
        }
    }
}

export default WalletService.getInstance(); 