import {
  GetObjectCommand,
  PutObjectCommand,
  S3,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

import { BucketType } from '../../../core/enums';
import { CompressedFile, TFile } from '../../../core/types';

@Injectable()
export class FileStorageService {
  private s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  public async uploadFile(
    file: Express.Multer.File | CompressedFile,
    bucket: BucketType,
    path: string | number,
    fileName = null,
    isPublic = false,
  ): Promise<string> {
    const parsedMime = file?.mimetype.split('/')[1];
    const mime = parsedMime === 'mpeg' ? 'mp3' : parsedMime;

    const params = {
      Bucket: process.env[bucket],
      Key: `${path}/${fileName ? fileName + '.' + mime : file?.originalname}`,
      Body: file?.buffer,
      ACL: isPublic ? 'public-read' : '',
    };
    await this.s3.send(new PutObjectCommand(params));

    return `https://${process.env[bucket]}.s3.${
      process.env.AWS_REGION
    }.amazonaws.com/${path}/${
      fileName ? fileName + '.' + mime : file.originalname
    }`;
  }

  public async getFile(bucket: BucketType, path: string): Promise<any> {
    const params = {
      Bucket: process.env[bucket],
      Key: path,
    };

    const client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const command = new GetObjectCommand(params);
    return getSignedUrl(client, command, { expiresIn: 3600 });
  }

  public getFilePath({
    userId,
    musicId,
    title,
  }: Pick<TFile, 'userId' | 'musicId' | 'title'>): string {
    return `${userId}/${musicId}/${title}`;
  }
}
