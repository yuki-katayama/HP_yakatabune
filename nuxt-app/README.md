# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

```prettier
install
* npm
npm install --save-dev --save-exact prettier
* yarn
yarn add --dev --exact prettier

use
* npm
npx prettier --write .
* yarn
yarn prettier --write .
```

```
cloudforMationのcdkを作成
* npx serverless deploy

lambdaへデプロイ
* aws cloudformation deploy --template-file cdn.yml --stack-name nuxt-distribution --parameter-overrides NuxtSsrEnginDomain=f6326q6emmpe7gajuysuaxbtou0ngdch.lambda-url.ap-northeast-1.on.aws

S3へデプロイ
* aws s3 sync --delete .output/public s3://nuxt3-sample-public-bucket-aaaaa
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
