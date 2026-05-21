const blogs = [
  {
    id: 1,
    title: "next.js utilizes React Server Components",
    author: "Martin",
    url: "martin/url",
    likes: 10
  },
  {
    id: 2,
    title: "next.js is built on top of React",
    author: "Messi",
    url: "messi/url",
    likes: 23
  },
  {
    id: 3,
    author: "Abdullah",
    title: "next.js supports both static and dynamic rendering",
    url: "abdullah/url",
    likes: 10
  },
];

let nextId = 4;

export const getBlogs = () => {
  return blogs;
};
export const getBlogById = (id: number) => {
  return blogs.find(blog => blog.id === id);
};

export const addBlog = (author: string, title: string, likes: number, url: string) => {
  blogs.push({ id: nextId++, author, title, likes, url });
};