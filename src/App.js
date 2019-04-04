import React, { useState } from 'react'
import styled from 'styled-components'
import './App.css'

import Pagination from './components/Pagination/Pagination'
import useDataFromApi from './components/Pagination/useDataFromApi'

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 5
  const totalPages = 50

  const [data, loading, error] = useDataFromApi('photos', {
    albumId: 1,
    _start: (currentPage - 1) * perPage,
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
    const rows = data.slice(0, perPage).map(item => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.title}</td>
      </tr>
    ))

    result = (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  return (
    <div className="container">
      <h1>Simple Pagination</h1>
      <hr />
      <br />

      {result}

      <br />

      <Pagination
        currentPage={currentPage}
        perPage={perPage}
        totalPages={totalPages}
        onPageChange={handleOnPageChange}
      />
    </div>
  )

  function handleOnPageChange(page) {
    setCurrentPage(page)
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
