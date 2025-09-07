"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadObject = exports.downloadObject = exports.isFileExist = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const conn = new client_s3_1.S3Client({
    region: process.env.REGION,
    endpoint: `https://s3-${process.env.REGION}.amazonaws.com`,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
const isFileExist = async (path) => {
    try {
        const command = new client_s3_1.HeadObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: path
        });
        await conn.send(command);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.isFileExist = isFileExist;
const downloadObject = async (path, expiry = 60) => {
    const options = {
        Bucket: process.env.S3_BUCKET,
        Key: path
    };
    const command = new client_s3_1.GetObjectCommand(options);
    const url = await (0, s3_request_presigner_1.getSignedUrl)(conn, command, { expiresIn: expiry });
    return url;
};
exports.downloadObject = downloadObject;
const uploadObject = async (path, type, expiry = 60, acl = "private") => {
    const option = {
        Bucket: process.env.S3_BUCKET,
        Key: path,
        ContentType: type,
        ACL: acl
    };
    const command = new client_s3_1.PutObjectCommand(option);
    const url = await (0, s3_request_presigner_1.getSignedUrl)(conn, command, { expiresIn: expiry });
    return url;
};
exports.uploadObject = uploadObject;
