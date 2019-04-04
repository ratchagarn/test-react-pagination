import React from 'react'
import styled from 'styled-components'
import './App.css'

import Pagination from './components/Pagination'
import TableDataFromApi from './components/TableDataFromApi'
import useDataFromApi from './hooks/useDataFromApi'
import usePagination from './hooks/usePagination'

function App() {
  const {
    currentPage,
    perPages,
    totalPages,
    setCurrentPage,
  } = usePagination(1, 5, 50)

  const [data, loading, error] = useDataFromApi('photos', {
    albumId: 1,
    _start: (currentPage - 1) * perPages,
    _limit: totalPages,
  })

  let result

  if (error) {
    result = <Error>{error.toString()}</Error>
  }
  else if (loading) {
    result = <Loading>Loading...</Loading>
  }
  else if (!loading && data) {
    result = <TableDataFromApi data={data} perPages={perPages} />
  }

  return (
    <div className="container">
      <h1>Simple Pagination</h1>
      <hr />

      {result}

      <Pagination
        currentPage={currentPage}
        perPages={perPages}
        totalPages={totalPages}
        onPageChange={handleOnPageChange}
      />
    </div>
  )

  function handleOnPageChange(page) {
    setCurrentPage(page)
    window.history.pushState(null, null, `?page=${page}`)
  }
}

export default App

const Loading = styled.p`
  margin: 0;
  color: blue;
  font-weight: bold;
`

const Error = styled.p`
  margin: 0;
  color: red;
  font-weight: bold;
`
