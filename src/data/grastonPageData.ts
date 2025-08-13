import { Stethoscope, Zap, ShieldCheck, Clock, Pill, Users, Heart, Bone } from 'lucide-react';

export const instruments = [
  {
    name: "GT1: Scanner",
    description: "Used for scanning and detecting adhesions in broad areas of the body.",
    imageUrl: "/images/instrument-gt1.png"
  },
  {
    name: "GT2: Handlebar",
    description: "Designed for treating large muscle groups like the back, hamstrings, and quadriceps.",
    imageUrl: "/images/instrument-gt2.png"
  },
  {
    name: "GT3: Concave/Convex",
    description: "A versatile tool for treating both large and small muscle groups with its dual-sided design.",
    imageUrl: "/images/instrument-gt3.png"
  },
  {
    name: "GT4: Beak",
    description: "Ideal for targeting specific, smaller areas and deeper tissues.",
    imageUrl: "/images/instrument-gt4.png"
  },
  {
    name: "GT5: Boomerang",
    description: "Used for treating areas with significant contours, like the shoulder or foot.",
    imageUrl: "/images/instrument-gt5.png"
  },
  {
    name: "GT6: Pointed",
    description: "For precise treatment of small, specific adhesions, often in the hands or feet.",
    imageUrl: "/images/instrument-gt6.png"
  }
];

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

export const symptomCheckerQuestions = [
  {
    question: "How long have you been experiencing this issue?",
    options: ["Less than 2 weeks", "2-6 weeks", "More than 6 weeks (Chronic)"],
  },
  {
    question: "What best describes your pain?",
    options: ["Dull and achy", "Sharp and stabbing", "Stiffness and tightness", "Numbness or tingling"],
  },
  {
    question: "What treatments have you tried so far?",
    options: ["Rest and ice", "Stretching and exercise", "Medication", "Other therapies (e.g., massage, chiropractic)"],
  },
];

export const caseStudies = [
  {
    id: 'case-1',
    title: "Runner's Knee Recovery",
    patient: "Avid Marathon Runner, 34",
    problem: "Persistent pain around the kneecap (Patellofemoral Pain Syndrome) preventing long-distance running.",
    approach: "6 sessions of Graston Technique® focused on the quadriceps, IT band, and surrounding fascia, combined with a targeted strengthening program.",
    outcome: "Patient reported a 90% reduction in pain and successfully completed a half-marathon pain-free within 8 weeks.",
    before: {
      label: "Before",
      description: "Limited knee flexion, pain with squatting.",
      icon: Bone,
    },
    after: {
      label: "After",
      description: "Full range of motion, pain-free squatting.",
      icon: Heart,
    }
  },
  {
    id: 'case-2',
    title: "Restoring Shoulder Mobility",
    patient: "Office Worker, 45",
    problem: "Chronic shoulder stiffness and pain (Adhesive Capsulitis) from a previous injury, limiting daily activities.",
    approach: "A series of GT sessions to break down scar tissue in the shoulder capsule, paired with gentle range-of-motion exercises.",
    outcome: "Achieved nearly full range of motion, allowing the patient to return to recreational tennis and daily activities without pain.",
     before: {
      label: "Before",
      description: "Significant restriction in shoulder abduction.",
      icon: Bone,
    },
    after: {
      label: "After",
      description: "Restored mobility and function.",
      icon: Heart,
    }
  }
];