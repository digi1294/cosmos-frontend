
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Download,
  Star,
  Sparkles,
  Eye,
  Shield,
  Zap,
  Crown,
  Moon,
  Sun,
  Building, // Added Building icon
  Briefcase // Added Briefcase icon
} from 'lucide-react';
interface AnalysisReportProps {
  pdfUrl: string | null;
  analysisData: any; // This will hold the parsed JSON from the backend
  onBack: () => void;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ pdfUrl, analysisData, onBack }) => {
  // Use actual analysisData from props, or fallback to mock data if not available
  const cardDetails = analysisData?.cardDetails || { name: 'N/A', company: 'N/A', title: 'N/A' };
  const numerologyAnalysis = analysisData?.numerologyAnalysis || { title: "The Vibration of Numbers", analysis: "No numerology analysis available." };
  const astrologyInsights = analysisData?.astrologyInsights || { title: "Cosmic Blueprint", analysis: "No astrology insights available." };
  const swotAnalysis = analysisData?.swotAnalysis || {
    title: "Mystical Strengths & Opportunities",
    strengths: "No strengths identified.",
    weaknesses: "No weaknesses identified.",
    opportunities: "No opportunities identified.",
    threats: "No threats identified."
  };

  const handleDownloadPDF = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      alert('PDF report not available.');
    }
  };


  return (
    <div className="min-h-screen bg-[#101C36] text-[#F8F8FF]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center bg-[#162346] border-[#FFD166]/30 text-[#FFD166] hover:bg-[#FFD166]/10 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Upload
          </Button>
          
          <div className="text-center flex-1">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#25CED1] to-[#FFD166] rounded-full flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#FFD166]">
                  Mystical Business Analysis
                </h1>
                <p className="text-[#25CED1] text-sm">Occult Sciences • Numerology • Energy Reading</p>
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-[#25CED1] to-[#FFD166] hover:from-[#25CED1]/80 hover:to-[#FFD166]/80 text-[#101C36] font-semibold transition-all duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Business Profile Card */}
        <Card className="p-6 sm:p-8 mb-8 bg-[#162346] border-[#FFD166]/20 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card Details */}
            <div className="text-center p-4 bg-[#101C36]/30 rounded-lg">
              <Crown className="w-8 h-8 text-[#FFD166] mx-auto mb-3" />
              <h3 className="text-[#25CED1] font-semibold mb-2 text-sm">Name</h3>
              <p className="text-[#F8F8FF] text-sm">{cardDetails.name}</p>
            </div>
            <div className="text-center p-4 bg-[#101C36]/30 rounded-lg">
              <Building className="w-8 h-8 text-[#6C63FF] mx-auto mb-3" />
              <h3 className="text-[#25CED1] font-semibold mb-2 text-sm">Company</h3>
              <p className="text-[#F8F8FF] text-sm">{cardDetails.company}</p>
            </div>
            <div className="text-center p-4 bg-[#101C36]/30 rounded-lg">
              <Briefcase className="w-8 h-8 text-[#6C63FF] mx-auto mb-3" />
              <h3 className="text-[#25CED1] font-semibold mb-2 text-sm">Title</h3>
              <p className="text-[#F8F8FF] text-sm">{cardDetails.title}</p>
            </div>
            <div className="text-center p-4 bg-[#101C36]/30 rounded-lg">
              <Sparkles className="w-8 h-8 text-[#25CED1] mx-auto mb-3" />
              <h3 className="text-[#25CED1] font-semibold mb-2 text-sm">Analysis Status</h3>
              <p className="text-[#F8F8FF] text-sm">Complete</p>
            </div>
          </div>
        </Card>

        {/* Numerology and Astrology Analysis */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Numerology Analysis */}
          <Card className="p-6 bg-[#162346] border-[#FFD166]/20 shadow-lg">
            <h2 className="text-xl font-bold text-[#FFD166] mb-6 flex items-center">
              <Star className="w-6 h-6 mr-3" />
              {numerologyAnalysis.title}
            </h2>
            <p className="text-sm text-[#F8F8FF]">{numerologyAnalysis.analysis}</p>
          </Card>

          {/* Astrology Insights */}
          <Card className="p-6 bg-[#162346] border-[#FFD166]/20 shadow-lg">
            <h2 className="text-xl font-bold text-[#FFD166] mb-6 flex items-center">
              <Moon className="w-6 h-6 mr-3" />
              {astrologyInsights.title}
            </h2>
            <p className="text-sm text-[#F8F8FF]">{astrologyInsights.analysis}</p>
          </Card>
        </div>

        {/* SWOT Analysis */}
        <Card className="p-6 sm:p-8 bg-[#162346] border-[#FFD166]/20 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-[#FFD166] mb-8 text-center flex items-center justify-center">
            <Sun className="w-8 h-8 mr-3" />
            {swotAnalysis.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Strengths */}
            <div>
              <h3 className="font-bold text-[#25CED1] mb-4 flex items-center text-base border-l-4 border-[#25CED1] pl-3">
                <Shield className="w-5 h-5 mr-2" />
                Cosmic Strengths
              </h3>
              <ul className="space-y-3">
                {Array.isArray(swotAnalysis.strengths) ? swotAnalysis.strengths.map((item, index) => (
                  <li key={index} className="text-xs text-[#A9A9B3] flex items-start">
                    <div className="w-2 h-2 bg-[#25CED1] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                )) : <li className="text-xs text-[#A9A9B3]">{swotAnalysis.strengths}</li>}
              </ul>
            </div>

            {/* Weaknesses */}
            <div>
              <h3 className="font-bold text-red-400 mb-4 flex items-center text-base border-l-4 border-red-400 pl-3">
                <Zap className="w-5 h-5 mr-2" />
                Energetic Leaks
              </h3>
              <ul className="space-y-3">
                {Array.isArray(swotAnalysis.weaknesses) ? swotAnalysis.weaknesses.map((item, index) => (
                  <li key={index} className="text-xs text-[#A9A9B3] flex items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                )) : <li className="text-xs text-[#A9A9B3]">{swotAnalysis.weaknesses}</li>}
              </ul>
            </div>

            {/* Opportunities */}
            <div>
              <h3 className="font-bold text-[#6C63FF] mb-4 flex items-center text-base border-l-4 border-[#6C63FF] pl-3">
                <Star className="w-5 h-5 mr-2" />
                Paths to Growth
              </h3>
              <ul className="space-y-3">
                {Array.isArray(swotAnalysis.opportunities) ? swotAnalysis.opportunities.map((item, index) => (
                  <li key={index} className="text-xs text-[#A9A9B3] flex items-start">
                    <div className="w-2 h-2 bg-[#6C63FF] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                )) : <li className="text-xs text-[#A9A9B3]">{swotAnalysis.opportunities}</li>}
              </ul>
            </div>

            {/* Threats */}
            <div>
              <h3 className="font-bold text-orange-400 mb-4 flex items-center text-base border-l-4 border-orange-400 pl-3">
                <Moon className="w-5 h-5 mr-2" />
                Potential Blockages
              </h3>
              <ul className="space-y-3">
                {Array.isArray(swotAnalysis.threats) ? swotAnalysis.threats.map((item, index) => (
                  <li key={index} className="text-xs text-[#A9A9B3] flex items-start">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {item}
                  </li>
                )) : <li className="text-xs text-[#A9A9B3]">{swotAnalysis.threats}</li>}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisReport;
