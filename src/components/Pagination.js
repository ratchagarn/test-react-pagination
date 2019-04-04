import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function Pagination({ currentPage, perPages, totalPages, onPageChange }) {
  const pages = []
  const probablePage = Math.ceil(totalPages / perPages)

  for (let page = 1; page <= probablePage; page++) {
    pages.push(
      <Pagination.Page
        key={`page-${page}`}
        isActive={page === currentPage}
        onClick={onPageClick(page)}
      >
        {page}
      </Pagination.Page>
    )
  }

  return (
    <Pagination.Container>
      <Pagination.Nav
        onClick={onPrevClick}
        isDisabled={currentPage === 1}
      >
        « Prev
      </Pagination.Nav>
      {pages}
      <Pagination.Nav
        onClick={onNextClick}
        isDisabled={currentPage === probablePage}
      >
        Next »
      </Pagination.Nav>
    </Pagination.Container>
  )

  function onPrevClick() {
    if (currentPage === 1) { return }

    const page = currentPage - 1 < 1 ? 1 : currentPage - 1
    onPageChange(page)
  }

  function onNextClick() {
    if (currentPage === probablePage) { return }

    const page = currentPage + 1 > probablePage ? probablePage : currentPage + 1
    onPageChange(page)
  }

  function onPageClick(page) {
    return () => {
      onPageChange(page)
    }
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPages: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
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
