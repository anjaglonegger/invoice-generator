export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
};

export const formatCurrency = (amount: number) => {
  return `€${amount.toFixed(2)}`;
};
