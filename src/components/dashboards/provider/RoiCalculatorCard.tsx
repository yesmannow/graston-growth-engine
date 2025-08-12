import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { showError } from "@/utils/toast"; // Changed import

interface RoiResult {
  patients: number;
  revenue: string;
  roi: number;
  tierName: string;
}

const RoiCalculatorCard = () => {
  const [membershipCost, setMembershipCost] = useState('299');
  const [newPatients, setNewPatients] = useState('');
  const [patientValue, setPatientValue] = useState('');
  const [results, setResults] = useState<RoiResult | null>(null);

  const handleCalculate = () => {
    const numPatients = parseFloat(newPatients);
    const numPatientValue = parseFloat(patientValue);
    const numMembershipCost = parseInt(membershipCost, 10);

    if (isNaN(numPatients) || isNaN(numPatientValue) || numPatients <= 0 || numPatientValue <= 0) {
      showError('Please enter valid, positive numbers for patients and patient value.'); // Changed usage
      return;
    }

    const yearlyRevenue = numPatients * numPatientValue * 12;
    const roiMultiple = Math.round(yearlyRevenue / numMembershipCost);
    const selectedTierName = numMembershipCost === 129 ? 'Preferred Membership' : 'Premier Membership';

    setResults({
      patients: numPatients,
      revenue: Math.round(yearlyRevenue).toLocaleString(),
      roi: roiMultiple,
      tierName: selectedTierName,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculate Your Directory ROI</CardTitle>
        <CardDescription>Estimate your potential return on investment from a directory membership.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="membershipTier">1. Select Your Membership Tier</Label>
          <Select value={membershipCost} onValueChange={setMembershipCost}>
            <SelectTrigger id="membershipTier">
              <SelectValue placeholder="Select Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="129">Preferred Membership - $129/year</SelectItem>
              <SelectItem value="299">Premier Membership - $299/year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPatientsPerMonth">2. Estimated new patients per month from the directory?</Label>
          <Input id="newPatientsPerMonth" type="number" placeholder="e.g., 2" value={newPatients} onChange={(e) => setNewPatients(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="averagePatientValue">3. What is the average value of a new patient?</Label>
          <Input id="averagePatientValue" type="number" placeholder="e.g., 450" value={patientValue} onChange={(e) => setPatientValue(e.target.value)} />
        </div>
        
        <Button onClick={handleCalculate} className="w-full">Calculate My Potential ROI</Button>

        {results && (
          <div className="pt-4 mt-4 border-t text-center space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Gaining just <strong>{results.patients} new patients</strong> per month from the directory could generate an estimated <strong className="text-primary">${results.revenue}</strong> in new revenue per year.
              <br />
              For a <strong>{results.tierName}</strong> investment, that's a potential <strong className="text-primary">{results.roi}x return on investment</strong>.
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <a href="https://grastontechnique.com/preferred-provider-membership-free-trial/" target="_blank" rel="noopener noreferrer">
                Start Your Membership Trial
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoiCalculatorCard;