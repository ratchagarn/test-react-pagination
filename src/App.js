import React from 'react'
import styled from 'styled-components'
import './App.css'

import Pagination from './components/Pagination'
import TableDataFromApi from './components/TableDataFromApi'
import useDataFromApi from './hooks/useDataFromApi'
import usePagination from './hooks/usePagination'

function App() {
  const urlParams = new URLSearchParams(window.location.search)
  const page = Number(urlParams.get('page')) || 1
  const initLimit = 100
  const initOffset = (page - 1) * initLimit

  const {
    offset,
    setOffset,
    limit,
    setlimit,
  } = usePagination(initOffset, initLimit)

  const [data, loading, error] = useDataFromApi('photos', {
    _start: offset,
    _limit: limit,
  })

  let result

  if (error) {
    result = <Error>{error.toString()}</Error>
  }
  else if (loading) {
    result = <Loading>Loading...</Loading>
  }
  else if (!loading && data) {
    result = <TableDataFromApi data={data} offset={offset} />
  }

  return (
    <div className="container">
      <h1>Simple Pagination</h1>
      <hr />

      <Label>Limit</Label>
      <select onChange={handleOnChangeLimit}>
        <option value="100">100</option>
        <option value="150">150</option>
        <option value="300">300</option>
        <option value="500">500</option>
      </select>
      <br />

      <Pagination
        offset={offset}
        limit={limit}
        totalItems={5000}
        onPageChange={handleOnPageChange}
      />


      {result}
    </div>
  )

  function handleOnChangeLimit(e) {
    setlimit(Number(e.target.value))
    setOffset(0)
    pushStatePage(1)
  }

  function handleOnPageChange(page, offset) {
    setOffset(offset)
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
