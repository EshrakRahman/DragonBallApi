VITE_API = "https://api.escuelajs.co/api/v1/";
VITE_API_BASE_URL = "http://ecom-api.test/api";
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // add other variables here as your project grows
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}