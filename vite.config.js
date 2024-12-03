import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
    define: {
        global: {},
    },
    resolve: {},
    plugins: [react()],
    optimizeDeps: {
        include: ['@mui/material/Tooltip', '@emotion/styled'],
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 5000,
    },
});
