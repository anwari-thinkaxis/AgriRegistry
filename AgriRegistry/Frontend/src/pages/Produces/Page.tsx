import { ChevronRight, Tractor, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Produce } from "../../types/TResponse";
import { deleteProduce, fetchProduces } from "../../api/produceApi";
import AddProduceDialog from "./components/AddProduceDialog";

const Page = () => {
  const navigate = useNavigate();
  const [produces, setProduces] = useState<Produce[]>([]);

  useEffect(() => {
    loadProduces();
  }, []);

  const loadProduces = async () => {
    try {
      const data = await fetchProduces();
      setProduces(data);
    } catch (error) {
      console.error("Error fetching produces:", error);
    }
  };

  const handleDeleteProduce = async (id: number) => {
    try {
      await deleteProduce(id);
      loadProduces();
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <div className="flex flex-col mx-auto min-h-screen w-full max-w-4xl py-14 px-12 gap-6">
      <h6>My Produces</h6>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>X Produce</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <AddProduceDialog loadProduces={loadProduces} />
          <div className="flex flex-col gap-3">
            {produces?.map((produce) => (
              <Card
                key={produce.id}
                className="flex justify-between items-center px-6"
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8">
                    <Tractor className="w-full h-full" />
                  </div>
                  <CardHeader>
                    <CardTitle>{produce.fullName}</CardTitle>
                    <CardDescription>
                      {produce.produceType.name}
                    </CardDescription>
                  </CardHeader>
                </div>
                <div>
                  <Button
                    type="button"
                    onClick={() => navigate(`/produce/${produce.id}`)}
                    className="flex items-center justify-center w-10 h-10 rounded-full p-0"
                  >
                    <ChevronRight size={5} />
                  </Button>

                  <Button
                    type="button"
                    onClick={() => handleDeleteProduce(produce.id)}
                    className="flex items-center justify-center w-10 h-10 rounded-full p-0"
                  >
                    <Trash size={5} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
