import React from 'react'
import { EthProvider } from '../contexts/EthContext'
import DemoAdmin from '../components/Demo/DemoAdmin'
import IntroAdmin from '../components/Intro/IntroAdmin'

function AdminPage() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <IntroAdmin />
          <DemoAdmin />
          <hr />
        </div>
      </div>
    </EthProvider>
  )
}

export default AdminPage
