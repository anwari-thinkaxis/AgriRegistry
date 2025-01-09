import { useParams } from "react-router";
import CustomBreadcrumb from "../../components/CustomBreadcrumb";
import { useEffect, useState } from "react";
import { fetchReportById } from "../../../api/reportApi";
import { Report, ReportEntry } from "../../../types/TResponse";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Leaf } from "lucide-react";
import AddReportEntryField from "../components/AddReportEntryField";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    if (id) loadReport();
  }, [id]);

  const loadReport = async () => {
    try {
      const data = await fetchReportById(Number(id));
      console.log(data);
      setReport(data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  return (
    <div className="flex flex-col mx-auto min-h-screen w-full max-w-4xl py-14 px-12 gap-6">
      <CustomBreadcrumb
        items={[
          { name: "Farms", url: "/farms" },
          { name: report?.farmName || "Farm", url: `/farms/${report?.farmId}` },
          { name: `Report #${id}`, url: `/reports/${id}` },
        ]}
      />
      <h5 className="font-semibold">
        {report?.dateSubmitted &&
          new Date(report.dateSubmitted).toLocaleDateString()}
      </h5>
      <AddReportEntryField id={Number(id)} loadReport={loadReport} />
      <p>Entries</p>
      <div className="space-y-4">
        {[...(report?.reportEntries || [])]
          .reverse()
          .map((reportEntry: ReportEntry) => (
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
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{reportEntry.quantity} tonnes</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Page;
