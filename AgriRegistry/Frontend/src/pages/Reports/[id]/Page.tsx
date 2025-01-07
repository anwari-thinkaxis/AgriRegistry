import { useParams } from "react-router";

const Page = () => {
  const { id } = useParams();
  return <div>Report Id: {id}</div>;
};

export default Page;
