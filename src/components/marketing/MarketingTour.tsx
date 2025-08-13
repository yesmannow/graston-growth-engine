import Joyride, { Step, CallBackProps } from 'react-joyride';
import { Tier } from '@/types';

interface MarketingTourProps {
  run: boolean;
  userTier: Tier;
  onTourEnd: () => void;
}

const MarketingTour = ({ run, userTier, onTourEnd }: MarketingTourProps) => {
  const baseSteps: Step[] = [
    {
      target: '#tour-step-1-assets',
      content: 'Welcome to your Marketing Toolkit! Here you can find brand assets like logos and templates to use in your own marketing.',
      disableBeacon: true,
    },
  ];

  const premierSteps: Step[] = [
    ...baseSteps,
    {
      target: '#tour-step-2-content-ai',
      content: 'As a Premier member, you have access to our powerful AI Content Generator. Create social media posts, blog ideas, and more!',
    },
    {
      target: '#tour-step-3-campaigns',
      content: 'Launch pre-built marketing campaigns with our Campaign-in-a-Box feature. All the assets you need are ready to go.',
    },
    {
      target: '#tour-step-4-reputation',
      content: 'Easily request reviews from your patients with the Reputation Management Suite to build your online presence.',
    },
    {
      target: '#tour-step-5-calendar',
      content: 'Finally, use the Content Calendar to plan and schedule your marketing activities to stay consistent.',
    },
  ];

  const steps = userTier === 'Premier' ? premierSteps : baseSteps;

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = ['finished', 'skipped'];

    if (finishedStatuses.includes(status)) {
      onTourEnd();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#2563eb',
          zIndex: 1000,
        },
      }}
    />
  );
};

export default MarketingTour;