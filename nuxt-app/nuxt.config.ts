// https://nuxt.com/docs/api/configuration/nuxt-config
// 環境変数を使用してビルド後に指定する必要があるプライベートまたはパブリック トークン。
import { fileURLToPath } from "url";
export default defineNuxtConfig({
  srcDir: "src/",
  nitro: {
    preset: 'aws-lambda',
  },
  runtimeConfig: {
    // サーバーサイドで使用
    apiSecret: "123",
    // フロントで使用
    public: {
      apiBase: "/api",
    },
  },
  css: [
    "@/sass/style.scss",
  ],
});
