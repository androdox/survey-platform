import { Link } from "react-router-dom"

export const Navbar = () => {

  return (

    <nav className="navbar navbar-dark bg-dark px-3">

      <Link
        className="navbar-brand"
        to="/"
      >
        Survey Platform
      </Link>

      <div>

        <Link
          className="btn btn-light me-2"
          to="/"
        >
          Encuestas
        </Link>

        <Link
          className="btn btn-warning"
          to="/admin"
        >
          Admin
        </Link>

      </div>

    </nav>

  )

}