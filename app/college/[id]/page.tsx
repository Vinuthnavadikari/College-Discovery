import { fetchCollegeById } from '@/lib/data';

export default async function CollegeDetails({
  params,
}: {
  params: { id: string };
}) {
  console.log("Fetching college with ID:", params.id);
  const college = await fetchCollegeById(params.id);

  if (!college) {
    return <div>College not found</div>;
  }
  <a
  href="/compare"
  className="bg-blue-600 text-white px-4 py-2 rounded mb-6 inline-block"
>
  Compare Colleges
</a>

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-6">{college.name}</h1>
      <div className="border rounded-lg p-6 shadow">
        <p><b>Location:</b> {college.location}</p>
        <p><b>State:</b> {college.state}</p>
        <p><b>Fees:</b> ₹{college.fees}</p>
        <p><b>Rating:</b> ⭐ {college.rating}</p>
        <p><b>Average Package:</b> ₹{college.avgPackage} LPA</p>
        <p><b>Highest Package:</b> ₹{college.highestPackage} LPA</p>
        <p><b>Placement Rate:</b> {college.placementRate}%</p>

        <div className="mt-4">
          <b>Description:</b>
          <p>{college.description}</p>
        </div>
      </div>
    </main>
  );
}
