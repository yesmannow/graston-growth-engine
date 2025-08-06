import { FullProviderProfile } from "@/types";

export const mockProviders: FullProviderProfile[] = [
  {
    id: "1",
    name: "Dr. Alice Smith",
    specialty: "Physical Therapist",
    location: "New York, NY",
    bio: "Dr. Smith is a board-certified physical therapist with over 15 years of experience caring for patients. She is passionate about preventative care and building strong relationships with families.",
    profileImage: "https://via.placeholder.com/150/FF5733/FFFFFF?text=AS",
    tier: "Premier",
    trainingLevel: "GTS",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    contactInfo: {
      phone: "555-123-4567",
      email: "alice.smith@example.com",
      website: "https://www.alicesmithpt.com",
    },
    servicesOffered: ["Well-child visits", "Vaccinations", "Sick visits", "Developmental screenings"],
    galleryImages: [
      "https://via.placeholder.com/400/FF5733/FFFFFF?text=Clinic+1",
      "https://via.placeholder.com/400/FF5733/FFFFFF?text=Clinic+2",
    ],
    testimonials: [
      { quote: "Dr. Smith is amazing with my kids!", author: "Parent A" },
      { quote: "Always thorough and caring.", author: "Parent B" },
    ],
    faqs: [
      { question: "Do you accept new patients?", answer: "Yes, we are currently accepting new patients." },
      { question: "What are your office hours?", answer: "Monday-Friday, 9 AM - 5 PM." },
    ],
  },
  {
    id: "2",
    name: "Dr. Bob Johnson",
    specialty: "Chiropractor",
    location: "Los Angeles, CA",
    bio: "Dr. Johnson provides comprehensive chiropractic care, from routine adjustments to specialized treatments. He is committed to making every patient's visit comfortable and stress-free.",
    profileImage: "https://via.placeholder.com/150/3366FF/FFFFFF?text=BJ",
    tier: "Preferred",
    trainingLevel: "Advanced",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    contactInfo: {
      phone: "555-987-6543",
      email: "bob.johnson@example.com",
      website: "https://www.bobjohnsondental.com",
    },
    servicesOffered: ["Cleanings", "Fillings", "Crowns", "Teeth whitening"],
    galleryImages: [
      "https://via.placeholder.com/400/3366FF/FFFFFF?text=Office+1",
      "https://via.placeholder.com/400/3366FF/FFFFFF?text=Office+2",
    ],
    testimonials: [
      { quote: "Best chiropractor I've ever had!", author: "Patient C" },
      { quote: "Painless and professional.", author: "Patient D" },
    ],
    faqs: [
      { question: "Do you offer emergency appointments?", answer: "Yes, please call our office for urgent care." },
      { question: "What insurance do you accept?", answer: "We accept most major dental insurance plans." },
    ],
  },
  {
    id: "3",
    name: "Dr. Carol White",
    specialty: "Sports Medicine Physician",
    location: "Chicago, IL",
    bio: "Dr. White specializes in sports medicine, helping athletes and active individuals recover from injuries and optimize performance. She offers personalized treatment plans for various conditions.",
    profileImage: "https://via.placeholder.com/150/33FF57/FFFFFF?text=CW",
    tier: "Free",
    trainingLevel: "Essential",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    contactInfo: {
      phone: "555-555-1212",
      email: "carol.white@example.com",
      website: "https://www.carolwhitesportsmed.com",
    },
    servicesOffered: ["Acne treatment", "Skin cancer screenings", "Botox", "Fillers"],
    galleryImages: [
      "https://via.placeholder.com/400/33FF57/FFFFFF?text=Clinic+Interior",
      "https://via.placeholder.com/400/33FF57/FFFFFF?text=Treatment+Room",
    ],
    testimonials: [
      { quote: "My skin has never looked better!", author: "Patient E" },
      { quote: "Very knowledgeable and kind.", author: "Patient F" },
    ],
    faqs: [
      { question: "Do you treat pediatric skin conditions?", answer: "Yes, we see patients of all ages." },
      { question: "What is your cancellation policy?", answer: "Please notify us 24 hours in advance for cancellations." },
    ],
  },
  {
    id: "4",
    name: "Dr. David Green",
    specialty: "Physical Therapist",
    location: "Houston, TX",
    bio: "Dr. Green is a leading physical therapist dedicated to providing exceptional care. He focuses on preventive strategies and advanced treatments for musculoskeletal conditions.",
    profileImage: "https://via.placeholder.com/150/FF33CC/FFFFFF?text=DG",
    tier: "Premier",
    trainingLevel: "GTS",
    coordinates: { lat: 29.7604, lng: -95.3698 },
    contactInfo: {
      phone: "555-777-8888",
      email: "david.green@example.com",
      website: "https://www.davidgreenpt.com",
    },
    servicesOffered: ["Cardiac evaluations", "Stress tests", "Echocardiograms", "Hypertension management"],
    galleryImages: [
      "https://via.placeholder.com/400/FF33CC/FFFFFF?text=Heart+Center",
      "https://via.placeholder.com/400/FF33CC/FFFFFF?text=Consultation+Room",
    ],
    testimonials: [
      { quote: "Dr. Green saved my life!", author: "Patient G" },
      { quote: "Highly recommend for heart health.", author: "Patient H" },
    ],
    faqs: [
      { question: "Do you perform surgeries?", answer: "No, we focus on diagnostic and non-invasive treatments." },
      { question: "How often should I get a check-up?", answer: "It depends on your risk factors; consult with us." },
    ],
  },
  {
    id: "5",
    name: "Dr. Emily Brown",
    specialty: "Chiropractor",
    location: "Miami, FL",
    bio: "Dr. Brown helps patients recover from injuries and improve mobility through personalized chiropractic programs. She emphasizes active recovery and patient education.",
    profileImage: "https://via.placeholder.com/150/33CCFF/FFFFFF?text=EB",
    tier: "Preferred",
    trainingLevel: "Advanced",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    contactInfo: {
      phone: "555-222-3333",
      email: "emily.brown@example.com",
      website: "https://www.emilybrownchiro.com",
    },
    servicesOffered: ["Rehabilitation", "Pain management", "Sports injury therapy", "Post-surgical recovery"],
    galleryImages: [
      "https://via.placeholder.com/400/33CCFF/FFFFFF?text=Therapy+Gym",
      "https://via.placeholder.com/400/33CCFF/FFFFFF?text=Exercise+Area",
    ],
    testimonials: [
      { quote: "I'm back on my feet thanks to Dr. Brown!", author: "Patient I" },
      { quote: "Very supportive and effective therapy.", author: "Patient J" },
    ],
    faqs: [
      { question: "Do you need a referral?", answer: "Some insurance plans require a referral; please check with your provider." },
      { question: "What should I wear to my appointment?", answer: "Comfortable clothing that allows for movement." },
    ],
  },
];