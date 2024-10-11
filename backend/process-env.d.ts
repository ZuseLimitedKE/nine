declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PRIVATE_KEY: string,
            CONTRACT_ADDRESS: string;
            TEST_ACCOUNT_PRIVATE_KEY: string;
            PORT: number;
            PINATA_GATEWAY: string;
            PINATA_JWT: string;
            NEON_CONNECTION_STRING: string;
            EXPO_ACCESS_TOKEN: string;
        }
    }
}

export {};