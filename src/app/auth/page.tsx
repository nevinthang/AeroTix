"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setIsLoggedIn(true); // Update login status to true
      toast.success("Login successful");
      console.log("Login Response:", data);
      
      // Store the login status in localStorage
      localStorage.setItem("isLoggedIn", "true");
      
      // Trigger an event to notify other components about the login status change
      window.dispatchEvent(new Event("loginStatusChanged"));
      
      // Keep the original routing behavior
      router.push("/book");
    } catch (error: any) {
      setIsLoggedIn(false); // 
      toast.error(error.message || "Login failed");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-white pt-20 pb-20">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-purple-200 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-purple-300/50">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-white p-5 shadow-lg">
            <img src="/logo1.png" alt="Logo" className="w-16 h-16" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome Back</h1>
          <p className="text-gray-500 mt-2">
            {isLoggedIn ? "You are logged in!" : "Please sign in to continue"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full pl-10 pr-3 py-4 bg-gray-50 text-gray-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-4 bg-gray-50 text-gray-800 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-medium shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:-translate-y-1 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-purple-600 font-semibold hover:text-purple-800 hover:underline transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;