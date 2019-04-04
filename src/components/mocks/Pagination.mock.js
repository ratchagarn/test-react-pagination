import React from 'react'

export default function mockPagination(props) {
  const { offset, limit, totalItems, onPageClick } = props

  const pages = []
  const totalPages = Math.ceil(totalItems / limit)

  for (let page = 1; page <= totalPages; page++) {
    pages.push(
      <div key={page} data-testid="pagination-page">
        isActive={(page - 1) * limit === offset}
        onClick={onPageClick(page)}
      >
        {page}
      </div>
    )
  }

  return (
    <div data-testid="pagination" props={JSON.stringify(props)}>
      <div data-testid="pagination-prev">prev</div>
      <div data-testid="pagination-pages">
        {pages}
      </div>
      <div data-testid="pagination-next">next</div>
    </div>
  )
}
