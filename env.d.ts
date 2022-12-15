declare global {
    namespace NodeJS {
        interface ProcessEnv {
            secret: string;
            google_credentials: string;
        }
    }
}
