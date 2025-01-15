import { useState } from "react";
import PdfButton from "./components/pdfButton";
import { useQuery, useMutation } from "@tanstack/react-query";

const DEPLOYED_URL = "https://applicationbackend.jalikoi.rw/api/v1";
//const LOCAL_URL = "http://localhost:8090/api/v1";
const ITEMS_PER_PAGE = 10;


export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const {
    data,
    isLoading,
    error: isError,
  } = useQuery({
    queryKey: ["applicants", searchQuery, currentPage],
    queryFn: async () => {
      const response = await fetch(
        `${DEPLOYED_URL}/application/search?query=${encodeURIComponent(
          searchQuery
        )}&page=${currentPage}&per_page=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) throw new Error("Failed to fetch applicants");
      return response.json();
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  });

  console.log(data)

  const updateMutation = useMutation({
    mutationFn: async (updatedData: typeof editFormData) => {
      const response = await fetch(
        `${DEPLOYED_URL}/application/applicant/${updatedData.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) throw new Error("Failed to update applicant");
      return response.json();
    },
    onSuccess: () => {
      setIsEditModalOpen(false);
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEditClick = (applicant: typeof editFormData) => {
    setEditFormData(applicant);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    updateMutation.mutate(editFormData);
  };

  const handleInputChange = (name: string, value: string) => {
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalPages = Math.ceil((data?.total || 0) / ITEMS_PER_PAGE);

  if (isError) {
    return <div className="p-4 text-red-600">Error loading applicants: {isError.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
            <input
              type="search"
              placeholder="Search applicants..."
              className="w-64 px-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Product</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">NID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.map((applicant: { id: string; first_name: string; last_name: string; moto_leasing: { id: number, type: string }; nid: string; phone: string; created_at: string; decision?: string }) => (
                    <tr key={applicant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {applicant.first_name} {applicant.last_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {applicant.moto_leasing.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{applicant.nid}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{applicant.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(applicant.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <label htmlFor={`status-${applicant.id}`} className="sr-only">Status</label>
                        <select
                          id={`status-${applicant.id}`}
                          value={applicant.decision || "PENDING"}
                          onChange={(e) =>
                            handleInputChange("status", e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded-md"
                        >
                          <option value="APPROVED">Approved</option>
                          <option value="REJECTED">Rejected</option>
                          <option value="PENDING">Pending</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(applicant)}
                            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                          >
                            Edit
                          </button>
                          <PdfButton applicantId={applicant.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center items-center space-x-2 p-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}

        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="mb-4 text-lg font-medium">Edit Applicant</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    value={editFormData.first_name}
                    onChange={(e) =>
                      handleInputChange("first_name", e.target.value)
                    }
                    className="mt-1 w-full px-3 py-2 border rounded-md"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <input
                    value={editFormData.last_name}
                    onChange={(e) =>
                      handleInputChange("last_name", e.target.value)
                    }
                    className="mt-1 w-full px-3 py-2 border rounded-md"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <input
                    value={editFormData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", e.target.value)
                    }
                    className="mt-1 w-full px-3 py-2 border rounded-md"
                    placeholder="Last Name"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                  {updateMutation.isPending ? 'Editing...' : 'Edit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
