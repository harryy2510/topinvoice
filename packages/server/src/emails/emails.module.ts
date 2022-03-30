import { BullModule } from '@nestjs/bull'
import { Global, Module } from '@nestjs/common'
import { EmailsQueue } from './constants'
import { EmailsProcessor } from './emails.processor'
import { EmailsService } from './emails.service'

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: EmailsQueue
    })
  ],
  providers: [EmailsService, EmailsProcessor],
  exports: [EmailsService, EmailsProcessor]
})
export class EmailsModule {}
