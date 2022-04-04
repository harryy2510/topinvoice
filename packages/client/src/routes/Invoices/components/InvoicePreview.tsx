import { FileDownloadOutlined } from '@mui/icons-material'
import { Button, DialogProps } from '@mui/material'
import html2canvas from 'html2canvas'
import JsPdf from 'jspdf'
import { FC, useMemo, useRef } from 'react'
import Moment from 'react-moment'
import { InvoiceDetailsQuery, ViewerQuery } from '../../../graphql/generated'
import withDialog from '../../../hoc/withDialog'
import useCountryState from '../../../hooks/useCountryState'
import { formatCurrency, formatNumber } from '../../../utils/formatters'
import renderCompanyDetails from '../../../utils/renderCompanyDetails'
import { DEFAULT_DATE_FORMAT } from '../utils/dateFormats'
import formatInvoiceNumber from '../utils/formatInvoiceNumber'
import './InvoicePreview.css'

export type InvoicePreviewProps = DialogProps & {
  invoice: InvoiceDetailsQuery['invoice']
  viewer: ViewerQuery['viewer']
}

const downloadPDF = (element: HTMLElement, invoiceNumber: string) => {
  const HTML_Width = element.clientWidth
  const HTML_Height = element.clientHeight
  const top_left_margin = 50
  const PDF_Width = HTML_Width + top_left_margin * 2
  const PDF_Height = PDF_Width * 1.41
  const canvas_image_width = HTML_Width
  const canvas_image_height = HTML_Height
  const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1
  html2canvas(element, { allowTaint: true }).then((canvas) => {
    canvas.getContext('2d')
    const imgData = canvas.toDataURL('image/jpeg', 1.0)
    const pdf = new JsPdf('p', 'pt', [PDF_Width, PDF_Height])
    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height)
    for (let i = 1; i <= totalPDFPages; i++) {
      pdf.addPage()
      pdf.addImage(
        imgData,
        'JPG',
        top_left_margin,
        -(PDF_Height * i) + top_left_margin * 4,
        canvas_image_width,
        canvas_image_height
      )
    }
    pdf.save(`${invoiceNumber}.pdf`)
  })
}

const InvoicePreview: FC<InvoicePreviewProps> = ({ viewer, invoice, onClose }) => {
  const downloadSectionRef = useRef<HTMLDivElement>(null)
  const { renderCountry, renderState, getCountry } = useCountryState()
  const country = useMemo(() => getCountry(viewer?.company?.country), [getCountry, viewer?.company?.country])

  if (!invoice || !viewer) return null

  const subtotal =
    invoice.items?.reduce((subtotal, curr) => subtotal + (curr.price || 0) * (curr.quantity || 1), 0) ?? 0
  const discount = invoice.items?.reduce((discount, curr) => discount + (curr.discount || 0), 0) ?? 0
  const tax = ((subtotal - discount) * (viewer?.company?.taxRate ?? 0)) / 100
  const total = subtotal - discount + tax

  return (
    <>
      <Button
        sx={{ position: 'absolute', zIndex: 1, right: 56, top: 14 }}
        onClick={() => downloadPDF(downloadSectionRef.current!, formatInvoiceNumber(invoice.invoiceNumber))}
        size="small"
        startIcon={<FileDownloadOutlined />}
      >
        Download
      </Button>
      <div className="top-container">
        <div className="top-invoice top-style1">
          <div className="top-invoice_in" ref={downloadSectionRef}>
            <div className="top-invoice_head top-type1 top-mb25">
              <div className="top-invoice_left">
                <p className="top-invoice_number top-primary_color top-mb5 top-f16">
                  <b className="top-primary_color">Invoice#</b> {formatInvoiceNumber(invoice.invoiceNumber)}
                </p>
                <p className="top-invoice_date top-primary_color top-m0 top-f16">
                  <b className="top-primary_color">Date: </b>
                  <Moment format={DEFAULT_DATE_FORMAT}>{invoice.invoiceDate}</Moment>
                </p>
              </div>
            </div>
            <div className="top-invoice_head top-mb25">
              <div className="top-invoice_left">
                <b className="top-primary_color">Invoice To:</b>
                {renderCompanyDetails(invoice.company)}
              </div>
              <div className="top-invoice_right top-text_right">
                <b className="top-primary_color">Pay To:</b>
                {renderCompanyDetails(viewer.company)}
              </div>
            </div>
            <div className="top-table top-style1">
              <div className="top-round_border">
                <div className="top-table_responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="top-width_3 top-semi_bold top-primary_color top-focus_bg">Item</th>
                        <th className="top-width_4 top-semi_bold top-primary_color top-focus_bg">Description</th>
                        <th className="top-width_2 top-semi_bold top-primary_color top-focus_bg">Qty</th>
                        <th className="top-width_1 top-semi_bold top-primary_color top-focus_bg">Price</th>
                        <th className="top-width_1 top-semi_bold top-primary_color top-focus_bg">Discount</th>
                        <th className="top-width_2 top-semi_bold top-primary_color top-focus_bg top-text_right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items?.map((item) => (
                        <tr key={item.id}>
                          <td className="top-width_3">{item.name}</td>
                          <td className="top-width_4">{item.description}</td>
                          <td className="top-width_2">
                            {formatNumber(item.quantity)} {item.unit}
                          </td>
                          <td className="top-width_1">{formatCurrency(item.price, country?.currency)}</td>
                          <td className="top-width_1">-{formatCurrency(item.discount, country?.currency)}</td>
                          <td className="top-width_2 top-text_right">
                            {formatCurrency(
                              item.price * (item.quantity || 1) - (item.discount || 0),
                              country?.currency
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="top-invoice_footer top-border_top">
                  <div className="top-left_footer top-mobile_hide" />
                  <div className="top-right_footer">
                    <table>
                      <tbody>
                        <tr className="top-border_left">
                          <td className="top-width_3 top-semi_bold top-primary_color top-focus_bg">Subtotal</td>
                          <td className="top-width_3 top-semi_bold top-focus_bg top-primary_color top-text_right">
                            {formatCurrency(subtotal, country?.currency)}
                          </td>
                        </tr>
                        <tr className="top-border_left">
                          <td className="top-width_3 top-semi_bold top-primary_color top-focus_bg">Discount</td>
                          <td className="top-width_3 top-semi_bold top-focus_bg top-primary_color top-text_right">
                            -{formatCurrency(discount, country?.currency)}
                          </td>
                        </tr>
                        {Boolean(viewer.company?.taxRate) && (
                          <tr className="top-border_left">
                            <td className="top-width_3 top-semi_bold top-primary_color top-focus_bg">
                              {viewer.company?.taxName || 'VAT'} - {viewer.company?.taxRate}%
                            </td>
                            <td className="top-width_3 top-semi_bold top-focus_bg top-primary_color top-text_right">
                              {formatCurrency(tax, country?.currency)}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="top-invoice_footer">
                <div className="top-left_footer top-mobile_hide" />
                <div className="top-right_footer">
                  <table>
                    <tbody>
                      <tr className="top-border_none">
                        <td className="top-width_3 top-border_top_0 top-bold top-f16 top-primary_color">
                          Total Amount
                        </td>
                        <td className="top-width_3 top-border_top_0 top-bold top-f16 top-primary_color top-text_right">
                          {formatCurrency(total, country?.currency)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withDialog(undefined, { maxWidth: false, fullWidth: false, scroll: 'body' })(InvoicePreview)
