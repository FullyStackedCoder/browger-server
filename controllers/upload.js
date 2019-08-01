const AWS = require("aws-sdk");
const uuid = require("uuid/v1");

const config = require("../config");

const s3 = new AWS.S3({
  region: "ap-south-1",
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
});

exports.newUpload = async (req, res, next) => {
  try {
    const type = req.params.type;
    const key = `${req.userId}/${uuid()}.${type}`;
    const url = await s3.getSignedUrl("putObject", {
      Bucket: "browger-bucket",
      ContentType: `image/${type}`,
      Key: key
    });
    res
      .status(200)
      .json({ message: "Got signed URL successfully.", url: url, key: key });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.newAvatar = async (req, res, next) => {
  try {
    const type = req.params.type;
    const key = `avatars/${req.userId}/${uuid()}.${type}`;
    const url = await s3.getSignedUrl("putObject", {
      Bucket: "browger-bucket",
      ContentType: `image/${type}`,
      Key: key
    });
    res
      .status(200)
      .json({ message: "Got signed URL successfully.", url: url, key: key });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
