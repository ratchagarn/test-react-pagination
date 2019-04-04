import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function Pagination({ currentPage, perPage, totalPages, onPageChange }) {
  const pages = []
  const probablePage = Math.ceil(totalPages / perPage)

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
      {pages}
    </Pagination.Container>
  )

  function onPageClick(page) {
    return () => {
      onPageChange(page)
    }
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
}

export default Pagination

Pagination.Container = styled.div`
  margin: 20px 0;
`

Pagination.Page = styled.div`
  display: inline-block;
  min-width: 20px;
  margin: 0 4px;
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
