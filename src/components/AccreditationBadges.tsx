import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Accreditation {
  name: string;
  logoUrl: string;
}

const accreditations: Accreditation[] = [
  { name: 'Graston Technique Specialist Certified', logoUrl: '/images/gtsCert-1.svg' },
  { name: 'M1 Trained', logoUrl: '/images/m1Trained.svg' },
  { name: 'M2 Certified', logoUrl: '/images/m2Cert.svg' },
];

const AccreditationBadges = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <TooltipProvider>
        {accreditations.map((acc) => (
          <Tooltip key={acc.name}>
            <TooltipTrigger asChild>
              <img
                src={acc.logoUrl}
                alt={acc.name}
                className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{acc.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default AccreditationBadges;