"use client";

import { useEffect, useState } from "react";

export default function ComparePage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [college1, setCollege1] = useState<any>(null);
  const [college2, setCollege2] = useState<any>(null);

  useEffect(() => {
    fetch("/api/colleges")
      .then((res) => res.json())
      .then((data) => setColleges(data));
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Compare Colleges
      </h1>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <select
          className="border p-3 rounded"
          onChange={(e) =>
            setCollege1(
              colleges.find((c) => c.id === e.target.value)
            )
          }
        >
          <option>Select First College</option>

          {colleges.map((college) => (
            <option key={college.id} value={college.id}>
              {college.name}
            </option>
          ))}
        </select>

        <select
          className="border p-3 rounded"
          onChange={(e) =>
            setCollege2(
              colleges.find((c) => c.id === e.target.value)
            )
          }
        >
          <option>Select Second College</option>

          {colleges.map((college) => (
            <option key={college.id} value={college.id}>
              {college.name}
            </option>
          ))}
        </select>
      </div>

      {college1 && college2 && (
        <table className="w-full border">
          <thead>
            <tr className="border">
              <th className="p-3 border">Feature</th>
              <th className="p-3 border">{college1.name}</th>
              <th className="p-3 border">{college2.name}</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border p-3">Fees</td>
              <td className="border p-3">₹{college1.fees}</td>
              <td className="border p-3">₹{college2.fees}</td>
            </tr>

            <tr>
              <td className="border p-3">Rating</td>
              <td className="border p-3">{college1.rating}</td>
              <td className="border p-3">{college2.rating}</td>
            </tr>

            <tr>
              <td className="border p-3">Avg Package</td>
              <td className="border p-3">
                {college1.avgPackage} LPA
              </td>
              <td className="border p-3">
                {college2.avgPackage} LPA
              </td>
            </tr>

            <tr>
              <td className="border p-3">Highest Package</td>
              <td className="border p-3">
                {college1.highestPackage} LPA
              </td>
              <td className="border p-3">
                {college2.highestPackage} LPA
              </td>
            </tr>

            <tr>
              <td className="border p-3">Placement Rate</td>
              <td className="border p-3">
                {college1.placementRate}%
              </td>
              <td className="border p-3">
                {college2.placementRate}%
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </main>
  );
}