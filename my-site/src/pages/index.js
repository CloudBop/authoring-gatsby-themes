import { Link } from 'gatsby'
import React from 'react'

function Index() {
  return (
    <div>
      <h1>Home</h1>
      <Link to={"/events"}>
        Events
      </Link>
    </div>
  )
}

export default Index
