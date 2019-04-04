import { useState, useEffect } from 'react'
import axios from 'axios'

const baseApiEndpoint = 'https://jsonplaceholder.typicode.com'

function useDataFromApi(path, params) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    const request = async () => {
      setLoading(true)

      try {
        const resp = await axios.get(`${baseApiEndpoint}/${path}`, {
          params,
        })

        setData(resp.data)
      }
      catch (err) {
        setError(err)
      }

      setLoading(false)
    }

    request()
  }, [params._start, params._limit])


  return [
    data,
    loading,
    error,
  ]
}

export default useDataFromApi
