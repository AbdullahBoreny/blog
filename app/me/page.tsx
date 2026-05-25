import Link from "next/link";
import { newToken } from "../actions/users";
import { getReadingList } from "../services/blogs";
import { getCurrentUser } from "../services/users";
import { markAsRead } from "../actions/readingList";

const Me = async () => {
  const user = await getCurrentUser();
  const readingList = await getReadingList(user?.id as number);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-8 space-y-6">

        <h1 className="font-mono text-3xl font-bold">My Profile</h1>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {user?.name}
          </p>

          <p>
            <span className="font-semibold">Username:</span>{" "}
            {user?.userName}
          </p>
        </div>
        <h1 className="font-mono text-3xl font-bold">Reading List {readingList.length}</h1>
        <h1>Unread {readingList.filter(list => !list.isRead).length}</h1>
        {readingList.map(list => (
          !list.isRead && (
            <div
              key={list.id}
              className="bg-amber-100 p-2 rounded-sm mb-1 flex flex-col">
              <div className="rounded-sm mb-1 flex flex-1 ">
                <Link href={`/blogs/${list.blog.id}`} className="flex-2  text-blue-600">{list.blog.title}</Link>
                <form action={markAsRead}>
                  <input id="id" name="id" type="hidden" value={list.id} />
                  <button type="submit" className="flex-1 text-white font-bold bg-green-600 rounded-sm p-1">Mark as read</button>

                </form>                </div>
              <div>Added at: {list.timeAdded.toLocaleDateString()}</div>
            </div>
          )
        ))}
        <div>Read {readingList.filter(list => list.isRead).length}</div>
        {readingList.map(list => (
          list.isRead && (
            <div
              key={list.id}
              className="bg-green-100 p-2 rounded-sm mb-1 flex flex-col">
              <div className="rounded-sm mb-1 flex flex-1 ">
                <Link href={`/blogs/${list.blog.id}`} className="flex-2  text-blue-600">{list.blog.title}</Link>
              </div>
              <div>Added at: {list.timeAdded.toLocaleDateString()}</div>
            </div>
          )
        ))}


        <div className="pt-6 ">
          <h2 className="font-mono text-xl font-semibold mb-3">
            API TOKEN
          </h2>

          <form action={newToken} className="space-y-3">

            <input
              type="hidden"
              name="id"
              value={user?.id}
            />

            <div className="p-3 bg-gray-50 border rounded-xl text-sm text-gray-600">
              {user?.token ? user.token : "No token generated"}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl
              hover:bg-blue-700 transition font-medium"
            >
              Generate New Token
            </button>
          </form>
        </div>

      </div>
    </div >
  );
};

export default Me;