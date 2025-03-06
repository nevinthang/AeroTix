"use client";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
    passport: "",
    passport_exp: "",
    birthdate: "",
    phoneNumber: "",
    title: "MR",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }

    if (!agreeTerms) {
      setMessage("You must agree to the Terms of Service");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registration successful!");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to register");
      }
    } catch (error) {
      setMessage("An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      <div className="w-full max-w-md p-8 rounded-3xl bg-blue-600/20 backdrop-blur-sm border border-purple-300/30 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-900">CREATE ACCOUNT</h2>
        </div>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            key !== "confirmPassword" && (
              <div className="mb-4" key={key}>
                <input
                  type={key === "password" ? "password" : key.includes("date") ? "date" : "text"}
                  name={key}
                  value={(formData as any)[key]}
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="w-full p-3 bg-indigo-900/50 text-white rounded-md border border-purple-300/20"
                  required
                />
              </div>
            )
          ))}

          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 bg-indigo-900/50 text-white rounded-md border border-purple-300/20"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              required
            />
            <label className="ml-2 text-indigo-900 text-sm">I agree to the Terms of Service</label>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded uppercase">
            Register
          </button>

          <div className="text-center mt-4">
            <Link href="/auth" className="text-purple-700 hover:text-purple-900 font-semibold">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
