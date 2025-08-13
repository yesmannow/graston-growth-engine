import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Check, X, Info } from 'lucide-react';
import { featureComparison } from '@/data/forProvidersPageData';

const FeatureComparisonTable = () => {
  return (
    <section id="comparison" className="py-16 md:py-24 bg-muted/40">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">The Premier Difference</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the plan that best fits your practice's growth goals.
          </p>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Feature</TableHead>
                  <TableHead className="text-center">Free</TableHead>
                  <TableHead className="text-center">Preferred</TableHead>
                  <TableHead className="text-center bg-primary/5">Premier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {featureComparison.map((item) => (
                  <TableRow key={item.feature}>
                    <TableCell className="font-medium flex items-center gap-2">
                      {item.feature}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.free ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.preferred ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />}
                    </TableCell>
                    <TableCell className="text-center bg-primary/5">
                      {item.premier ? <Check className="h-5 w-5 text-primary mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell className="text-center p-4">
                    <Button variant="outline">Get Listed</Button>
                  </TableCell>
                  <TableCell className="text-center p-4">
                    <Button variant="secondary">Upgrade</Button>
                  </TableCell>
                  <TableCell className="text-center p-4 bg-primary/5">
                    <Button>Go Premier</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeatureComparisonTable;