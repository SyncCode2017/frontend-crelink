interface Window {
    ethereum?: any;
    solana?: {
        connect(): Promise<{ publicKey: { toString(): string } }>;
        disconnect(): Promise<void>;
        isPhantom?: boolean;
    };
} 