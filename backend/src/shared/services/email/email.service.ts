import { SES } from '@aws-sdk/client-ses';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class EmailService {
  private ses = new SES({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  async sendEmail(email, template) {
    try {
      const params = {
        Destination: {
          // CcAddresses: [email],
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: template,
            },
            Text: {
              Charset: 'UTF-8',
              Data: 'Test email',
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Test email',
          },
        },
        Source: 'no-reply@serverdev.xyz',
        ReplyToAddresses: ['yana@digiway.dev'],
      };
      await this.ses.sendEmail(params);
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
