import { useState } from 'react'

function usePagination(initPage = 1, perPages = 10, totalPages = 100) {
  const urlParams = new URLSearchParams(window.location.search)
  const [currentPage, setCurrentPage] = useState(
    Number(urlParams.get('page')) || initPage
  )
  const [_perPages, setPerPages] = useState(perPages)
  const [_totalPages, setTotalPages] = useState(totalPages)

  return {
    currentPage,
    setCurrentPage,
    perPages: _perPages,
    setPerPages,
    totalPages: _totalPages,
    setTotalPages,
  }
}

export default usePagination
