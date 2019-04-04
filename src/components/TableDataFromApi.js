import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function TableDataFromApi({ data }) {
  const rows = data.map(item => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.title}</td>
    </tr>
  ))

  return (
    <TableDataFromApi.Container>
      <tbody>
        {rows}
      </tbody>
    </TableDataFromApi.Container>
  )
}

TableDataFromApi.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ).isRequired,
}

export default TableDataFromApi

TableDataFromApi.Container = styled.table`
  margin: 20px 0;
  border-collapse: collapse;

  td {
    padding: 4px;
    border: 1px solid #ccc;
    font-size: 12px;
  }
`
