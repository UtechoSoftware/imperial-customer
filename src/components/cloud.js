// gcloudConfig.js
const { Storage } = require('@google-cloud/storage');

// Replace these placeholders with your actual project ID and path to your service account key file
const storage = new Storage({
  projectId: '<YOUR_PROJECT_ID>',
  keyFilename: '<PATH_TO_SERVICE_ACCOUNT_KEY_FILE>',
});

const bucket = storage.bucket('<YOUR_BUCKET_NAME>');

module.exports = { bucket };
