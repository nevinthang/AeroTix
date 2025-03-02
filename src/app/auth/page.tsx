"use client";
import React, { useState } from 'react';
import Link from "next/link";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { username, password, rememberMe });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md p-8 rounded-3xl bg-blue-600/20 backdrop-blur-sm border border-purple-300/30 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-purple-300/50 transform hover:-translate-y-1">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="rounded-full border-2 border-purple-400 p-4 bg-white/10">
            <img src="/logo1.png" alt="Logo" className="w-16 h-16" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-900">LOGIN</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className="mb-4">
            <div className="flex items-center bg-indigo-900/50 rounded-md overflow-hidden border border-purple-300/20">
              <div className="px-3 py-3">
                <svg className="w-5 h-5 text-blue-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="flex-1 bg-transparent border-none text-white focus:ring-0 outline-none py-3 px-2 placeholder-blue-200/70"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="mb-6">
            <div className="flex items-center bg-indigo-900/50 rounded-md overflow-hidden border border-purple-300/20">
              <div className="px-3 py-3">
                <svg className="w-5 h-5 text-blue-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="flex-1 bg-transparent border-none text-white focus:ring-0 outline-none py-3 px-2 placeholder-blue-200/70"
              />
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex justify-between mb-6 text-sm">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2 h-4 w-4 bg-indigo-900/50 border-purple-300 rounded focus:ring-0"
              />
              <label htmlFor="remember" className="text-indigo-900 cursor-pointer font-medium">Remember me</label>
            </div>
            <a href="#" className="text-indigo-900 hover:text-purple-900 text-right font-medium">Forgot Password?</a>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded transition-colors uppercase text-sm tracking-wider shadow-md"
          >
            LOGIN
          </button>

          {/* New here? Register Here */}
          <div className="mt-6 text-center text-sm">
            <span className="text-indigo-900">New here? </span>
            <Link href="auth/register" className="text-purple-700 hover:text-purple-900 font-semibold transition-colors">
              Register Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;