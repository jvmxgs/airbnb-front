'use client'
import { useState } from 'react'
import { requireAuthMiddleware } from '../middlewares/authMiddleware'

const Dashboard = () => {

  const [newAddress, setNewAddress] = useState({
    country: '',
    state: '',
    city: '',
    street: '',
    postalCode: '',
    date: '',
  })

  const [addresses, setAddresses] = useState([
    {
      country: 'Mex',
      state: 'DF',
      city: 'Delius',
      street: 'Tmanoux',
      postalCode: '102123',
      date: '2023-08-31T02:50:16.790+00:00',
    },
  ])

  const handleAddAddress = async () => {
    if (isValidAddress(newAddress)) {
      try {
        const response = await fetch(`/api/user/${user.id}/addresses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAddress),
        });
  
        if (response.ok) {
          // Address added successfully, you can handle this case accordingly
          console.log('Address added successfully');
          // You can also update the addresses state if needed
        } else {
          // Handle error response
          console.error('Failed to add address');
        }
      } catch (error) {
        console.error('An error occurred while adding the address:', error);
      }
      setNewAddress({
        country: '',
        state: '',
        city: '',
        street: '',
        postalCode: '',
        date: '',
      });
    }
  }

  const isValidAddress = (address) => {
    return (
      address.country.trim() !== '' &&
      address.state.trim() !== '' &&
      address.city.trim() !== '' &&
      address.street.trim() !== '' &&
      address.postalCode.trim() !== '' &&
      address.date.trim() !== ''
    )
  }

  return (
    <div>
      <main className="container mx-auto mt-6">
        <section className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Addresses</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Country"
                value={newAddress.country}
                onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-babu"
              />
              <input
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-babu"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-babu"
              />
              <input
                type="text"
                placeholder="Street"
                value={newAddress.street}
                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-babu"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Postal Code"
                value={newAddress.postalCode}
                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-babu"
              />
              <input
                type="text"
                placeholder="Date"
                value={newAddress.date}
                onChange={(e) => setNewAddress({ ...newAddress, date: e.target.value })}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-babu"
              />
            </div>
          </div>
          <button
            onClick={handleAddAddress}
            className="bg-babu text-white px-4 py-2 rounded-md hover:bg-opacity-80 mt-4"
          >
            Add Address
          </button>
          <ul className="mt-4">
            {addresses.map((address, index) => (
              <li key={index} className="mb-2">
                <div>
                  <strong>Country:</strong> {address.country}
                </div>
                <div>
                  <strong>State:</strong> {address.state}
                </div>
                <div>
                  <strong>City:</strong> {address.city}
                </div>
                <div>
                  <strong>Street:</strong> {address.street}
                </div>
                <div>
                  <strong>Postal Code:</strong> {address.postalCode}
                </div>
                <div>
                  <strong>Date:</strong> {address.date}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default requireAuthMiddleware(Dashboard)
