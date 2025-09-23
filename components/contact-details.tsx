import { useInvoice } from "@/context/invoice-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";

export default function ContactDetails() {
  const { invoice, updateInvoice } = useInvoice();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unternehmen & Empfänger</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-medium">Unternehmen (Deine Daten)</h3>
          <div>
            <Label htmlFor="fromName">Name</Label>
            <Input
              id="fromName"
              value={invoice.fromName}
              onChange={(e) => updateInvoice({ fromName: e.target.value })}
              placeholder="Your name or company"
            />
          </div>
          <div>
            <Label htmlFor="fromAddress">Straße & Hausnummer</Label>
            <Input
              id="fromAddress"
              value={invoice.fromAddress}
              onChange={(e) => updateInvoice({ fromAddress: e.target.value })}
              placeholder="Musterstraße 1"
              type="email"
            />
          </div>
          <div>
            <Label htmlFor="fromCity">PLZ & Ort</Label>
            <Input
              id="fromCity"
              value={invoice.fromCity}
              onChange={(e) => updateInvoice({ fromCity: e.target.value })}
              placeholder="12345 Musterstadt"
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">Empfänger (Klienten Daten)</h3>
          
          <div>
            <Label htmlFor="toGender">Anrede</Label>
            <Select
              id="toGender"
              value={invoice.toGender}
              onChange={(e) => updateInvoice({ toGender: e.target.value })}
            >
              <option value="">Bitte wählen</option>
              <option value="Herr">Herr</option>
              <option value="Frau">Frau</option>
              <option value="Divers">Divers</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="toName">Name</Label>
            <Input
              id="toName"
              value={invoice.toName}
              onChange={(e) => updateInvoice({ toName: e.target.value })}
              placeholder="Client name or company"
            />
          </div>
          <div>
            <Label htmlFor="toAddress">Straße & Hausnummer</Label>
            <Input
              id="toAddress"
              value={invoice.toAddress}
              onChange={(e) => updateInvoice({ toAddress: e.target.value })}
              placeholder="Musterstraße 1"
              type="email"
            />
          </div>
          <div>
            <Label htmlFor="toCity">PLZ & Ort</Label>
            <Input
              id="toCity"
              value={invoice.toCity}
              onChange={(e) => updateInvoice({ toCity: e.target.value })}
              placeholder="12345 Musterstadt"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
