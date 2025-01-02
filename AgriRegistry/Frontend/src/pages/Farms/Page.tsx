import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import FarmList from "./components/FarmList";

const Page = () => {
  const navigation = useNavigate();

  return (
    <div className="flex flex-col mx-auto min-h-screen w-full max-w-4xl py-14 px-12 gap-11">
      <div className="flex flex-row justify-between">
        <h5>My Farms</h5>
        <Button
          onClick={() => {
            navigation("/locations/create");
          }}
        >
          Add new location
        </Button>
      </div>
      <Separator />
      <FarmList />
    </div>
  );
};

export default Page;
