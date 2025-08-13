import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FullProviderProfile, Tier } from '@/types';
import { getAllProviders } from '@/lib/providers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import TierBadge from '@/components/TierBadge';

const ComparePage = () => {
  const [searchParams] = useSearchParams();
  const [providersToCompare, setProvidersToCompare] = useState<FullProviderProfile[]>([]);

  const allProviders = useMemo<FullProviderProfile[]>(() => {
    return getAllProviders();
  }, []);

  useEffect(() => {
    const ids = searchParams.get('ids')?.split(',') || [];
    const selected = allProviders.filter(p => ids.includes(p.id));
    setProvidersToCompare(selected);
  }, [searchParams, allProviders]);

  if (providersToCompare.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">No Providers Selected</h1>
        <p className="text-muted-foreground">Please go back to the directory to select providers to compare.</p>
        <Button asChild>
          <Link to="/directory">Back to Directory</Link>
        </Button>
      </div>
    );
  }

  const features = [
    { key: 'tier', label: 'Membership Tier' },
    { key: 'specialty', label: 'Specialty' },
    { key: 'rating', label: 'Rating' },
    { key: 'reviewCount', label: 'Reviews' },
    { key: 'languagesSpoken', label: 'Languages' },
    { key: 'conditionsTreated', label: 'Conditions Treated' },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Compare Providers ({providersToCompare.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] md:w-[200px] font-semibold">Feature</TableHead>
                  {providersToCompare.map(p => (
                    <TableHead key={p.id} className="w-[200px] md:w-[250px]">
                      <div className="flex flex-col items-center text-center gap-2">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={p.profileImage} />
                          <AvatarFallback>{p.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <Link to={`/directory/provider/${p.id}`} className="font-semibold text-base hover:underline">{p.name}</Link>
                        <p className="text-xs text-muted-foreground">{p.location}</p>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map(feature => (
                  <TableRow key={feature.key}>
                    <TableCell className="font-medium">{feature.label}</TableCell>
                    {providersToCompare.map(p => (
                      <TableCell key={p.id} className="text-center align-top">
                        {(() => {
                          const value = p[feature.key as keyof FullProviderProfile];
                          if (feature.key === 'tier') return <TierBadge tier={value as Tier} />;
                          if (feature.key === 'rating') return <div className="flex items-center justify-center gap-1">{typeof value === 'number' ? value.toFixed(1) : '0.0'} <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /></div>;
                          if (Array.isArray(value)) return <div className="flex flex-wrap gap-1 justify-center">{value.map((v, idx) => <Badge key={idx} variant="secondary">{String(v)}</Badge>)}</div>;
                          if (value) return String(value);
                          return <span className="text-muted-foreground">-</span>;
                        })()}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparePage;