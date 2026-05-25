import Link from "next/link";
import { getUsers } from "../services/users";

const Users = async () => {
  const users = await getUsers();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Users
            </h2>

            <p className="text-gray-500 mt-2">
              Browse all registered users
            </p>
          </div>

          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="border border-gray-200 rounded-2xl 
                hover:shadow-md transition overflow-hidden"
              >
                <Link
                  href={`/users/${user.userName}`}
                  className="flex items-center justify-between 
                  px-5 py-4 hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {user.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      @{user.userName}
                    </p>
                  </div>

                  <span
                    className="text-blue-600 font-medium 
                    hover:translate-x-1 transition"
                  >
                    View blogs →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {users.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;