import React, { useState, useEffect } from 'react';

const Fortune = () => {
  const [getFortune, setFortune] = useState(null)
  const [getNewFortune, setNewFortune] = useState('')

  const fetchFortune = () => {
    fetch('/api/fortune')
      .then(response => {
        if(response.ok) {
          return response
        } else {
          throw new Error(`${response.status}: ${response.statusText}`)
        }
      })
      .then(validatedResponse => validatedResponse.json())
      .then(body => setFortune(body.fortune.text))
      .catch(error => {
        console.log(`Error fetching fortune: ${error.message}`)
      })
  }

  useEffect(() => {
    fetchFortune()
  }, [])

  const handleClick = () => {
    fetchFortune()
  }

  const handleChange = (event) => {
    setNewFortune(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let payload = {fortune: getNewFortune}
    fetch('/api/fortune', {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
        if (response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage)
          throw error
        }
      })
      .then(response => response.json())
      .then(body => {
        let newFortune = body.fortune.text
        setFortune(newFortune)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))

  }

  return (
    <div>
      <h1>Your Fortune: {getFortune}</h1>
      <button className="button" onClick={handleClick}> Click for a new Fortune </button>
      <form onSubmit={handleSubmit}>
        <label>New fortune:</label>
        <input
          type="text"
          value={getNewFortune}
          onChange={handleChange}
        />
      <input type="submit" />
      </form>
    </div>
  );
}

export default Fortune;
