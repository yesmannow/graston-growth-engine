import { FullProviderProfile, Language, SortOption } from "@/types";

export const mockProviders: FullProviderProfile[] = [];

export const languages = ["English", "Spanish", "French", "German", "Mandarin", "Arabic"] as Language[];

export const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California"
] as string[];

export const clinicianTypes = ["Chiropractor", "PT", "MT", "ATC"] as string[];

export const radiusOptions = [10, 25, 50, 100] as number[];

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "premier-first", label: "Premier First" },
  { value: "closest", label: "Closest" },
  { value: "top-rated", label: "Top Rated" },
  { value: "most-active", label: "Most Active" },
  { value: "most-reviewed", label: "Most Reviewed" },
];