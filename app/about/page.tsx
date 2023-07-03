"use client";

import fetcher from "@/libs/fetcher";
import { Store } from "@prisma/client";
import useSWR from "swr";

const About = () => {
  const { data } = useSWR<{
    stores: Store[];
  }>("/api/store?cursor=0&take=2", fetcher);
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page</p>
      {data?.stores &&
        data.stores.map((store) => {
          return (
            <div key={store.id}>
              <h2>{store.name}</h2>
            </div>
          );
        })}
    </div>
  );
};

export default About;
