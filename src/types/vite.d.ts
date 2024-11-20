interface ImportMetaEnv {
    readonly VITE_PORT: string;
    readonly VITE_BACKEND_HOST: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

