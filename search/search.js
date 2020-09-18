import React, { useState } from "react";

const millionObjects = [...]

const MillionObjects = () => {

  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const renderMillionObjects = () => {
    let objectsToRender = millionObjects.filter(object => Object.values(object).includes(searchTerm))
    return objectsToRender.map(object => <Object name={object.name} content={object.content} />)
  }

  return (
    <section>
      <input onChange={() => handleSearch()}></input>
      {renderMillionObjects()}
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
