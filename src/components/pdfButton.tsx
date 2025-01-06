import { useFetchPdf, triggerPdfDownload } from "../api/pdf";

interface PdfButtonProps {
  applicantId: string;
}

const PdfButton = ({ applicantId }: PdfButtonProps) => {
  const { data: pdfBlob, isLoading, error } = useFetchPdf(applicantId);

  const handleDownload = () => {
    if (pdfBlob) {
      triggerPdfDownload(pdfBlob, `Applicant_${applicantId}.pdf`);
    }
  };

  if (isLoading) {
    return <button disabled>Loading...</button>;
  }

  if (error) {
    return <button disabled>Error fetching PDF</button>;
  }

  return (
    <button onClick={handleDownload} className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
      Download PDF
    </button>
  );
};

export default PdfButton;
