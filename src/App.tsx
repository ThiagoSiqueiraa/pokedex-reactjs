import React from "react"
import "./App.css"
import Header from "./components/Header"
import { ListPokemons } from "./components/ListPokemons/ListPokemons"

function App() {
  return (
    <React.Fragment>
      <Header />
      <ListPokemons />
    </React.Fragment>
  )
}

export default App
