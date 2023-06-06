"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const About = () => {
  const [posts, setPosts] = useState();
  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch("http://localhost:3000/api/post");
      const data = await res.json();
      console.log(data);
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
