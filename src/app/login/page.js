'use client'
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to your login API endpoint with the formData
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the token to localStorage
        localStorage.setItem('token', data.token);
        // Redirect to a protected route or display a success message
        // Example: router.push('/dashboard');
      } else {
        const res = await response.json()
        setErrorMessage(res.message)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-4">Login</h1>
        {errorMessage !== null ? (
          <span className="text-red-500 text-sm w-auto">{ errorMessage }</span>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-600 block mb-2">
              Email
            </label>
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
            <label htmlFor="password" className="text-gray-600 block mb-2">
              Password
            </label>
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
          <button
            type="submit"
            className="bg-babu hover:bg-arches text-white py-2 rounded-lg text-center w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
