// src/config/r2.js
const { S3Client } = require("@aws-sdk/client-s3");
const { NodeHttpHandler } = require("@aws-sdk/node-http-handler");
const https = require("https");

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.CF_R2_ENDPOINT,
  forcePathStyle: true, // Cloudflare R2 precisa disso!!!
  requestHandler: new NodeHttpHandler({
    httpsAgent: new https.Agent({
      keepAlive: true,
      rejectUnauthorized: false, // evita handshake SSL falhar
    }),
  }),
  credentials: {
    accessKeyId: process.env.CF_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CF_R2_SECRET_ACCESS_KEY,
  },
});

module.exports = r2;
