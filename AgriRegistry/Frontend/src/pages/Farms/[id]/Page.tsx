import { useParams } from "react-router";
import { fetchFarmById } from "../../../api/farmApi";
import { useEffect, useState } from "react";
import { Farm, Report, ReportEntry } from "../../../types/TResponse";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Leaf, PlusIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";

const Page = () => {
  const { id } = useParams(); // Access the dynamic :id value
  const [farm, setFarm] = useState<Farm>();

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const data = await fetchFarmById(Number(id));
      setFarm(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  return (
    <div className="flex flex-col mx-auto min-h-screen w-full max-w-4xl py-14 px-12 gap-6">
      <h6>{farm?.name}</h6>
      <p>{farm?.postalAddress}</p>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>X Reports</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Dialog>
            <DialogTrigger className="w-full py-2 flex gap-2 justify-center shadow rounded-3xl bg-emerald-500 text-white">
              <PlusIcon />
              Add Report
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Placeholder</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          {farm?.reports?.map((report: Report) => (
            <Card key={report.id} className="flex flex-col p-6 gap-4">
              <div className="flex justify-between items-center">
                <CardTitle>
                  <h6 className="font-semibold">
                    {new Date(report.dateSubmitted).toLocaleDateString()}
                  </h6>
                </CardTitle>
                <div className="flex gap-2">
                  <Button type="button" variant={"outline"}>
                    Edit
                  </Button>
                  <Button type="button" variant={"outline"}>
                    Delete
                  </Button>
                </div>
              </div>
              <Separator />
              {report.reportEntries?.map((reportEntry: ReportEntry) => (
                <Card
                  className="flex items-center justify-between"
                  key={reportEntry.id}
                >
                  <CardHeader>
                    <div className="flex gap-4 items-center">
                      <Leaf size={32} />
                      <div>
                        <CardTitle className="pb-1">
                          {reportEntry.produce?.fullName || "N/A"}
                        </CardTitle>
                        <CardDescription>Added by: FarmManager</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{reportEntry.quantity} tonnes</p>
                  </CardContent>
                </Card>
              ))}
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
