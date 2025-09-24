import { InvoiceData } from "@/types/invoice";
import { jsPDF } from "jspdf";
import { formatDate } from "./formatters";

export const generatePDF = async (invoice: InvoiceData) => {
  const doc = new jsPDF();
  let y = 20;

  // Helper function to format currency in EUR
  const formatEUR = (amount: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  // Helper function to load image as base64 and get dimensions
  const loadImageAsBase64 = (
    src: string
  ): Promise<{ dataURL: string; width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject("Canvas context not available");
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL("image/png");
        resolve({
          dataURL,
          width: img.width,
          height: img.height,
        });
      };

      img.onerror = () => reject("Failed to load image");
      img.src = src;
    });
  };

  // Add Coachify logo in upper right corner
  try {
    const logoData = await loadImageAsBase64("/Coachify_Logo_gesamt_gro.PNG");

    // Set logo height to exactly 5cm (5cm = 141.75 PDF units)
    const logoHeightCm = 2;
    const logoHeight = logoHeightCm * 28.35; // Convert cm to PDF units (1cm ≈ 28.35 units)

    // Calculate width based on original aspect ratio
    const originalAspectRatio = logoData.width / logoData.height;
    const logoWidth = logoHeight * originalAspectRatio;

    // Position logo in upper right corner
    const logoX = 200 - logoWidth - 5; // 5 units margin from right edge
    const logoY = 20 - 5; // 5 units margin from top edge

    // Add the logo image to PDF with exact 5cm height
    doc.addImage(logoData.dataURL, "PNG", logoX, logoY, logoWidth, logoHeight);
  } catch (error) {
    console.log("Logo could not be loaded, using fallback");
    // Fallback logo
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("COACHIFY", 150, 20);
  }

  // Header - Company Information (Sender) - Small text at top
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(
    `${invoice.fromName} • ${invoice.fromAddress} • ${invoice.fromCity}`,
    20,
    y
  );
  y += 15;

  // Left side - Recipient Address
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(invoice.toName, 20, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(invoice.toAddress, 20, y);
  y += 6;
  doc.text(invoice.toCity, 20, y);

  // Move y position down for left content
  y += 40;

  // Greeting and invoice header
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const greeting =
    invoice.toGender === "Frau"
      ? "Sehr geehrte Frau"
      : invoice.toGender === "Herr"
      ? "Sehr geehrter Herr"
      : invoice.toGender === "Divers"
      ? "Sehr geehrte Person"
      : "Sehr geehrte Damen und Herren";
  const nameForGreeting =
    invoice.toGender && invoice.toGender !== "Divers"
      ? invoice.toName.split(" ").pop()
      : "";
  doc.text(
    `${greeting}${nameForGreeting ? ` ${nameForGreeting}` : ""},`,
    20,
    y
  );
  y += 6;
  doc.text(
    "hiermit stelle ich Ihnen, wie vereinbart, folgende Leistungen in Rechnung:",
    20,
    y
  );
  y += 15;

  doc.text("Datum", 150, y);
  doc.text(formatDate(invoice.date), 170, y);

  // Invoice title and number
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(`${invoice.invoiceNumber}`, 20, y);

  y += 8;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Berechnung für den Zeitraum vom ${invoice.periodStart} bis zum ${invoice.periodEnd}`,
    20,
    y
  );
  y += 15;

  // Items table
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");

  // Table headers
  doc.text("Nr", 20, y);
  doc.text("Datum", 30, y);
  doc.text("Bezeichnung", 70, y);
  doc.text("Menge", 130, y, { align: "right" });
  doc.text("Einzelpreis", 155, y, { align: "right" });
  doc.text("Betrag", 185, y, { align: "right" });
  y += 8;

  // Table line
  doc.line(20, y, 190, y);
  y += 8;

  // Items
  doc.setFont("helvetica", "normal");
  invoice.items.forEach((item, index) => {
    doc.text((index + 1).toString(), 20, y);

    // Add the item date
    doc.text(formatDate(item.date) || "", 30, y);

    // Handle long descriptions
    const description = item.description;
    if (description.length > 25) {
      const lines = doc.splitTextToSize(description, 55);
      doc.text(lines, 70, y);
      y += (lines.length - 1) * 5;
    } else {
      doc.text(description, 70, y);
    }

    doc.text(item.quantity.toString(), 130, y, { align: "right" });
    doc.text(formatEUR(Number(item.rate)).replace("€", ""), 155, y, {
      align: "right",
    });
    doc.text(formatEUR(item.amount), 185, y, { align: "right" });
    y += 10;
  });

  y += 5;

  // Totals section with background
  doc.setFillColor(240, 240, 240);
  doc.rect(92, y, 100, 25, "F");

  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Nettobetrag", 100, y);
  doc.text(formatEUR(invoice.subtotal), 185, y, { align: "right" });
  y += 6;

  if (invoice.taxExempt) {
    doc.text("nicht umsatzsteuerpflichtig nach §19 UStG", 100, y);
    doc.text("0,00 €", 184, y, { align: "right" });
  } else {
    doc.text(`Umsatzsteuer ${invoice.taxRate}%`, 100, y);
    doc.text(formatEUR(invoice.taxAmount), 185, y, { align: "right" });
  }
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text("Rechnungsbetrag", 100, y);
  doc.text(formatEUR(invoice.total), 185, y, { align: "right" });
  y += 10;

  // Thank you message
  doc.setFont("helvetica", "normal");
  doc.text("Vielen Dank für Ihren Auftrag!", 20, y);
  y += 10;

  // Payment instructions with automatic line wrapping
  const paymentText =
    "Bitte begleichen Sie den offenen Betrag innerhalb von 30 Tagen, unter Angabe der Rechnungsnummer als Verwendungszweck, auf das unten angegebene Bankkonto.";
  const paymentLines = doc.splitTextToSize(paymentText, 170); // 170 is the max width
  doc.text(paymentLines, 20, y);
  y += paymentLines.length * 5; // Adjust spacing based on number of lines
  y += 5; // Extra spacing

  doc.text("Mit freundlichen Grüßen", 20, y);
  y += 10;

  doc.text(invoice.fromName, 20, y);
  y += 30;

  // Footer section
  const footerY = 250;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");

  // Left column - Administration
  doc.text("Coachify - Coaching by Fortify", 20, footerY);
  doc.text(invoice.fromName, 20, footerY + 5);
  doc.text(invoice.fromAddress, 20, footerY + 10);
  doc.text(invoice.fromCity, 20, footerY + 15);
  doc.text("Deutschland", 20, footerY + 20);
  doc.text("E-Mail: coaching.fortify@gmail.com", 20, footerY + 25);

  // Fourth column - Banking
  doc.text("Bankverbindung", 130, footerY);
  doc.text("Raiffeisen-Volksbank Ries eG", 130, footerY + 5);
  doc.text("Kontoinhaber Kevin Kohnlein", 130, footerY + 10);
  doc.text("IBAN: DE67 7206 9329 0102 3295 06", 130, footerY + 15);
  doc.text("BIC: GENODEF1NOE", 130, footerY + 20);
  doc.text("Steuer-Nr.: 257/23832716", 130, footerY + 25);

  // Page number
  doc.text("Seite 1/1", 185, 280);

  // Save the PDF
  doc.save(`Rechnung-${invoice.invoiceNumber}.pdf`);
};
