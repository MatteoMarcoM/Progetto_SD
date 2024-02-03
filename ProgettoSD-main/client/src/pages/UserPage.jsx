import React from 'react'
import { EthProvider } from '../contexts/EthContext'
import Intro from '../components/Intro'
//import Setup from '../components/Setup'
import Demo from '../components/Demo'
//import Footer from '../components/Footer'

function UserPage() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Intro />
          <hr />
          <Demo />
        </div>
      </div>
    </EthProvider>
  )
}

export default UserPage
