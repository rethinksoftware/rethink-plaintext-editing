import React, { useState } from "react";

const millionObjects = [...{}]

const MillionObjects = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const [objects, setObjects] = useState([])

  const handleSubmit = async () => {
    try {
      const response = await fetch(url + "/" + searchTerm)
      const res = await response.json()
      setObjects(res)
    } catch (err) {
      setErr("Error")
    }
  }

  const renderObjects = () => {
    return objects.map(object => <Object name={object.name} content={object.content} />)
  }

  return (
    <section>
      <input onChange={(e) => setSearchTerm(e.target.value)}></input>
      <button onClick={() => handleSubmit()}>Search</button>
      {renderObjects()}
    </section>
  )
}

const Object = ({ name, content }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{content}</p>
    </div>
  )
}

