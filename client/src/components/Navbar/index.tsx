'use client'

import React from 'react'
import './index.css'
// import { Button } from '@/shadcn/ui/button'
import { Button } from '@/shadcn/ui/button'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const SERVER_DOMAIN =
    process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000`
  async function handleRegister() {
    router.push('/register')
  }
  return (
    <>
      <div className="navbar-container">
        <div>
          <header>
            <h3>Present</h3>
          </header>
        </div>
        <div>
          <nav>
            <div>
              <ul className="nav-links">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="nav-buttons">
          <Button className="button-style" onClick={handleRegister}>
            Sign Up
          </Button>
          <Button className="button-style">Sign In</Button>
        </div>
      </div>
    </>
  )
}
