import { Process, Processor } from '@nestjs/bull'
import { ConfigService } from '@nestjs/config'
import { MailDataRequired } from '@sendgrid/helpers/classes/mail'
import * as Sendgrid from '@sendgrid/mail'
import { Job } from 'bull'
import { MailConfig } from 'src/config/mail'
import { AppConfig } from '../config/app'
import { EmailsQueue } from './constants'
import { SendEmailInput } from './emails.interface'

@Processor(EmailsQueue)
export class EmailsProcessor {
  constructor(private readonly configService: ConfigService) {
    this.boot()
  }

  @Process()
  async handleSend(job: Job<SendEmailInput>) {
    console.log('Sending mail...')
    console.log(job.data)
    const appConfig = this.configService.get<AppConfig>('app')
    if (appConfig.isDevelopment) {
      console.log('Skipped sending email cause on Development Environment. Happy Coding!')
      return
    }
    const response = await Sendgrid.send({ ...job.data, from: 'contact@aidiet.co' } as MailDataRequired)
    console.log('Message sent: ', response)
  }

  private async boot() {
    const mailConfig = this.configService.get<MailConfig>('mail')
    Sendgrid.setApiKey(mailConfig.apiKey)
  }
}
