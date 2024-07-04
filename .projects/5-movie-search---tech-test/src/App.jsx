import './App.css'

function App () {
  return (
    <>
      <div>
        <header>
          <h1>Movie Search</h1>
          <form action='' className='form'>
            <fieldset role='group'>
              <input
                type='search'
                placeholder='Star Wars, Blade Runner, The Matrix...'
              />
              <button type='submit'>Search</button>
            </fieldset>
          </form>
        </header>

        <main>Here de results...</main>
      </div>
    </>
  )
}

export default App
