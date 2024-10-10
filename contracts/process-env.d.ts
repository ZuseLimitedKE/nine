declare global {
    namespace NodeJS {
        interface ProcessEnv {
            WALLET_PRIVATE_KEY: string
        }
    }
}

export {}