import { createNote } from "@/app/actions/blogs";

const NewBlog = () => {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={createNote}>
        <div>
          <label>
            Author: 
            <input type="text" name="author" required />
          </label>
        </div>
        <div>
          <label>
                Title: 
            <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
                Likes: 
            <input type="text" name="likes" />
          </label>
        </div>
        <div>
          <label>
                URL: 
            <input type="text" name="url" />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlog;