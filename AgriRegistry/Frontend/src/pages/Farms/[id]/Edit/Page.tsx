import React from "react";
import { useParams } from "react-router";

const Page = () => {
  const { id } = useParams(); // Access the dynamic :id value
  return <div>{id}</div>;
};

export default Page;
