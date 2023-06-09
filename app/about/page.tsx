"use client";

import { useEffect, useState } from "react";

const About = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [_posts, setPosts] = useState<any>();
  useEffect(() => {
    const fetchTest = async () => {
      // const res = await fetch("http://localhost:3000/api/post");
      // const data = await res.json();
      const data = [
        {
          id: "1",
          name: "Store name 1",
        },
      ];
      setPosts(data);
    };
    fetchTest();
  }, []);
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page</p>
    </div>
  );
};

export default About;
