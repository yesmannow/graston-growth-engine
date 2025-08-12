"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FullProviderProfile } from "@/types";
import { showSuccess, showError } from "@/utils/toast";
import { User, Mail, Phone, MapPin, Globe, Plus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";

interface UpdateProfileFormProps {
  providerId: string;
  onUpdate: (updatedProvider: FullProviderProfile) => void;
}

export const UpdateProfileForm = ({ providerId, onUpdate }: UpdateProfileFormProps) => {
  const [formData, setFormData] = useState<FullProviderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newService, setNewService] = useState("");
  const [newCertification, setNewCertification] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', providerId)
        .single();

      if (error) {
        showError("Failed to load profile data.");
        console.error(error);
        setFormData(null);
      } else {
        setFormData(data as FullProviderProfile);
      }
      setIsLoading(false);
    };

    if (providerId) {
      fetchProfile();
    }
  }, [providerId]);

  const handleInputChange = (field: keyof FullProviderProfile, value: any) => {
    setFormData(prev => prev ? ({
      ...prev,
      [field]: value
    }) : null);
  };

  const addService = () => {
    if (newService.trim() && formData) {
      setFormData(prev => prev ? ({
        ...prev,
        services: [...(prev.services || []), newService.trim()]
      }) : null);
      setNewService("");
    }
  };

  const removeService = (index: number) => {
    if (formData) {
      setFormData(prev => prev ? ({
        ...prev,
        services: prev.services?.filter((_, i) => i !== index) || []
      }) : null);
    }
  };

  const addCertification = () => {
    if (newCertification.trim() && formData) {
      setFormData(prev => prev ? ({
        ...prev,
        certifications: [...(prev.certifications || []), newCertification.trim()]
      }) : null);
      setNewCertification("");
    }
  };

  const removeCertification = (index: number) => {
    if (formData) {
      setFormData(prev => prev ? ({
        ...prev,
        certifications: prev.certifications?.filter((_, i) => i !== index) || []
      }) : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSaving(true);
    
    const { data, error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('id', providerId)
      .select()
      .single();

    if (error) {
      showError("Failed to update profile.");
      console.error(error);
    } else {
      onUpdate(data as FullProviderProfile);
      showSuccess("Profile updated successfully!");
    }
    
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p>No profile data found for this ID.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Update Profile
          </CardTitle>
          <CardDescription>
            Keep your profile information up to date to improve your visibility and credibility.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image & Basic Info */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.profile_image || undefined} alt={formData.name} />
                  <AvatarFallback className="text-lg">
                    {formData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 w-full">
                  <Label htmlFor="profileImage">Profile Image URL</Label>
                  <Input
                    id="profileImage"
                    value={formData.profile_image || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("profile_image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      value={formData.specialty || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("specialty", e.target.value)}
                      placeholder="e.g., Physical Therapy"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="accepting-new-patients"
                    checked={formData.accepting_new_patients ?? false}
                    onCheckedChange={(checked: boolean) => handleInputChange("accepting_new_patients", checked)}
                  />
                  <Label htmlFor="accepting-new-patients" className="text-base">
                    Accepting New Patients
                  </Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={formData.phone || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("phone", e.target.value)}
                        className="pl-10"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={formData.location || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("location", e.target.value)}
                      className="pl-10"
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("bio", e.target.value)}
                placeholder="Tell potential clients about your experience and expertise..."
                rows={4}
              />
            </div>

            <Separator />

            {/* Professional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  value={formData.experience || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("experience", e.target.value)}
                  placeholder="e.g., 10 years"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  value={formData.education || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("education", e.target.value)}
                  placeholder="e.g., MD, Harvard Medical School"
                />
              </div>
            </div>

            <Separator />

            {/* Website & Social Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Online Presence</h3>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    value={formData.website || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("website", e.target.value)}
                    className="pl-10"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={formData.facebook || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("facebook", e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={formData.instagram || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("instagram", e.target.value)}
                    placeholder="https://instagram.com/youraccount"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={formData.twitter || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("twitter", e.target.value)}
                    placeholder="https://twitter.com/youraccount"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Services Offered</h3>
              <div className="flex flex-wrap gap-2">
                {formData.services?.map((service, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {service}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeService(index)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newService}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewService(e.target.value)}
                  placeholder="Add a service..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                />
                <Button type="button" onClick={addService} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {formData.certifications?.map((cert, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {cert}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeCertification(index)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newCertification}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCertification(e.target.value)}
                  placeholder="Add a certification..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                />
                <Button type="button" onClick={addCertification} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving} className="min-w-32">
                {isSaving ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};