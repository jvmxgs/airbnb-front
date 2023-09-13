'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { requireGuestMiddleware } from '../middlewares/guestMiddleware'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })
  const [errors, setErrors] = useState({})
  const [userRegistered, setUserRegistered] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getErrors = (field) => {
    if (! errors.errors) {
      return []
    }
    return Object.values(errors.errors).filter(error => {
      return error.path === field
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([])

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setUserRegistered(true)
      } else {
        const errors = await response.json()
        setErrors(errors)
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return userRegistered ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white sm:w-6/12 md:w-4/12 w-full p-6 rounded-lg shadow-md">
        <h1>Please click the activation link we sent to your email</h1>
        <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white sm:w-6/12 md:w-4/12 w-full p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-4">Register</h1>
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="text-gray-600 block mb-2">Full Name</label>
            <span className='text-red-500 text-sm'>{ getErrors('fullName')[0]?.msg }</span>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="border rounded-lg p-2 w-full"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="birthDate" className="text-gray-600 block mb-2">Birth Date</label>
            <span className='text-red-500 text-sm'>{ getErrors('birthDate')[0]?.msg }</span>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              className="border rounded-lg p-2 w-full"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-600 block mb-2">Email</label>
            <span className='text-red-500 text-sm'>{ getErrors('email')[0]?.msg }</span>
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded-lg p-2 w-full"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-600 block mb-2">Password</label>
            <span className='text-red-500 text-sm'>{ getErrors('password')[0]?.msg }</span>
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded-lg p-2 w-full"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="passwordConfirm" className="text-gray-600 block mb-2">Repeat password</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="border rounded-lg p-2 w-full"
              placeholder="Enter your password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-babu hover:bg-arches text-white py-2 rounded-lg text-center w-full"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
};

export default requireGuestMiddleware(RegisterPage)