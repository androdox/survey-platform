import { BrowserRouter } from "react-router-dom"
import { Router } from "./app/router"
import { Navbar } from "./components/layout/Navbar"

export default function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <div className="container d-flex justify-content-center">

        <div className="col-8">

          <Router />

        </div>

      </div>

    </BrowserRouter>

  )

}