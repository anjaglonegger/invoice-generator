import { useInvoice } from "@/context/invoice-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";

export default function TaxAndTotals() {
  const { invoice, updateInvoice } = useInvoice();

  const handleTaxRateChange = (value: string) => {
    // Allow empty string temporarily
    if (value === "") {
      updateInvoice({ taxRate: "" });
    } else {
      const numValue = Number.parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
        updateInvoice({ taxRate: numValue });
      }
    }
  };

  const handleTaxRateBlur = () => {
    // If empty on blur, set to 0
    if (invoice.taxRate === "" || isNaN(Number(invoice.taxRate))) {
      updateInvoice({ taxRate: 0 });
    }
  };

  const handleTaxStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "exempt") {
      updateInvoice({ taxExempt: true, taxRate: 0 });
    } else {
      updateInvoice({ taxExempt: false, taxRate: 19 });
    }
  };

  // Provide default value for taxExempt if it doesn't exist
  const taxExempt = invoice.taxExempt || true;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Steuer & Summen</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="taxStatus">Umsatzsteuer-Status</Label>
            <Select
              id="taxStatus"
              value={taxExempt ? "exempt" : "taxable"}
              onChange={handleTaxStatusChange}
            >
              <option value="taxable">19% Umsatzsteuer</option>
              <option value="exempt">Nicht umsatzsteuerpflichtig</option>
            </Select>
          </div>

          {!taxExempt && (
            <div>
              <Label htmlFor="taxRate">Umsatzsteuer (%)</Label>
              <Input
                id="taxRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={invoice.taxRate}
                onChange={(e) => handleTaxRateChange(e.target.value)}
                onBlur={handleTaxRateBlur}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Nettobetrag</span>
            <span>€{invoice.subtotal.toFixed(2)}</span>
          </div>

          {taxExempt ? (
            <div className="flex justify-between text-sm">
              <span>nicht umsatzsteuerpflichtig nach §19 UStG</span>
              <span>€0,00</span>
            </div>
          ) : (
            <div className="flex justify-between">
              <span>
                Umsatzsteuer (
                {typeof invoice.taxRate === "number" ? invoice.taxRate : 0}
                %):
              </span>
              <span>€{invoice.taxAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Rechnungsbetrag</span>
            <span>€{invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
