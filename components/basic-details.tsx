import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useInvoice } from "@/context/invoice-context";

export default function BasicDetails() {
  const { invoice, updateInvoice } = useInvoice();

  // Helper function to convert dd.mm.yyyy to yyyy-mm-dd for HTML date input
  const formatDateForInput = (dateStr: string): string => {
    if (!dateStr) return "";

    // If already in yyyy-mm-dd format, return as is
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateStr;
    }

    // If in dd.mm.yyyy format, convert to yyyy-mm-dd
    if (dateStr.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
      const [day, month, year] = dateStr.split(".");
      return `${year}-${month}-${day}`;
    }

    return dateStr;
  };

  // Helper function to convert yyyy-mm-dd to dd.mm.yyyy for display/storage
  const formatDateForDisplay = (dateStr: string): string => {
    if (!dateStr) return "";

    // If in yyyy-mm-dd format, convert to dd.mm.yyyy
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateStr.split("-");
      return `${day}.${month}.${year}`;
    }

    return dateStr;
  };

  const handleDateChange = (
    field: "date" | "periodStart" | "periodEnd",
    value: string
  ) => {
    const formattedDate = formatDateForDisplay(value);
    updateInvoice({ [field]: formattedDate });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rechnungs-Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="invoiceNumber">Rechnungsnummer</Label>
          <Input
            value={invoice.invoiceNumber}
            onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
            id="invoiceNumber"
          />
        </div>
        <div>
          <Label htmlFor="date">Datum</Label>
          <Input
            id="date"
            type="date"
            onChange={(e) => handleDateChange("date", e.target.value)}
            value={formatDateForInput(invoice.date)}
          />
        </div>
        <div>
          <Label htmlFor="periodStart">Zeitraum von</Label>
          <Input
            id="periodStart"
            type="date"
            onChange={(e) => handleDateChange("periodStart", e.target.value)}
            value={formatDateForInput(invoice.periodStart)}
          />
        </div>
        <div>
          <Label htmlFor="periodEnd">Zeitraum bis</Label>
          <Input
            id="periodEnd"
            type="date"
            onChange={(e) => handleDateChange("periodEnd", e.target.value)}
            value={formatDateForInput(invoice.periodEnd)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
