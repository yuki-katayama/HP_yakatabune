// https://nuxt.com/docs/api/configuration/nuxt-config
// 環境変数を使用してビルド後に指定する必要があるプライベートまたはパブリック トークン。
import { fileURLToPath } from "url";
export default defineNuxtConfig({
	runtimeConfig: {
		// サーバーサイドで使用
		apiSecret: '123',
		// フロントで使用
		public: {
		  apiBase: '/api'
		}
	},
	css: ["@/assets/style.scss",
		"@/assets/base/_header.scss",
		"@/assets/base/_reset.scss"
	],
	vite: {
		css: {
		  preprocessorOptions: {
			scss: {
			  additionalData:`
				@import "@/assets/setting/_config.scss";
			  `}
		  }
		}
	}
})
