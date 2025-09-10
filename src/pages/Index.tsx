
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Upload, Sparkles, Star, TrendingUp, Download, CheckCircle, Clock } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import AnalysisReport from '@/components/AnalysisReport';
import { analyzeBusinessCard } from '@/services/chatgptService';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [manualData, setManualData] = useState<any>(null);
  const [showReport, setShowReport] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pdfReportUrl, setPdfReportUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null); // To store parsed AI analysis
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!frontImage) {
      toast({
        title: "Error",
        description: "Please upload a front image of the business card.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setPdfReportUrl(null);
    setAnalysisResult(null);
    setError(null);

    try {
      const response = await analyzeBusinessCard(frontImage, backImage, manualData);
      setPdfReportUrl(response.pdfUrl);
      setAnalysisResult(response.analysisData); // Set the actual analysis data
      
      toast({
        title: "Success",
        description: "Mystical analysis complete! Report generated.",
      });
      setShowReport(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate analysis report.",
        variant: "destructive",
      });
      console.error("Analysis error:", error);
      setError(error.message || "Failed to generate analysis report.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canAnalyze = frontImage && !isAnalyzing;

  if (showReport) {
    return (
      <div className="min-h-screen bg-[#101C36]">
        <AnalysisReport
          pdfUrl={pdfReportUrl}
          analysisData={analysisResult} // Pass the actual analysis data
          onBack={() => setShowReport(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101C36]">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#162346] via-[#101C36] to-[#0F1729]">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#25CED1] to-[#FFD166] rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-r from-[#25CED1] to-[#FFD166] rounded-full">
                  <img 
                    src="/lovable-uploads/53420912-774b-4acd-8b64-48c2b13bdf00.png" 
                    alt="Analysis Tool" 
                    className="w-12 h-12"
                  />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FFD166] mb-4 leading-tight">
              Business Card Analysis
            </h1>
            <p className="text-xl sm:text-2xl text-[#25CED1] mb-6 font-medium">Mystical Analysis Tool</p>
            <p className="text-lg text-[#F8F8FF]/90 max-w-4xl mx-auto mb-10 leading-relaxed">
              Unlock the hidden power of your visiting card through advanced numerology, 
              astrology, and design analysis. Transform your business presence with cosmic insights.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-[#162346]/80 backdrop-blur-sm text-[#FFD166] border-[#FFD166]/30 px-4 py-2 text-sm">
                <Star className="w-4 h-4 mr-2" />
                Numerology Analysis
              </Badge>
              <Badge className="bg-[#162346]/80 backdrop-blur-sm text-[#25CED1] border-[#25CED1]/30 px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Astrology Insights
              </Badge>
              <Badge className="bg-[#162346]/80 backdrop-blur-sm text-[#6C63FF] border-[#6C63FF]/30 px-4 py-2 text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                SWOT Analysis
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-8 shadow-xl border-[#FFD166]/20 bg-[#162346]/95 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-[#FFD166] mb-8 flex items-center">
                <Upload className="w-6 h-6 mr-3" />
                Upload Your Visiting Card
              </h2>
              <ImageUpload
                frontImage={frontImage}
                backImage={backImage}
                onFrontImageChange={setFrontImage}
                onBackImageChange={setBackImage}
              />
            </Card>
          </div>

          {/* Analysis Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 shadow-xl border-[#25CED1]/20 bg-gradient-to-br from-[#25CED1]/95 to-[#6C63FF]/95 backdrop-blur-sm text-white">
              <h2 className="text-xl font-bold mb-6">Ready for Analysis?</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    frontImage ? 'bg-[#FFD166] shadow-lg shadow-[#FFD166]/50' : 'bg-white/30'
                  }`}></div>
                  <span className="text-sm">Card image uploaded</span>
                  {frontImage && <CheckCircle className="w-4 h-4 text-[#FFD166]" />}
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    frontImage ? 'bg-[#FFD166] shadow-lg shadow-[#FFD166]/50' : 'bg-white/30'
                  }`}></div>
                  <span className="text-sm">Ready for mystical analysis</span>
                  {frontImage && <CheckCircle className="w-4 h-4 text-[#FFD166]" />}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-[#FFD166] shadow-lg shadow-[#FFD166]/50"></div>
                  <span className="text-sm">Advanced processing ready</span>
                  <CheckCircle className="w-4 h-4 text-[#FFD166]" />
                </div>
              </div>
              
              <Separator className="my-6 bg-white/20" />
              
              <Button 
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                className="w-full bg-white text-[#25CED1] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3 text-base transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#25CED1] mr-3"></div>
                    Analyzing with Mystical Sciences...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-3" />
                    Generate Mystical Analysis
                  </>
                )}
              </Button>
              
              {isAnalyzing && (
                <div className="mt-6 space-y-2 text-center text-white/90">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4 animate-pulse" />
                    <p className="text-sm font-medium">Processing with occult sciences...</p>
                  </div>
                  <p className="text-xs opacity-80">Extracting card information...</p>
                  <p className="text-xs opacity-80">Calculating numerology patterns...</p>
                  <p className="text-xs opacity-80">Generating comprehensive report...</p>
                </div>
              )}
            </Card>

            <Card className="p-6 shadow-xl border-[#FFD166]/20 bg-[#162346]/95 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-[#FFD166] mb-6">Mystical Analysis Features:</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#101C36]/50 border-l-2 border-[#FFD166]">
                  <Star className="w-5 h-5 text-[#FFD166] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#F8F8FF] text-sm">Numerology Analysis</p>
                    <p className="text-xs text-[#A9A9B3] mt-1">Advanced destiny numbers and vibrations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#101C36]/50 border-l-2 border-[#25CED1]">
                  <Sparkles className="w-5 h-5 text-[#25CED1] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#F8F8FF] text-sm">Astrology Insights</p>
                    <p className="text-xs text-[#A9A9B3] mt-1">Cosmic compatibility and business guidance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#101C36]/50 border-l-2 border-[#6C63FF]">
                  <TrendingUp className="w-5 h-5 text-[#6C63FF] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#F8F8FF] text-sm">SWOT Analysis</p>
                    <p className="text-xs text-[#A9A9B3] mt-1">Mystical strengths and opportunities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#101C36]/50 border-l-2 border-[#25CED1]">
                  <Download className="w-5 h-5 text-[#25CED1] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#F8F8FF] text-sm">Professional Report</p>
                    <p className="text-xs text-[#A9A9B3] mt-1">Downloadable PDF with all mystical insights</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
