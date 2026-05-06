"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/button";
import { legalDisclaimer } from "@/components/disclaimer-box";
import { getProcedureLabel } from "@/lib/procedures";
import { formatDate, stripListMarker } from "@/lib/utils";
import type { AiResult, RequestFormData } from "@/types/adminfacile";

export function PdfButton({
  result,
  formData,
  createdAt
}: {
  result: AiResult;
  formData: RequestFormData;
  createdAt: string;
}) {
  async function downloadPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 16;
    const maxWidth = pageWidth - margin * 2;
    let y = 18;

    const procedureTitle = getProcedureLabel(formData.requestedAid);

    const ensureSpace = (height = 16) => {
      if (y + height > pageHeight - 18) {
        doc.addPage();
        y = 18;
        drawFooter();
      }
    };

    const drawFooter = () => {
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("AdminFacile - outil privé d'assistance administrative", margin, pageHeight - 7);
    };

    const writeSectionTitle = (text: string) => {
      ensureSpace(18);
      y += 3;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text(text, margin, y);
      y += 7;
      doc.setDrawColor(37, 99, 235);
      doc.line(margin, y, margin + 26, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
    };

    const writeParagraph = (text: string) => {
      const lines = doc.splitTextToSize(text || "-", maxWidth);
      ensureSpace(lines.length * 5 + 8);
      doc.text(lines, margin, y);
      y += lines.length * 5 + 5;
    };

    const writeBullets = (items: string[]) => {
      if (items.length === 0) {
        writeParagraph("-");
        return;
      }
      items.forEach((item) => {
        const clean = stripListMarker(item);
        const lines = doc.splitTextToSize(clean, maxWidth - 8);
        ensureSpace(lines.length * 5 + 7);
        doc.text("-", margin, y);
        doc.text(lines, margin + 6, y);
        y += lines.length * 5 + 3;
      });
      y += 2;
    };

    const writeSteps = (items: string[]) => {
      if (items.length === 0) {
        writeParagraph("-");
        return;
      }
      items.forEach((item, index) => {
        const clean = stripListMarker(item);
        const lines = doc.splitTextToSize(clean, maxWidth - 12);
        ensureSpace(lines.length * 5 + 7);
        doc.setFont("helvetica", "bold");
        doc.text(`${index + 1}.`, margin, y);
        doc.setFont("helvetica", "normal");
        doc.text(lines, margin + 10, y);
        y += lines.length * 5 + 3;
      });
      y += 2;
    };

    doc.setFillColor(15, 23, 42);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 34, 4, 4, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("AdminFacile", margin + 8, y + 13);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(procedureTitle, margin + 8, y + 23);
    doc.text(formatDate(createdAt), pageWidth - margin - 8, y + 13, { align: "right" });
    y += 46;

    writeSectionTitle("Résumé");
    writeParagraph(result.resume);

    writeSectionTitle("Informations utilisateur");
    writeParagraph(
      `${formData.firstName} ${formData.lastName} - ${formData.email}\nType de démarche: ${procedureTitle}\nSituation: ${formData.familyStatus || "-"}, ${formData.childrenCount} enfant(s), ${formData.housing || "-"}`
    );

    writeSectionTitle("Checklist");
    writeBullets(result.checklist);

    writeSectionTitle("Documents à préparer");
    writeBullets(result.documentsNecessaires);

    writeSectionTitle("Lettre générée");
    writeParagraph(result.lettre);

    writeSectionTitle("Étapes à suivre");
    writeSteps(result.etapes);

    writeSectionTitle("Avertissement légal");
    writeParagraph(result.avertissementFinal || legalDisclaimer);
    writeParagraph(legalDisclaimer);
    drawFooter();

    doc.save(`adminfacile-${formData.requestedAid.toLowerCase().replaceAll(" ", "-")}.pdf`);
  }

  return (
    <Button onClick={downloadPdf} type="button">
      <Download className="h-4 w-4" />
      Télécharger PDF
    </Button>
  );
}
