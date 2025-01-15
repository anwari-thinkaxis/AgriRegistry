import { useNavigate, useParams } from "react-router";
import { fetchFarmById } from "../../../api/farmApi";
import { useEffect, useState } from "react";
import { Farm, Record, RecordEntry } from "../../../types/TResponse";
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
import { FarmDropdown } from "../components/FarmDropdown";

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
          { name: "My Farms", url: "/farms" },
          { name: farm?.name, url: `/farms/${farm?.id}` },
        ]}
      />
      <div>
        <div className="flex items-center justify-between">
          <h6>{farm?.name}</h6>
          <FarmDropdown id={farm?.id} />
        </div>
        <p>{farm?.postalAddress}</p>
      </div>
      <Card className="flex flex-col">
        <CardHeader>
          <Dialog>
            <div className="flex justify-between items-center">
              <CardTitle>{farm?.records?.length} Records</CardTitle>
              <DialogTrigger className="px-4 py-2 flex gap-2 justify-center shadow rounded-3xl bg-emerald-500 text-white">
                <PlusIcon />
                Add Record
              </DialogTrigger>
            </div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Record</DialogTitle>
                <DialogDescription>
                  Once created, you will be redirected to the record details
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
            {farm?.records?.map((record: Record, index: number) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <div className="flex items-center">
                  <div className="flex-1">
                    <AccordionTrigger>
                      <div className="w-full flex justify-between pl-8">
                        <div>
                          <h6 className="text-sm text-muted-foreground">
                            Record #{record.id}
                          </h6>
                          <h6>
                            {new Date(
                              record.dateSubmitted
                            ).toLocaleDateString()}{" "}
                            - {record.recordEntries?.length || 0} Entries
                          </h6>
                        </div>
                      </div>
                    </AccordionTrigger>
                  </div>
                  <div className="flex-none">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(`/records/${record.id}`)}
                    >
                      View Record Details
                    </Button>
                  </div>
                </div>
                <AccordionContent className="flex flex-col gap-4">
                  {record.recordEntries?.map((recordEntry: RecordEntry) => (
                    <Card
                      className="flex items-center justify-between"
                      key={recordEntry.id}
                    >
                      <CardHeader>
                        <div className="flex gap-4 items-center">
                          <Leaf size={32} />
                          <div>
                            <CardTitle className="pb-1">
                              {recordEntry.produce.fullName || "N/A"}
                            </CardTitle>
                            <CardDescription>
                              Added by: {farm.farmManagerId}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{recordEntry.quantity} tonnes</p>
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
