import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { EmailsQueue } from './constants'
import { SendEmailInput } from './emails.interface'

@Injectable()
export class EmailsService {
  constructor(@InjectQueue(EmailsQueue) private readonly mailsQueue: Queue<SendEmailInput>) {}

  async send(sendEmailInput: SendEmailInput) {
    console.log('add to queue')
    await this.mailsQueue.add(sendEmailInput)
  }
}
