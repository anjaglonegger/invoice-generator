import type { InvoiceData } from "../types/invoice";

// Function to get the next invoice number
export const getNextInvoiceNumber = (): string => {
  const currentYear = new Date().getFullYear();
  const storageKey = `invoiceCounter_${currentYear}`;

  // Get the current counter from localStorage, default to 0
  let counter = 0;
  if (typeof window !== "undefined") {
    const storedCounter = localStorage.getItem(storageKey);
    counter = storedCounter ? parseInt(storedCounter, 10) : 0;
  }

  // Increment the counter
  counter += 1;

  // Save the new counter back to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(storageKey, counter.toString());
  }

  // Format the invoice number: RechnungNr.YYYY0001, YYYY0002, etc.
  const paddedNumber = counter.toString().padStart(4, "0");
  return `Rechnung Nr. ${currentYear}${paddedNumber}`;
};

// Function to reset the invoice counter (useful for testing or new year)
export const resetInvoiceCounter = (year?: number): void => {
  const targetYear = year || new Date().getFullYear();
  const storageKey = `invoiceCounter_${targetYear}`;

  if (typeof window !== "undefined") {
    localStorage.removeItem(storageKey);
  }
};

// Function to get the current invoice counter without incrementing
export const getCurrentInvoiceCounter = (): number => {
  const currentYear = new Date().getFullYear();
  const storageKey = `invoiceCounter_${currentYear}`;

  if (typeof window !== "undefined") {
    const storedCounter = localStorage.getItem(storageKey);
    return storedCounter ? parseInt(storedCounter, 10) : 0;
  }

  return 0;
};

export const initialInvoiceData: InvoiceData = {
  invoiceNumber: getNextInvoiceNumber(),
  date: new Date().toISOString().split("T")[0],
  periodStart: "",
  periodEnd: "",
  fromName: "Kevin Köhnlein",
  fromAddress: "Scheffelstraße 15",
  fromCity: "97209 Veithöchsheim",
  toGender: "",
  toName: "",
  toAddress: "",
  toCity: "",
  items: [
    {
      id: "1",
      date: new Date().toISOString().split("T")[0],
      description: "",
      quantity: 1,
      rate: 20,
      amount: 0,
    },
  ],
  taxRate: 19,
  taxExempt: false,
  subtotal: 0,
  taxAmount: 0,
  total: 0,
};
