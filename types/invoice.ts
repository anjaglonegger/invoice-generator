export interface InvoiceItem {
  id: string;
  date: string;
  description: string;
  quantity: number | string;
  rate: number | string;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  periodStart: string;
  periodEnd: string;
  fromName: string;
  fromAddress: string;
  fromCity: string;
  toGender: string;
  toName: string;
  toAddress: string;
  toCity: string;
  items: InvoiceItem[];
  taxRate: number | string;
  taxExempt: boolean;
  subtotal: number;
  taxAmount: number;
  total: number;
}
