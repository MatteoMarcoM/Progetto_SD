import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Aggiunto stato di caricamento

  useEffect(() => {
    const verify = () => {
      const name = localStorage.getItem('name')
      const password = localStorage.getItem('password')

      if (name === 'admin' && password === 'adminadmin') {
        console.log('Admin access granted')
        setIsAdmin(true)
      } else {
        console.log('Admin access denied')
        setIsAdmin(false)
      }

      setIsLoading(false) // Imposta isLoading su false alla fine della verifica
    }

    verify()
  }, [])

  if (isLoading) {
    // Mostra uno stato di caricamento durante la verifica
    return <p>Loading...</p>
  }

  return isAdmin ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoutes
