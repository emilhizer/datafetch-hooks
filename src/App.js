import { Fragment, useState } from 'react'

import useHackerNewsApi from './Hooks/useHackerNewsApi'

function App() {
  const urlAlgoliaSearchAPI =
    'https://hn.algolia.com/api/v1/search?query='
  const [query, setQuery] = useState('redux')
  const [{ data, isLoading, isError }, doFetch] =
    useHackerNewsApi(urlAlgoliaSearchAPI + 'redux', {
      hits: []
    })

  function formSubmit(event) {
    doFetch(urlAlgoliaSearchAPI + query)
    event.preventDefault()
  }

  return (
    <Fragment>
      <form
        onSubmit={(event) => {
          formSubmit(event)
        }}
      >
        <input
          type='text'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {/* <button
          type='button'
          onClick={() =>
            setUrl(urlAlgoliaSearchAPI + query)
          }
        > */}
        <button type='submit'>Search</button>
      </form>

      {isError && <div>Something went wrong...</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  )
}

export default App
