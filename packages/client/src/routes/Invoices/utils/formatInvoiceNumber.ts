const formatInvoiceNumber = (invoiceNumber: number) => `INV${invoiceNumber.toString().padStart(6, '0') ?? ''}`

export default formatInvoiceNumber
