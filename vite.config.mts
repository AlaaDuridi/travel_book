import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import * as path from "path";

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    const port = Number(env.VITE_PORT);

    return {
        // depending on your application, base can also be "/"
        base: "",
        plugins: [react(), viteTsconfigPaths(), svgr({svgrOptions: {icon: true}})],
        server: {
            // this ensures that the browser opens upon server start
            open: true,
            // this sets a default port to 3000
            port: !isNaN(port) ? port : 3000,
            host: true,
            proxy: {
                "/api/v1/": {
                    target: env.VITE_BACKEND_HOST,
                    changeOrigin: true
                }
            }
        },
        resolve: {
            alias: [{find: "@", replacement: path.resolve(__dirname, "src")}]
        },
        test: {
            setupFiles: ["./src/setupTests.ts"],
            globals: true,
            environment: "jsdom"
        }
    };
});
