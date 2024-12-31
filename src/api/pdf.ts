import { useQuery } from "@tanstack/react-query";

const useFetchPdf = (applicantId: string) => {
  return useQuery({
    queryKey: ["applicant", applicantId],
    queryFn: async () => {
      const response = await fetch(
        `https://applicationbackend.jalikoi.rw/api/v1/pdf/applicants/${applicantId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }

      return await response.blob(); // Returns the PDF Blob
    },
    enabled: !!applicantId,
    refetchOnWindowFocus: false,
  });
};

const triggerPdfDownload = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url); // Clean up the object URL
};

export { useFetchPdf, triggerPdfDownload };
