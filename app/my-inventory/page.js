"use client";

import React, { useState, useEffect } from "react";
import LayoutAdmin from "/components/layout/LayoutAdmin";

export default function MyInventory() {
  const [sortBy, setSortBy] = useState("recent");
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Fetch inventory data (placeholder logic)
    setInventory([{
      id: 1,
      brand: "Volvo",
      title: "Chevrolet Suburban 2023",
      location: "Boston, MA, United States",
      price: "$27,000",
      fuelType: "Petrol",
      regYear: "2017",
      mileage: "5000mi",
      transmission: "Manual",
      image: "/assets/images/car-list/list1.jpg"
    }]);
  }, [sortBy]);

  return (
    <LayoutAdmin headerStyle={1} footerStyle={1}>
      <div className="container py-6">
        <div className="row items-center justify-between">
          <div className="col-md-6">
            <h4 className="text-xl font-semibold">My Inventory</h4>
          </div>
          <div className="col-md-6 text-right">
            <select
              className="nice-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Recently Added</option>
              <option value="public">Public</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="show-dashboard mt-4">
          <button className="btn btn-outline">
            <i className="icon-th-list mr-1" /> Show Dashboard
          </button>
        </div>

        <div className="table-listing-inventory mt-6">
          <table className="table w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm">
                <th>Car</th>
                <th>Status</th>
                <th>Fuel</th>
                <th>Year</th>
                <th>Mileage</th>
                <th>Transmission</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="py-4">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <p className="text-sm text-gray-700 font-medium">{item.brand}</p>
                        <h6 className="font-bold text-md">{item.title}</h6>
                        <p className="text-xs text-gray-500">{item.location}</p>
                        <div className="text-green-600 font-semibold">{item.price}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Approved</span>
                  </td>
                  <td>{item.fuelType}</td>
                  <td>{item.regYear}</td>
                  <td>{item.mileage}</td>
                  <td>{item.transmission}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination flex justify-center mt-10">
            <button className="mx-1 px-3 py-1 border rounded">1</button>
            <button className="mx-1 px-3 py-1 border rounded bg-blue-500 text-white">2</button>
            <button className="mx-1 px-3 py-1 border rounded">3</button>
            <span className="mx-1 px-3 py-1">...</span>
            <button className="mx-1 px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
