import { FullProviderProfile } from "@/types";
import GbpHarmonizerCard from "./GbpHarmonizerCard";
import KeywordGeneratorCard from "./KeywordGeneratorCard";

interface LocalSeoTabProps {
  provider: FullProviderProfile;
}

const LocalSeoTab = ({ provider }: LocalSeoTabProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <GbpHarmonizerCard />
      <KeywordGeneratorCard provider={provider} />
    </div>
  );
};

export default LocalSeoTab;