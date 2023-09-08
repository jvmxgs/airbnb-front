import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-hof">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-rausch mb-4">Welcome to My App</h1>
      <p className="text-foggy text-center mb-6">Please register or log in to get started.</p>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/register" className="bg-babu hover:bg-arches text-white py-2 rounded-lg text-center">
          Register
        </Link>
        <Link href="/login" className="bg-babu hover:bg-arches text-white py-2 rounded-lg text-center">
          Login
        </Link>
      </div>
    </div>
  </div>
  );
};

export default HomePage;