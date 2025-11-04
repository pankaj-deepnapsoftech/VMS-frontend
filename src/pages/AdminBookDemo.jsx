import { useEffect, useState } from "react";
import { AxiosHandler } from "@/config/AxiosConfig";
import toast from "react-hot-toast";
import { DateModifier } from "@/utils/utils";

const AdminBookDemo = () => {
  const [demos, setDemos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDemoData = async () => {
    try {
      // eslint-disable-next-line no-undef
      const response = await AxiosHandler.get("/book-demo/get-all-book")
      setDemos(response.data.data);
    } catch (error) {
      console.error("Error fetching demo data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log("this is an id",id)
    const confirm = window.confirm("Are you sure you want to delete this record?");
    if (!confirm) return;

    try {
      await AxiosHandler.delete("/book-demo/delete-book/" + id)
      setDemos(demos.filter((demo) => demo.id !== id));
      toast.success("Deleted successfully!");
      fetchDemoData()
    } catch (error) {
      console.error("Error deleting demo:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  useEffect(() => {
    fetchDemoData();
  }, []);

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Booked Demos</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : demos.length === 0 ? (
        <p className="text-center text-gray-400">No demo bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#2e2f31] border border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-[#383b40] text-left text-gray-300">
                <th className="py-3 px-4 border-b border-gray-700">#</th>
                <th className="py-3 px-4 border-b border-gray-700">Name</th>
                <th className="py-3 px-4 border-b border-gray-700">Phone</th>
                <th className="py-3 px-4 border-b border-gray-700">Email</th>
                <th className="py-3 px-4 border-b border-gray-700">Date</th>
                <th className="py-3 px-4 border-b border-gray-700">Message</th>
                <th className="py-3 px-4 border-b border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {demos.map((demo, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-[#3a3d41]">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{demo.name}</td>
                  <td className="py-3 px-4">{demo.phone}</td>
                  <td className="py-3 px-4">{demo.email}</td>
                  <td className="py-3 px-4">{DateModifier(demo.date)}</td>
                  <td className="py-3 px-4">{demo.message}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(demo._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookDemo;
