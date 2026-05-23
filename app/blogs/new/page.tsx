"use client";

import { createBlog } from "@/app/actions/blogs";
import { useActionState } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: { author: "", title: "", url: "" },
    values: { author: "", title: "", url: "" },
  });
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Author:
            <input
              type="text"
              name="author"
              defaultValue={state.values?.author}
              minLength={3} />
          </label>
        </div>
        <div>
          <label>
            Title:
            <input
              defaultValue={state.values?.title}

              type="text" name="title" minLength={3} />
          </label>
        </div>
        <div>
          <label>
            Likes:
            <input type="number" name="likes" />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              defaultValue={state.values?.url}

              type="text" name="url" minLength={5} />
          </label>
        </div>
        <button type="submit">Create</button>
        {state.errors.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
        {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
        {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}

      </form>
    </div>
  );
};

export default NewBlog;