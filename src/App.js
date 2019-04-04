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
    setCurrentPage,
    perPages,
    setPerPages,
    totalItems,
    setTotalItems,
  } = usePagination(1, 5, 50)

  const [data, loading, error] = useDataFromApi('photos', {
    _start: (currentPage - 1) * perPages,
    _limit: totalItems,
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

      <Label>PerPages</Label>
      <select onChange={handleOnChangePerPages}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      {' '}
      <Label>totalItems</Label>
      <select onChange={handleOnChangeTotalItems}>
        <option value="50">50</option>
        <option value="150">150</option>
        <option value="300">300</option>
      </select>
      <br />

      <Pagination
        currentPage={currentPage}
        perPages={perPages}
        totalItems={totalItems}
        onPageChange={handleOnPageChange}
      />


      {result}
    </div>
  )

  function handleOnChangePerPages(e) {
    setPerPages(Number(e.target.value))
    setCurrentPage(1)
    pushStatePage(1)
  }

  function handleOnChangeTotalItems(e) {
    setTotalItems(Number(e.target.value))
    setCurrentPage(1)
    pushStatePage(1)
  }

  function handleOnPageChange(page) {
    setCurrentPage(page)
    pushStatePage(page)
  }

  function pushStatePage(page) {
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

const Label = styled.label`
  display: inline-block;
  margin-right: 4px;
  font-weight: bold;
  color: #333;
`
