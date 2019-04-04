import React from 'react'
import { render } from 'react-testing-library'
import Pagination from '../Pagination'
import mockPagination from '../mocks/Pagination.mock'

jest.mock('../Pagination', () => (props) => mockPagination(props))

const defaultProps = {
  offset: 0,
  limit: 5,
  totalItems: 10,
  onPageClick: jest.fn(),
}

const setup = (props) => {
  const mergedProps = { ...defaultProps, ...props }
  const utils = render(<Pagination {...mergedProps} />)
  const { container } = utils

  const prev = utils.getByTestId('pagination-prev')
  const next = utils.getByTestId('pagination-next')

  return {
    container,
    prev,
    next,
    ...utils
  }
}

describe('Pagination - Components', () => {
  test('Should render', () => {
    const { container } = setup()

    expect(container).toBeTruthy()
  })

  test('Should render prev', () => {
    const { prev } = setup()

    expect(prev).toBeTruthy()
  })

  test('Should render next', () => {
    const { next } = setup()

    expect(next).toBeTruthy()
  })
})
