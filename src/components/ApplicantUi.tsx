// import { Select, Spin } from "antd";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faPenToSquare, faDownload } from "@fortawesome/free-solid-svg-icons";

// const { Option } = Select;

// interface Applicant {
//   id: string;
//   first_name: string;
//   last_name: string;
//   moto_leasing: string
//   nid: string;
//   phone: string;
//   created_at: string;
//   decision?: string;
// }

// interface ApplicantsUIProps {
//   isLoading: boolean;
//   data: Applicant[] | null;
//   paginatedData: Applicant[];
//   searchQuery: string;
//   handleSearch: (query: string) => void;
//   handleViewRider: (applicant: Applicant) => void;
//   handleEditRider: (applicant: Applicant) => void;
//   viewRider: (applicant: Applicant) => void;
//   handleDownloadPdf: (id: string) => void;
//   handleDecisionChange: (id: string, value: string) => void;
//   updateDecisionMutation: { isLoading: boolean };
//   statuses: { [key: string]: string };
// }

// function ApplicantsUI({
//   isLoading,
//   data,
//   paginatedData,
//   searchQuery,
//   handleSearch,
//   handleViewRider,
//   handleEditRider,
//   handleDownloadPdf,
//   handleDecisionChange,
//   updateDecisionMutation,
//   statuses,
// }: ApplicantsUIProps) {
//   // Helper function to format dates as YYYY-MM-DD
//   const formatYYYYMMDD = (date: string | Date) => {
//     const d = new Date(date);
//     return d.toISOString().split("T")[0];
//   };

//   if (isLoading) {
//     return <Spin size="large" />;
//   }

//   if (data) {
//     return (
//       <>
//         <div className="mb-4">
//           <input
//             placeholder="Search by First name or Last name"
//             value={searchQuery}
//             onChange={(e) => handleSearch(e.target.value)}
//             className="w-full max-w-md p-2 border rounded"
//           />
//         </div>

//         <table className="w-full text-left text-base text-gray-700 border">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
//             <tr>
//               <th className="p-2">First Name</th>
//               <th className="p-2">Last Name</th>
//               <th className="p-2">Motobike</th>
//               <th className="p-2">NID</th>
//               <th className="p-2">Phone</th>
//               <th className="p-2">Created at (YYYY-MM-DD)</th>
//               <th className="p-2">Actions</th>
//               <th className="p-2">Download</th>
//               <th className="p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((applicant) => {
//               const createdDate = new Date(applicant.created_at);
//               const isNew =
//                 new Date().getTime() - createdDate.getTime() < 24 * 60 * 60 * 1000;
//               const applicantStatus =
//                 statuses[applicant.id] || (isNew ? "New" : "");

//               return (
//                 <tr key={applicant.id} className="bg-white border-b hover:bg-gray-50">
//                   <td className="px-2 py-3">{applicant.first_name}</td>
//                   <td className="px-2 py-3">{applicant.last_name}</td>
//                   <td className="px-2 py-3">
//                     {applicant.moto_leasing}
//                   </td>
//                   <td className="px-2 py-3">{applicant.nid}</td>
//                   <td className="px-2 py-3">{applicant.phone}</td>
//                   <td className="px-2 py-3">{formatYYYYMMDD(applicant.created_at)}</td>
//                   <td className="px-2 py-3 flex space-x-4">
//                     <FontAwesomeIcon
//                       icon={faEye}
//                       size="1x"
//                       className="cursor-pointer text-gray-900"
//                       onClick={() => handleViewRider(applicant)}
//                     />
//                     <FontAwesomeIcon
//                       icon={faPenToSquare}
//                       size="1x"
//                       className="cursor-pointer text-gray-900"
//                       onClick={() => handleEditRider(applicant)}
//                     />
//                   </td>
//                   <td className="px-2 py-3">
//                     <FontAwesomeIcon
//                       icon={faDownload}
//                       size="1x"
//                       className="cursor-pointer text-gray-900"
//                       onClick={() => handleDownloadPdf(applicant.id)}
//                     />
//                   </td>
//                   <td className="px-2 py-3">
//                     <Select
//                       defaultValue={applicant.decision || "Select"}
//                       style={{ width: 120 }}
//                       onChange={(value) => handleDecisionChange(applicant.id, value)}
//                       loading={updateDecisionMutation.isLoading}
//                     >
//                       <Option value="APPROVED">Approved</Option>
//                       <Option value="REJECTED">Rejected</Option>
//                       <Option value="PENDING">Pending</Option>
//                     </Select>
//                     <span
//                       className={`ml-2 px-2 py-1 rounded text-sm font-medium text-white ${applicantStatus === "APPROVED"
//                           ? "bg-green-700"
//                           : applicantStatus === "REJECTED"
//                             ? "bg-red-700"
//                             : applicantStatus === "PENDING"
//                               ? "bg-yellow-700"
//                               : isNew
//                                 ? "bg-blue-700"
//                                 : ""
//                         }`}
//                     >
//                       {applicantStatus}
//                     </span>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </>
//     );
//   }

//   return <div>No data available.</div>;
// }

// export default ApplicantsUI;
