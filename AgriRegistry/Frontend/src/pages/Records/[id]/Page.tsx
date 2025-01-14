import { useParams } from "react-router";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import { useEffect, useState } from "react";
import { fetchRecordById } from "../../../api/recordApi";
import { Record, RecordEntry } from "../../../types/TResponse";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Leaf } from "lucide-react";
import AddRecordEntryField from "../components/AddRecordEntryField";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const [record, setRecord] = useState<Record | null>(null);

  useEffect(() => {
    loadRecord();
  }, []);

  const loadRecord = async () => {
    try {
      const data = await fetchRecordById(Number(id));
      setRecord(data);
    } catch (error) {
      console.error("Error fetching record:", error);
    }
  };

  return (
    <div className="flex flex-col mx-auto min-h-screen w-full max-w-4xl py-14 px-12 gap-6">
      <CustomBreadcrumb
        items={[
          { name: "My Farms", url: "/farms" },
          { name: record?.farm.name, url: `/farms/${record?.farmId}` },
          { name: `Record #${id}`, url: `/records/${id}` },
        ]}
      />
      <h5 className="font-semibold">
        {record?.dateSubmitted &&
          new Date(record.dateSubmitted).toLocaleDateString()}
      </h5>
      <AddRecordEntryField id={Number(id)} loadRecord={loadRecord} />
      <p>Entries</p>
      <div className="space-y-4">
        {[...(record?.recordEntries || [])]
          .reverse()
          .map((recordEntry: RecordEntry) => (
            <Card
              className="flex items-center justify-between"
              key={recordEntry.id}
            >
              <CardHeader>
                <div className="flex gap-4 items-center">
                  <Leaf size={32} />
                  <div>
                    <CardTitle className="pb-1">
                      {recordEntry.produce?.fullName || "N/A"}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{recordEntry.quantity} tonnes</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Page;
