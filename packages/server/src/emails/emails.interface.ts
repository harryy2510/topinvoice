import { MailDataRequired } from '@sendgrid/helpers/classes/mail'

export type SendEmailInput = Omit<MailDataRequired, 'from'>
