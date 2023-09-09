'use client'
import { useState, useEffect } from 'react';
import Loading from '../components/Loading'
import CustomModal from '../components/CustomModal'
import Button from '@mui/material/Button';
import Table from '../components/Table'

const ListingsAndReviewsPage = () => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/listings-and-reviews?page=${page}&perPage=${pageSize}`)
      .then((response) => response.json())
      .then((data) => {
        const items = data.data || []
        setItems(items)
        setLoading(false)
        setTotalPages(data.totalPages)
      })
      .catch(err => {
        setLoading(false)
      });
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setLoading(true)
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    console.log(newPageSize)
    setLoading(true)
    setPageSize(newPageSize);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">List and reviews</h1>
        {loading ? (
          <div className="text-center text-gray-600 flex flex-col items-center">
            <Loading></Loading>
          </div>
        ) : (
          <>
            {items.length === 0 ? (
              <div className="text-center text-gray-600">No items found.</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-rausch text-white">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Property Type</th>
                        <th className="px-4 py-2">Minimum Nights</th>
                        <th className="px-4 py-2">Maximum Nights</th>
                        <th className="px-4 py-2">Bedrooms</th>
                        <th className="px-4 py-2">Beds</th>
                        <th className="px-4 py-2">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-100 hover:text-black">
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">{item.property_type}</td>
                          <td className="px-4 py-2">{item.minimum_nights}</td>
                          <td className="px-4 py-2">{item.maximum_nights}</td>
                          <td className="px-4 py-2">{item.bedrooms}</td>
                          <td className="px-4 py-2">{item.beds}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => openModal(item)}
                              className="text-3xl text-babu"
                            >&#9776;</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={page === 1 || loading}
                      className={`bg-babu hover:bg-arches text-white py-2 px-4 rounded-lg ${
                        page === 1 ? 'cursor-not-allowed' : ''
                      }`}
                    >
                      First Page
                    </button>
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1 || loading}
                      className={`bg-babu hover:bg-arches text-white py-2 px-4 rounded-lg ${
                        page === 1 ? 'cursor-not-allowed' : ''
                      }`}
                    >
                      Previous Page
                    </button>
                  </div>
                  <div className="font-medium">
                    Page { page } of { totalPages }
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>Show:</span>
                    <select
                      onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
                      value={pageSize}
                      className="bg-white border rounded-lg p-2"
                      disabled={loading}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      className="bg-babu hover:bg-arches text-white py-2 px-4 rounded-lg"
                      disabled={page === totalPages || loading}
                    >
                      &gt;
                    </button>
                    <Button
                      variant="contained"
                      className="bg-babu hover:bg-arches text-white py-2 px-4 rounded-lg"
                      disabled={page === totalPages || loading}
                    >&gt;</Button>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="bg-babu hover:bg-arches text-white py-2 px-4 rounded-lg"
                      disabled={page === totalPages || loading}
                    >
                      Last Page
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        {selectedItem && (
          <div className="p-4">
          <section className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold">{selectedItem.name}</h2>
            <button
              onClick={closeModal}
              className="text-3xl text-babu hover:text-arches"
            >
              &times;
            </button>
          </section>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-start justify-start">
            <img
              src={selectedItem.images.picture_url}
              alt={selectedItem.name}
              className="w-64 h-64 md:w-96 md:h-96 object-cover"
              loading='lazy'
            />
            <ul className="space-y-2">
              <li>
                <strong>Price:</strong> {selectedItem.price.$numberDecimal}
              </li>
              <li>
                <strong>Property Type:</strong> {selectedItem.property_type}
              </li>
              <li>
                <strong>Minimum Nights:</strong> {selectedItem.minimum_nights}
              </li>
              <li>
                <strong>Bedrooms:</strong> {selectedItem.bedrooms}
              </li>
              <li>
                <strong>Beds:</strong> {selectedItem.beds}
              </li>
              <li>
                <strong>Bathrooms:</strong> {selectedItem.bathrooms.$numberDecimal}
              </li>
              <li>
                <strong>Description:</strong> {selectedItem.description}
              </li>
            </ul>
          </div>
        </div>
        
        )}
      </CustomModal>
      <Table></Table>
    </div>
  );
};

export default ListingsAndReviewsPage