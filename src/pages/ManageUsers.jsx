import { FaEdit, FaTrash, FaLock, FaUndo, FaEye } from "react-icons/fa";

const users = [
  {
    name: "User One",
    email: "user1@example.com",
    isSuper: false,
    is2FA: false,
    tenants: ["ALF", "BAE", "FMB", "TEN1", "TEN2", "TEN3", "TEN4", "TEN5", "TEN6", "TEN7"],
    lastLogin: "04-Jun-2025 21:12:42",
    isAdmin: false,
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    isSuper: true,
    is2FA: true,
    tenants: ["ALF", "BAE", "UAT", "TEN1", "TEN2", "TEN3", "TEN4", "TEN5", "TEN6", "TEN7"],
    lastLogin: "03-Jun-2025 10:40:59",
    isAdmin: true,
  },
];

const UserRow = ({ user }) => {
  const visibleTenants = user.tenants.slice(0, 2);
  const hiddenCount = user.tenants.length - visibleTenants.length;

  return (
    <div className="grid grid-cols-7 gap-4 items-center border-b border-gray-700 py-4 px-2 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <div className="font-medium">
            {user.isAdmin ? "**** *****" : user.name}
          </div>
          {user.isAdmin && (
            <span className="bg-gray-700 text-xs px-2 py-0.5 rounded text-white">admin</span>
          )}
        </div>
      </div>
      <div>{user.email}</div>
      <div>{user.isSuper ? "Yes" : "No"}</div>
      <div>{user.is2FA ? "Yes" : "No"}</div>
      <div className="flex flex-wrap gap-1">
        {visibleTenants.map((t, i) => (
          <span key={i} className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">{t}</span>
        ))}
        {hiddenCount > 0 && (
          <span className="bg-blue-700 text-white text-xs px-2 py-0.5 rounded">+{hiddenCount} more</span>
        )}
      </div>
      <div>{user.lastLogin}</div>
      <div className="flex items-center gap-2 text-gray-300">
        <FaEye className="cursor-pointer hover:text-white" title="View" />
        <FaUndo className="cursor-pointer hover:text-white" title="Reset Password" />
        <FaLock className="cursor-pointer hover:text-white" title="Disable" />
        <FaEdit className="cursor-pointer hover:text-white" title="Edit" />
        <FaTrash className="cursor-pointer hover:text-white" title="Delete" />
      </div>
    </div>
  );
};

export default function UserManagement() {
  return (
    <div className="bg-[#2a2c2f] min-h-screen text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Manage Users</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Type to search"
            className="px-3 py-2 rounded bg-[#1f2124] border border-gray-600 text-sm w-64"
          />
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1 rounded">Go</button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded">+ New User</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 px-2 py-2 border-b border-gray-600 text-gray-400 text-sm font-medium">
        <div>User Details</div>
        <div>Email</div>
        <div>Super User</div>
        <div>2FA Enabled</div>
        <div>Tenants</div>
        <div>Last Login</div>
        <div>Actions</div>
      </div>

      {users.map((user, index) => (
        <UserRow key={index} user={user} />
      ))}
    </div>
  );
}
