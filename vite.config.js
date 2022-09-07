import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";
import viteSvgIcons from "vite-plugin-svg-icons";

const setAlias = (alias) =>
  alias.map((v) => {
    return { find: v[0], replacement: path.resolve(__dirname, v[1]) };
  });

export default ({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const prodMock = true;
  return {
    base: "/v3-admin-template/dist/",
    resolve: {
      alias: setAlias([
        ["@", "src"],
        ["/mock", "mock"],
        ["/server", "server"],
      ]),
    },
    server: {
      // proxy: {
      //   "/api": {
      //     target: "https://yapi.pro/mock/3417",
      //     changeOrigin: true,
      //     rewrite: "",
      //   },
      // },
      port: env.VITE_PORT,
    },
    build: {
      // sourcemap: true,
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: {
            "element-plus": ["element-plus"],
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: "mock",
        supportTs: false,
        logger: true,
        localEnabled: command === "serve",
        prodEnabled: command !== "serve" && prodMock,
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
                import { setupProdMockServer } from '/mock/mockProdServer';
                setupProdMockServer();
                `,
      }),
      viteSvgIcons({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    css: {
      postcss: {
        plugins: [
          require("autoprefixer"),
          require("tailwindcss/nesting"),
          require("tailwindcss"),
          require("postcss-simple-vars"),
          require("postcss-import"),
        ],
      },
    },
  };
};
