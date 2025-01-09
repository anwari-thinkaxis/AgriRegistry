import { useNavigate, useParams } from "react-router";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Leaf, PlusIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DatePickerForm } from "../components/DatePickerForm";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";

const Page = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Access the dynamic :id value
  const [farm, setFarm] = useState<Farm>();

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      const data = await fetchFarmById(Number(id));
      setFarm(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  return (
    <div className="flex flex-col mx-auto min-h-screen w-full max-w-4xl py-14 px-12 gap-6">
      <CustomBreadcrumb
        items={[
          { name: "Farms", url: "/farms" },
          { name: "Stardew Valley", url: "/farms/1" },
        ]}
      />
      <h6>{farm?.name}</h6>
      <Card className="flex flex-col">
        <CardHeader>
          <Dialog>
            <div className="flex justify-between items-center">
              <CardTitle>{farm?.reports?.length} Reports</CardTitle>
              <DialogTrigger className="px-4 py-2 flex gap-2 justify-center shadow rounded-3xl bg-emerald-500 text-white">
                <PlusIcon />
                Add Report
              </DialogTrigger>
            </div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Report</DialogTitle>
                <DialogDescription>
                  Once created, you will be redirected to the report details
                  page.
                </DialogDescription>
              </DialogHeader>
              <div className="flex pt-4">
                <DatePickerForm farmId={Number(id)} />
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {farm?.reports?.map((report: Report, index: number) => (
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger>
                  <div className="w-full flex justify-between pl-8">
                    <div>
                      <h6 className="text-sm text-muted-foreground">
                        Report #{report.id}
                      </h6>
                      <h6>
                        {new Date(report.dateSubmitted).toLocaleDateString()} -{" "}
                        {report.reportEntries?.length || 0} Entries
                      </h6>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(`/reports/${report.id}`)}
                      >
                        View Report
                      </Button>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
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
                              {reportEntry.produce.fullName || "N/A"}
                            </CardTitle>
                            <CardDescription>
                              Added by: {farm.farmManagerId}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{reportEntry.quantity} tonnes</p>
                      </CardContent>
                    </Card>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
