export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
        region: env("AWS_REGION"),
        params: { Bucket: env("AWS_BUCKET") },
        // Only needed if using non-AWS S3: endpoint + s3ForcePathStyle
        // endpoint: env("STRAPI_S3_ENDPOINT"),
        // s3ForcePathStyle: env.bool("STRAPI_S3_FORCE_PATH_STYLE", false),
      },
      // If you want URLs to use a CDN or custom domain:
      baseUrl: env("AWS_BASE_URL"),
    },
  },
})
