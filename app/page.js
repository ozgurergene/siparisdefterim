"use client"

import React, { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)

  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data?.session?.user || null)
      setLoading(false)
    }
    checkUser()
  }, [supabase])

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
      }
      setEmail("")
      setPassword("")
    } catch (error) {
      alert("Hata: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Yükleniyor...</div>
  }

  if (!user) {
    return (
      <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h1>SiparişDefterim</h1>
        <p>Instagram siparişlerini yönet</p>

        <form onSubmit={handleAuth}>
          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px" }}>
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{ width: "100%", padding: "10px", marginTop: "10px", background: "transparent", border: "1px solid #ccc" }}
        >
          {isLogin ? "Kayıt Ol" : "Giriş Yap"}
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>SiparişDefterim</h1>
      <p>Hoş geldin {user.email}</p>
      <button onClick={handleLogout}>Çıkış Yap</button>
    </div>
  )
}
