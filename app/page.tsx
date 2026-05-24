import Head from "next/head";
export const metadata = {
  title: "My page title",
};
const Home = () => {
  return (

    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div
        className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl 
        p-10 text-center"
      >
        
        <div className="space-y-6">


          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Blogs App
          </h1>



          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600 mb-3">
              Explore the source code on GitHub:
            </p>

            <a
              href="https://github.com/AbdullahBoreny/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-900 text-white px-6 py-3 
              rounded-2xl font-medium hover:bg-black transition shadow-md"
            >
              View Source Code
            </a>
          </div>

          <div className="pt-6 text-sm text-gray-400">
            Built with Next.js + Tailwind CSS
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;