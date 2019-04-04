import { useState } from 'react'

function usePagination(initOffset = 0, initLimit = 10) {
  const [offset, setOffset] = useState(initOffset)
  const [limit, setlimit] = useState(initLimit)

  return {
    offset,
    setOffset,
    limit,
    setlimit,
  }
}

export default usePagination
