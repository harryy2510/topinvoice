import faker from '@faker-js/faker'

const invoiceInput = {
  'item-name-0': faker.commerce.productName(),
  'item-quantity-0': '1',
  'item-price-0': '100',
  'item-discount-0': '10',
  'item-description-0': faker.commerce.productDescription(),
  'item-unit-0': 'hrs'
}

export default invoiceInput
