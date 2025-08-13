import { Stethoscope, Zap, ShieldCheck, Clock, Pill, Users } from 'lucide-react';

export const benefits = [
  {
    icon: Zap,
    title: "Faster Recovery",
    description: "Helps you return to your daily activities sooner by addressing the root cause of your pain.",
  },
  {
    icon: Clock,
    title: "Reduces Treatment Time",
    description: "Achieve significant results in fewer sessions compared to many traditional therapies.",
  },
  {
    icon: Pill,
    title: "Less Need for Medication",
    description: "Reduces or eliminates the need for anti-inflammatory medication by treating soft tissue fibrosis.",
  },
  {
    icon: Stethoscope,
    title: "Resolves Chronic Issues",
    description: "Often effective for conditions once thought to be permanent, offering long-term relief.",
  },
  {
    icon: ShieldCheck,
    title: "Non-Invasive",
    description: "A safe and effective treatment that works with your body's natural healing processes.",
  },
  {
    icon: Users,
    title: "Trusted by Professionals",
    description: "Used by thousands of clinicians worldwide, including professional and amateur sports teams.",
  },
];

export const conditions = [
  { name: "Plantar Fasciitis", description: "Effective for heel pain by breaking down scar tissue in the plantar fascia." },
  { name: "Tennis Elbow", description: "Targets adhesions in the forearm extensors to relieve lateral elbow pain." },
  { name: "Back Pain", description: "Addresses myofascial restrictions in the lumbar region to improve mobility and reduce pain." },
  { name: "Carpal Tunnel Syndrome", description: "Helps release restrictions around the median nerve to alleviate symptoms." },
  { name: "Neck Pain", description: "Treats soft tissue restrictions in the cervical spine to restore range of motion." },
  { name: "Shin Splints", description: "Focuses on the muscles and fascia of the lower leg to reduce pain from overuse." },
  { name: "Rotator Cuff Tendinosis", description: "Aids in breaking down fibrotic tissue in the shoulder to improve function." },
  { name: "Scar Tissue", description: "Reduces the restrictive effects of post-surgical or post-injury scar tissue." },
];

export const timelineSteps = [
    { title: "Consultation & Assessment", description: "Your clinician will discuss your symptoms and goals, and assess the area to identify the source of your pain." },
    { title: "Warm-Up", description: "A brief warm-up of the tissue will be performed to prepare the area for treatment." },
    { title: "Treatment", description: "Your clinician will use specially designed Graston Technique® instruments to detect and treat fascial restrictions and scar tissue." },
    { title: "Post-Treatment", description: "The session concludes with stretching and strengthening exercises to promote proper healing and alignment of the tissue." },
];

export const testimonials = [
    {
        name: "Sarah K.",
        condition: "Plantar Fasciitis",
        text: "After months of debilitating heel pain, Graston Technique was a game-changer. I was back to running in just a few weeks. I can't recommend it enough!",
    },
    {
        name: "Mike R.",
        condition: "Tennis Elbow",
        text: "I thought I'd have to give up golf for good. GT got me back on the course pain-free. The process was intense but incredibly effective.",
    },
    {
        name: "Jessica L.",
        condition: "Chronic Back Pain",
        text: "Nothing else worked for my lower back pain. The relief I felt after the first few Graston sessions was unbelievable. It gave me my life back.",
    },
];