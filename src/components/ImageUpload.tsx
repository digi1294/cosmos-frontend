
import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  frontImage: File | null;
  backImage: File | null;
  onFrontImageChange: (file: File | null) => void;
  onBackImageChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  frontImage,
  backImage,
  onFrontImageChange,
  onBackImageChange,
}) => {
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setter(file);
    } else if (file) {
      alert('File size must be less than 5MB');
    }
  };

  const removeImage = (setter: (file: File | null) => void) => {
    setter(null);
  };

  const ImagePreview = ({ file, onRemove }: { file: File; onRemove: () => void }) => (
    <div className="relative group">
      <img
        src={URL.createObjectURL(file)}
        alt="Card preview"
        className="w-full h-40 object-cover rounded-lg border-2 border-gray-200"
      />
      <Button
        onClick={onRemove}
        variant="destructive"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );

  const UploadArea = ({ 
    label, 
    onClick, 
    file 
  }: { 
    label: string; 
    onClick: () => void; 
    file: File | null;
  }) => (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-700">{label}</h3>
      {file ? (
        <ImagePreview 
          file={file} 
          onRemove={() => removeImage(label.includes('Front') ? onFrontImageChange : onBackImageChange)} 
        />
      ) : (
        <Card
          className="border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors cursor-pointer group"
          onClick={onClick}
        >
          <div className="p-8 text-center">
            <div className="mx-auto w-12 h-12 bg-gray-100 group-hover:bg-purple-100 rounded-full flex items-center justify-center mb-4 transition-colors">
              <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
            </div>
            <p className="text-sm text-gray-600 mb-2">Click to upload {label.toLowerCase()}</p>
            <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <UploadArea
          label="Front Side"
          onClick={() => frontInputRef.current?.click()}
          file={frontImage}
        />
        <UploadArea
          label="Back Side (Optional)"
          onClick={() => backInputRef.current?.click()}
          file={backImage}
        />
      </div>

      <input
        ref={frontInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, onFrontImageChange)}
        className="hidden"
      />
      <input
        ref={backInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, onBackImageChange)}
        className="hidden"
      />

      {(frontImage || backImage) && (
        <div className="text-center">
          <p className="text-sm text-green-600 font-medium">
            ✓ Card images uploaded successfully
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Our OCR will automatically extract information from your card
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
