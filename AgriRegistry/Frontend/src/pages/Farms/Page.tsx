import FarmList from "./components/FarmList";

const Page = () => {
  return (
    <div>
      <h5>My Farms</h5>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <FarmList />
    </div>
  );
};

export default Page;
