import type { InvoiceItem } from "../types/invoice"

export const calculateTotals = (items: InvoiceItem[], taxRate: number | string, taxExempt: boolean = false) => {
  const subtotal = items.reduce((sum, item) => {
    const amount = typeof item.amount === "number" ? item.amount : 0
    return sum + amount
  }, 0)

  // If tax exempt, tax amount is always 0
  if (taxExempt) {
    return { subtotal, taxAmount: 0, total: subtotal }
  }

  const rate = typeof taxRate === "number" ? taxRate : taxRate === "" ? 0 : Number(taxRate)
  const taxAmount = (subtotal * rate) / 100
  const total = subtotal + taxAmount

  return { subtotal, taxAmount, total }
}
