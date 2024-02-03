import React from 'react'

function SignInPage() {
  return (
    <>
      <h1>Sign In</h1>
      <form>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => localStorage.setItem('name', e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => localStorage.setItem('password', e.target.value)}
        />
        <button>Sign in</button>
      </form>
    </>
  )
}

export default SignInPage
