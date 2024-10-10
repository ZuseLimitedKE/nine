declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PRIVATE_KEY: string,
            CONTRACT_ADDRESS: string;
            TEST_ACCOUNT_PRIVATE_KEY: string;
        }
    }
}

export {};