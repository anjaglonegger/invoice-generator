export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatCurrency = (amount: number) => {
  return `€${amount.toFixed(2)}`;
};
