import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  plugins: [
    {
      resolve: '@rokmohar/medusa-plugin-meilisearch',
      options: {
        config: {
          host: process.env.MEILISEARCH_HOST ?? '',
          apiKey: process.env.MEILISEARCH_API_KEY ?? '',
        },
        // optional:
        // settings: {
        //   products: {
        //     type: 'products',
        //     fields: ['id','title','description','handle','variant_sku','thumbnail'],
        //     indexSettings: {
        //       searchableAttributes: ['title','description','variant_sku'],
        //       displayedAttributes: ['id','handle','title','description','variant_sku','thumbnail'],
        //       filterableAttributes: ['id','handle'],
        //     },
        //     primaryKey: 'id',
        //   },
        // },
        // i18n: { strategy: 'field-suffix', languages: ['en'], defaultLanguage: 'en' }
      },
    },
  ],
  modules: [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_FILE_URL,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION,
              bucket: process.env.S3_BUCKET,
              // For AWS leave endpoint empty; for S3-compatible you’d set it
              endpoint: process.env.S3_ENDPOINT,
              additional_client_config: {
                forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
              },
            },
          },
        ],
      },
    },
  ],
})
