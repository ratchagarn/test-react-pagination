import { useState } from 'react'

function usePagination(initPage = 1, perPages = 10, totalItems = 100) {
  const urlParams = new URLSearchParams(window.location.search)
  const [currentPage, setCurrentPage] = useState(
    Number(urlParams.get('page')) || initPage
  )
  const [_perPages, setPerPages] = useState(perPages)
  const [_totalItems, setTotalItems] = useState(totalItems)

  return {
    currentPage,
    setCurrentPage,
    perPages: _perPages,
    setPerPages,
    totalItems: _totalItems,
    setTotalItems,
  }
}

export default usePagination
