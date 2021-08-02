import { useState, useEffect } from 'react'
import axios from 'axios'

function useHackerNewsApi(initialUrl, initialData) {
  const [data, setData] = useState(initialData)
  const [url, setUrl] = useState(initialUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      setIsError(false)

      try {
        const result = await axios(url)
        setData(result.data)
        // console.log(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [url])

  return [{ data, isLoading, isError }, setUrl]
}

export default useHackerNewsApi
