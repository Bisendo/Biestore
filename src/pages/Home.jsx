import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const Home = () => {
  // State for members data
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalMembers, setTotalMembers] = useState(0);

  // Sorting state
  const [orderBy, setOrderBy] = useState("fullName");
  const [order, setOrder] = useState("asc");

  // Attendance records state
  const [attendances, setAttendances] = useState([]);
  const [showAttendanceTable, setShowAttendanceTable] = useState(false);
  const [attendanceLoading, setAttendanceLoading] = useState(false);

  // Fetch members data
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4001/members");
        let filteredData = response.data;

        if (searchTerm) {
          filteredData = filteredData.filter(
            (member) =>
              member.fullName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              member.phoneNumber.includes(searchTerm)
          );
        }

        const sortedData = [...filteredData].sort((a, b) => {
          if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
          if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
          return 0;
        });

        const paginatedData = sortedData.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        );

        setMembers(paginatedData);
        setTotalMembers(filteredData.length);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [page, rowsPerPage, orderBy, order, searchTerm]);

  // Fetch attendance records
  const fetchAttendances = async () => {
    try {
      setAttendanceLoading(true);
      const response = await axios.get("http://zzzz/attendence");
      setAttendances(response.data);
    } catch (error) {
      console.error("Error fetching attendances:", error);
    } finally {
      setAttendanceLoading(false);
    }
  };

  // Toggle attendance table visibility
  const toggleAttendanceTable = async () => {
    if (!showAttendanceTable && attendances.length === 0) {
      await fetchAttendances();
    }
    setShowAttendanceTable(!showAttendanceTable);
  };

  // Handle sorting
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Format phone number
  const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Calculate attendance rate
  const calculateAttendanceRate = (attendance) => {
    if (members.length === 0) return 0;
    const presentCount = attendance.presentMembers.length;
    return ((presentCount / members.length) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-700">
            Mrimi Family Ukoo
          </div>
          <div className="space-x-6 text-sm text-gray-600 hidden md:flex">
            <a href="/" className="hover:text-blue-600">
              Home
            </a>
            <a href="/login" className="hover:text-red-600">
              Dashboard
            </a>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Member Management
          </h1>
          <div className="flex gap-2">
            <button
              onClick={toggleAttendanceTable}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              {showAttendanceTable ? "Hide" : "Show"} Attendance
            </button>
            <button
              onClick={() => {
                setPage(0);
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
          />
        </div>

        {/* Attendance Table (conditionally rendered) */}
        {showAttendanceTable && (
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Attendance Records
              </h2>
            </div>

            {attendanceLoading ? (
              <div className="p-8 text-center">
                Loading attendance records...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Present Members
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendances.length > 0 ? (
                      attendances.map((attendance) => (
                        <tr key={attendance.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {format(new Date(attendance.date), "MMM dd, yyyy")}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {attendance.presentMembers.length} members
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {attendance.presentMembers.length > 0
                                ? attendance.presentMembers[0]?.fullName +
                                  (attendance.presentMembers.length > 1
                                    ? ` +${
                                        attendance.presentMembers.length - 1
                                      } more`
                                    : "")
                                : "No members"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                calculateAttendanceRate(attendance) > 70
                                  ? "bg-green-100 text-green-800"
                                  : calculateAttendanceRate(attendance) > 50
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {calculateAttendanceRate(attendance)}%
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {attendance.notes || "No notes"}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center px-6 py-4 text-gray-500"
                        >
                          No attendance records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Members Table */}
        <div className="bg-white shadow rounded-lg">
          {loading ? (
            <div className="p-8 text-center">Loading members...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "fullName",
                        "phoneNumber",
                        "amountRemaining",
                        "createdAt",
                      ].map((col) => (
                        <th
                          key={col}
                          onClick={() => handleSort(col)}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            {col === "fullName" && "Full Name"}
                            {col === "phoneNumber" && "Phone Number"}
                            {col === "amountRemaining" && "Amount Due"}
                            {col === "createdAt" && "Created At"}
                            {orderBy === col && (
                              <span className="ml-1">
                                {order === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {members.length > 0 ? (
                      members.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-medium">
                                  {member.fullName.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {member.fullName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {member.username}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {formatPhoneNumber(member.phoneNumber)}
                          </td>
                          <td className="px-6 py-4 text-red-600 font-semibold">
                            {formatCurrency(member.amountRemaining)}
                          </td>
                          <td className="px-6 py-4">
                            {format(new Date(member.createdAt), "MMM dd, yyyy")}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                member.penaltyStatus === "none"
                                  ? "bg-green-100 text-green-800"
                                  : member.penaltyStatus === "warning"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {member.penaltyStatus}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center px-6 py-4 text-gray-500"
                        >
                          No members found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-medium">
                      {page * rowsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min((page + 1) * rowsPerPage, totalMembers)}
                    </span>{" "}
                    of <span className="font-medium">{totalMembers}</span>{" "}
                    members
                  </p>

                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setPage(0);
                    }}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    {[5, 10, 25].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(Math.max(page - 1, 0))}
                    disabled={page === 0}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setPage(
                        Math.min(
                          page + 1,
                          Math.ceil(totalMembers / rowsPerPage) - 1
                        )
                      )
                    }
                    disabled={page >= Math.ceil(totalMembers / rowsPerPage) - 1}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
