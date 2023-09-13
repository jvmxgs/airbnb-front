'use client'
import { useState, useEffect } from 'react'
import { requireAuthMiddleware } from '../middlewares/authMiddleware'
import { useAuth } from '../contexts/authContext'
import Loading from '../components/Loading'

const Dashboard = () => {
  const { user, token } = useAuth()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [newAddress, setNewAddress] = useState({
    country: '',
    state: '',
    city: '',
    street: '',
    postalCode: ''
  })

  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}/addresses`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const items = data.data || []
        console.log(items)
        setAddresses(items)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
      })
    }, [user, user._id, token])

  const getErrors = (field) => {
    if (! errors.errors) {
      return []
    }
    return Object.values(errors.errors).filter(error => {
      return error.path === field
    })
  }

  const handleAddAddress = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(newAddress),
      });

      if (response.ok) {
        console.log('Address added successfully')
        // setAddresses([newAddress, ...addresses])
        setNewAddress({
          country: '',
          state: '',
          city: '',
          street: '',
          postalCode: ''
        })
      } else {
        const errors = await response.json()
        setErrors(errors)
        console.error('Failed to add address');
      }
    } catch (error) {
      console.error('An error occurred while adding the address:', error);
    }
  }

  return (
    <div>
      <main className="container mx-auto mt-6">
        <section className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Addresses</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className='text-red-500 text-sm'>{ getErrors('country')[0]?.msg }</span>
                <input
                  type="text"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-babu"
                />
              </div>
              <div>
                <span className='text-red-500 text-sm'>{ getErrors('state')[0]?.msg }</span>
                <input
                  type="text"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-babu"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className='text-red-500 text-sm'>{ getErrors('city')[0]?.msg }</span>
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-babu"
                />
              </div>
              <div>
                <span className='text-red-500 text-sm'>{ getErrors('street')[0]?.msg }</span>
                <input
                  type="text"
                  placeholder="Street"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-babu"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className='text-red-500 text-sm'>{ getErrors('postalCode')[0]?.msg }</span>
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-babu"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleAddAddress}
            className="bg-babu text-white px-4 py-2 rounded-md hover:bg-opacity-80 mt-4"
          >
            Add Address
          </button>
          <ul className="mt-4">
            {loading ? (
              <div className="text-center text-gray-600 flex flex-col items-center">
                <Loading></Loading>
              </div>
            ) : (
              <>
                {addresses.length === 0 ? (
                    <div className="text-center text-gray-600">No items found.</div>
                  ) : (
                    addresses.map((address, index) => (
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
                    )
                ))}
              </>
            )}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default requireAuthMiddleware(Dashboard)
