
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Building, Phone, Mail, Calendar, Briefcase } from 'lucide-react';

interface ManualInputProps {
  onDataChange: (data: any) => void;
}

const ManualInput: React.FC<ManualInputProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    designation: '',
    phone: '',
    email: '',
    dob: '',
    address: '',
    website: '',
    tagline: ''
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const InputField = ({ 
    icon: Icon, 
    label, 
    field, 
    type = 'text', 
    placeholder 
  }: {
    icon: any;
    label: string;
    field: string;
    type?: string;
    placeholder: string;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={field} className="text-sm font-medium text-gray-700 flex items-center">
        <Icon className="w-4 h-4 mr-2 text-gray-500" />
        {label}
      </Label>
      <Input
        id={field}
        type={type}
        value={formData[field as keyof typeof formData]}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
        className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          icon={User}
          label="Full Name *"
          field="name"
          placeholder="John Doe"
        />
        <InputField
          icon={Building}
          label="Company Name"
          field="company"
          placeholder="Acme Corporation"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          icon={Briefcase}
          label="Designation"
          field="designation"
          placeholder="CEO, Manager, etc."
        />
        <InputField
          icon={Phone}
          label="Phone Number"
          field="phone"
          placeholder="+1 234 567 8900"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          icon={Mail}
          label="Email Address"
          field="email"
          type="email"
          placeholder="john@company.com"
        />
        <InputField
          icon={Calendar}
          label="Date of Birth (for Astrology)"
          field="dob"
          type="date"
          placeholder=""
        />
      </div>

      <InputField
        icon={Building}
        label="Website"
        field="website"
        placeholder="www.company.com"
      />

      <div className="space-y-2">
        <Label htmlFor="tagline" className="text-sm font-medium text-gray-700">
          Tagline / Slogan
        </Label>
        <Textarea
          id="tagline"
          value={formData.tagline}
          onChange={(e) => handleChange('tagline', e.target.value)}
          placeholder="Your company's tagline or motto"
          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
          Address
        </Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Business address"
          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          rows={3}
        />
      </div>

      {formData.name && (
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-sm text-green-700 font-medium">
            ✓ Ready for analysis with provided information
          </p>
          <p className="text-xs text-green-600 mt-1">
            {formData.dob 
              ? "Full numerology and astrology analysis available" 
              : "Numerology analysis available (add DOB for astrology insights)"
            }
          </p>
        </Card>
      )}
    </div>
  );
};

export default ManualInput;
