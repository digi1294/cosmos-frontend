
interface AnalysisResponse {
  message: string;
  pdfUrl: string;
  analysisData: any; // Add this line to include the AI analysis data
}

export const analyzeBusinessCard = async (frontImage: File, backImage: File | null, manualData?: any): Promise<AnalysisResponse> => {
  try {
    const formData = new FormData();
    formData.append('frontImage', frontImage);
    if (backImage) {
      formData.append('backImage', backImage);
    }
    if (manualData) {
      formData.append('manualData', JSON.stringify(manualData));
    }

    const response = await fetch('http://localhost:3001/api/analyze-card', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to analyze business card');
    }

    const data: AnalysisResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error analyzing business card:', error);
    throw new Error(error.message || 'Failed to analyze business card. Please try again.');
  }
};
