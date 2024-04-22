import {S3Client , PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"

class S3Service {
    constructor(region ,accessKeyId , secretAccessKey , bucketName) {
        this.s3 = new S3Client({
            region : region,
            credentials : {
                accessKeyId,
                secretAccessKey
            }
        })
        this.bucketName = bucketName
    }

        uploadImageToS3 = async (file) => {
            const params = {
                Bucket : this.bucketName,
                Key : file.originalname,
                Body : file.buffer,
                ContentType: file.mimetype,
            } 

            const command = new PutObjectCommand(params);
             await this.s3.send(command)
        }

        getImageLinkByName = async (ImageName) => {
            const imageUrl = await getSignedUrl(
              this.s3 , 
              new GetObjectCommand({
                Bucket : this.bucketName,
                Key : ImageName
              }) , {expiresIn : 3600}
            );

            return imageUrl;
        }

        deleteImage = async (imageName) => {
            const params = {
                Bucket : this.bucketName,
                Key : imageName
            }

            const command = new DeleteObjectCommand(params)
            const deleteImage = await this.s3.send(command)
            return deleteImage;
        }
}

export default S3Service;