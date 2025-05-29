import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

type User = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber:string;
  status: string;
};

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  

  // Fetch users from API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const session = await getSession();
        const accessToken = session?.user?.accessToken;
        console.log(session);
        setLoading(true);
        const response = await axios.get("http://localhost:5000/user/all", {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        });
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error deleting:", err);
        setError("Failed to load users.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handleDelete = async (id: string) => {
        if (!confirm("Bạn có chắc muốn xóa người dùng này không?")) return;

        try {
            const session = await getSession();
            const accessToken = session?.user?.accessToken;
            console.log(id);

            if (!accessToken) {
                alert("Phiên đăng nhập đã hết hạn.");
            return;
            }

            const res = await fetch(`http://localhost:5000/user/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                });

            if (!res.ok) {
                throw new Error("Delete failed");
            }

            window.location.reload();

        } catch (error) {
            console.error("Error deleting law:", error);
            alert("Đã xảy ra lỗi khi xóa người dùng");
        }
    };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-4 py-2">Họ và tên</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Số điện thoại</th>
              <th className="px-4 py-2">Vai trò</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-2 text-center">Đang tải...</td></tr>
            ) : error ? (
              <tr><td colSpan={4} className="px-4 py-2 text-red-600 text-center">{error}</td></tr>
            ) : currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{user.fullName }</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phoneNumber}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.status}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:underline"
                    >
                      <DeleteOutlined />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="px-4 py-2 text-center">Không có người dùng.</td></tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
