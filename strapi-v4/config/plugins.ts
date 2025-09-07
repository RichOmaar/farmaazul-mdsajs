export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("STRAPI_S3_ACCESS_KEY_ID"),
        secretAccessKey: env("STRAPI_S3_SECRET_ACCESS_KEY"),
        region: env("STRAPI_S3_REGION"),
        params: { Bucket: env("STRAPI_S3_BUCKET") },
        // Only needed if using non-AWS S3: endpoint + s3ForcePathStyle
        // endpoint: env("STRAPI_S3_ENDPOINT"),
        // s3ForcePathStyle: env.bool("STRAPI_S3_FORCE_PATH_STYLE", false),
      },
      // If you want URLs to use a CDN or custom domain:
      baseUrl: env("STRAPI_S3_BASE_URL"),
    },
  },
})
