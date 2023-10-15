const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const BUCKET_NAME = "website-hackathon-files";
const BUCKET_REGION = "ap-south-1";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: BUCKET_REGION,
});

exports.generatePutUrl = async (req, res) => {
  try {
    const { contentType } = req.body;

    let imageExtension =
      contentType.split("/")[contentType.split("/").length - 1];

    const imageFileName = `${uuidv4()}.${imageExtension}`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: imageFileName,
      ContentType: contentType,
    };

    const signedUrl = s3.getSignedUrl("putObject", params);

    return res.status(200).json({ signedUrl, key: imageFileName });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.generateGetUrlHelper = async (filenames) => {
  try {
    const urls = [];
    await Promise.all(
      filenames.map(async (filename) => {
        const params = {
          Bucket: BUCKET_NAME,
          Key: filename,
        };

        const signedUrl = s3.getSignedUrl("putObject", params);
        urls.push(signedUrl);
      })
    );

    return urls;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

exports.generateGetUrl = async (req, res) => {
  try {
    if (!req.body || !req.body.filenames) {
      return res.status(400).json({ message: "Please provide filename." });
    }

    const filenames = req.body.filenames;
    const urls = await module.exports.generateGetUrlHelper(filenames);

    return res.status(200).json({ urls });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
