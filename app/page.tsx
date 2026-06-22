"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [feesFilter, setFeesFilter] = useState(300000);

  useEffect(() => {
    fetch("/api/colleges")
      .then((res) => res.json())
      .then((data) => setColleges(data));
  }, []);

  const states = [...new Set(colleges.map((c: any) => c.state))];

  const filtered = colleges.filter((college: any) => {
    return (
      college.name.toLowerCase().includes(search.toLowerCase()) &&
      (stateFilter === "" || college.state === stateFilter) &&
      college.rating >= ratingFilter &&
      college.fees <= feesFilter
    );
  });

  return (
    <main className="p-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center">
        College Discovery Platform
      </h1>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <div className="grid md:grid-cols-4 gap-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="border p-3 rounded-lg col-span-4 md:col-span-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-3 rounded-lg bg-white"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">Min Rating: {ratingFilter.toFixed(1)}</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">Max Fees: ₹{feesFilter.toLocaleString()}</label>
            <input
              type="range"
              min="50000"
              max="300000"
              step="10000"
              value={feesFilter}
              onChange={(e) => setFeesFilter(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {filtered.map((college: any) => (
          <Link key={college.id} href={`/college/${college.id}`}>
            <div className="border rounded-lg p-6 shadow-lg hover:shadow-xl cursor-pointer transition-shadow bg-white h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{college.name}</h2>
                <p className="text-gray-600 mb-4">📍 {college.location}, {college.state}</p>
                
                <div className="space-y-2 text-gray-700">
                  <p>⭐ <span className="font-semibold">{college.rating}</span> / 5.0</p>
                  <p>💰 <span className="font-semibold">₹{college.fees.toLocaleString()}</span> / year</p>
                  <p>📈 <span className="font-semibold">₹{college.avgPackage.toLocaleString()} LPA</span> (Avg Package)</p>
                </div>
              </div>
              <div className="text-right mt-4 text-blue-600 font-semibold hover:underline">
                View Details &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
