"use client";

import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
};

const About = () => {
  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch("http://localhost:3000/api/posts");
      const data = await res.json();

      setPosts(data.posts);
    };
    fetchTest();
  }, []);
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page</p>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
            </div>
          );
        })}
    </div>
  );
};

export default About;
