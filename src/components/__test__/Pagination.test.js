import React from 'react'
import { render } from 'react-testing-library'
import Pagination from '../Pagination'
import mockPagination from '../mocks/Pagination.mock'

jest.mock('../Pagination', () => (props) => mockPagination(props))

const setup = (props) => {
  const utils = render(<Pagination {...props} />)

  return utils
}

describe('Pagination - Components', () => {
  test('Should render', () => {
    const utils = setup({
      offset: 0,
      limit: 5,
      totalItems: 10,
      onPageClick: jest.fn(),
    })

    utils.debug()
  })
})
