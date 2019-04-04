import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function Pagination({
  offset,
  limit,
  totalItems,
  onPageChange,
}) {
  const pages = []
  const totalPages = Math.ceil(totalItems / limit)

  for (let page = 1; page <= totalPages; page++) {
    pages.push(
      <Pagination.Page
        key={`page-${page}`}
        isActive={(page - 1) * limit === offset}
        onClick={onPageClick(page)}
      >
        {page}
      </Pagination.Page>
    )
  }

  return (
    <Pagination.Container>
      {<Pagination.Nav
        onClick={onPrevClick}
        isDisabled={offset < limit}
      >
        « Prev
      </Pagination.Nav>}
      {pages}
      <Pagination.Nav
        onClick={onNextClick}
        isDisabled={offset + limit >= totalItems}
      >
        Next »
      </Pagination.Nav>
    </Pagination.Container>
  )

  function onPrevClick() {
    const newOffset = offset - limit
    if (newOffset < 0) { return }

    const newPage = getPageFromOffset(newOffset)
    onPageChange(newPage, newOffset)
  }

  function onNextClick() {
    const newOffset = offset + limit
    if (newOffset >= totalItems) { return }

    const newPage = getPageFromOffset(newOffset)
    onPageChange(newPage, newOffset)
  }

  function onPageClick(page) {
    return () => {
      onPageChange(page, getOffsetFromPage(page))
    }
  }

  function getOffsetFromPage(page) {
    return (page - 1) * limit
  }

  function getPageFromOffset(newOffset) {
    return (newOffset / limit) + 1
  }
}

Pagination.propTypes = {
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
}

export default Pagination

Pagination.Container = styled.div`
  margin: 20px 0;
  user-select: none;
`

Pagination.Nav = styled.div`
  display: inline-block;
  margin: 4px;
  padding: 5px;
  color: #333;
  font-weight: bold;
  ${props => props.isDisabled && 'opacity: .2'};
  cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
`

Pagination.Page = styled.div`
  display: inline-block;
  min-width: 20px;
  margin: 4px;
  padding: 5px;
  background-color: ${props => props.isActive ? 'red' : 'lightgrey'};
  color: ${props => props.isActive ? 'white' : 'black'};
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: blue;
    color: white;
  }
`
