// src/data/staticData.ts
// Static, hardcoded data sources for GymOrNot.com.
// No fetches, no CMS — just the truth, typed.

export type SpaceType = "tiny-apartment" | "bedroom" | "house";
export type EnergyLevel = "barely-alive" | "moderate" | "unhinged";
export type GearCategory =
  | "cardio"
  | "strength"
  | "mobility"
  | "recovery"
  | "bodyweight";

export interface GearItem {
  id: string;
  title: string;
  category: GearCategory;
  spaceType: SpaceType;
  energyLevel: EnergyLevel;
  priceEst: number;
  affiliateUrl: string;
  description: string;
}

export interface GymItem {
  id: string;
  brandName: string;
  trueCost: string;
  noticePeriod: string;
  method: string;
  crowdPeak: string;
  catchClause: string;
}

export const GEAR_ITEMS: GearItem[] = [
  {
    id: "gear-001",
    title: "Under-Desk Walking Pad",
    category: "cardio",
    spaceType: "tiny-apartment",
    energyLevel: "barely-alive",
    priceEst: 189,
    affiliateUrl: "https://example.com/gear/walking-pad",
    description:
      "Slides under a desk or a bed. Walk 2 miles during a conference call you weren't listening to anyway. Folds flat in nine seconds.",
  },
  {
    id: "gear-002",
    title: "Fabric Resistance Band Set (5-Level)",
    category: "strength",
    spaceType: "tiny-apartment",
    energyLevel: "barely-alive",
    priceEst: 32,
    affiliateUrl: "https://example.com/gear/resistance-bands",
    description:
      "Weighs less than a paperback and does more for your glutes than the machine at the gym you were scared to ask someone how to use.",
  },
  {
    id: "gear-003",
    title: "Adjustable Dumbbells (5–52.5 lb pair)",
    category: "strength",
    spaceType: "bedroom",
    energyLevel: "moderate",
    priceEst: 429,
    affiliateUrl: "https://example.com/gear/adjustable-dumbbells",
    description:
      "One dial replaces fifteen chunks of iron you don't have floor space for. Twist, lift, put it back before your roommate notices.",
  },
  {
    id: "gear-004",
    title: "4-in-1 Doorway Pull-Up Bar",
    category: "bodyweight",
    spaceType: "tiny-apartment",
    energyLevel: "moderate",
    priceEst: 45,
    affiliateUrl: "https://example.com/gear/pullup-bar",
    description:
      "No screws, no drilling, no landlord phone call. Wedges into any standard doorway and holds more of your excuses than your body weight.",
  },
  {
    id: "gear-005",
    title: "Foldable Yoga & Mobility Mat, 10mm",
    category: "mobility",
    spaceType: "tiny-apartment",
    energyLevel: "barely-alive",
    priceEst: 28,
    affiliateUrl: "https://example.com/gear/mobility-mat",
    description:
      "Ten minutes on the floor doing hip openers counts as movement. This is the mat. It also hides carpet stains, which is a bonus.",
  },
  {
    id: "gear-006",
    title: "Compact Power Rack (Wall-Mounted Fold-In)",
    category: "strength",
    spaceType: "house",
    energyLevel: "unhinged",
    priceEst: 899,
    affiliateUrl: "https://example.com/gear/power-rack",
    description:
      "Folds flush against the wall to 6 inches deep. Unfolds into a full squat rack for people who actually meant it when they said 'this year is different.'",
  },
  {
    id: "gear-007",
    title: "Vibrating Foam Roller",
    category: "recovery",
    spaceType: "bedroom",
    energyLevel: "barely-alive",
    priceEst: 79,
    affiliateUrl: "https://example.com/gear/foam-roller",
    description:
      "Lie on the floor, roll a sore muscle, feel productive. Genuinely one of the highest effort-to-smugness ratios in fitness.",
  },
  {
    id: "gear-008",
    title: "Suspension Trainer Kit (Door Anchor Included)",
    category: "bodyweight",
    spaceType: "bedroom",
    energyLevel: "moderate",
    priceEst: 59,
    affiliateUrl: "https://example.com/gear/suspension-trainer",
    description:
      "Two straps, one anchor, zero commute. A full-body gym that packs into a bag smaller than your gym bag currently sitting unopened in the closet.",
  },
  {
    id: "gear-009",
    title: "Kettlebell, Single 35 lb",
    category: "strength",
    spaceType: "house",
    energyLevel: "unhinged",
    priceEst: 65,
    affiliateUrl: "https://example.com/gear/kettlebell",
    description:
      "One heavy piece of cast iron shaped like a cannonball with a handle. Swing it in the backyard and terrify the neighbors into respecting you.",
  },
  {
    id: "gear-010",
    title: "Mini Stepper with Resistance Bands",
    category: "cardio",
    spaceType: "tiny-apartment",
    energyLevel: "barely-alive",
    priceEst: 69,
    affiliateUrl: "https://example.com/gear/mini-stepper",
    description:
      "Fits under a couch. Step for eight minutes during a TV episode and legally call it cardio. No one can stop you.",
  },
  {
    id: "gear-011",
    title: "Weighted Vest (20 lb, Adjustable)",
    category: "bodyweight",
    spaceType: "house",
    energyLevel: "unhinged",
    priceEst: 89,
    affiliateUrl: "https://example.com/gear/weighted-vest",
    description:
      "Turns a normal walk into 'rucking,' which sounds extreme enough that you'll actually tell people you did it.",
  },
  {
    id: "gear-012",
    title: "Compact Rowing Machine (Foldable)",
    category: "cardio",
    spaceType: "house",
    energyLevel: "moderate",
    priceEst: 349,
    affiliateUrl: "https://example.com/gear/rowing-machine",
    description:
      "Folds upright and rolls into a closet. Full-body cardio in the time it takes to find parking at the gym you're not going to.",
  },
];

export const GYM_ITEMS: GymItem[] = [
  {
    id: "gym-001",
    brandName: "PulseFit Signature",
    trueCost: "$44.99/mo + $89 'facility fee' billed every August, forever",
    noticePeriod: "60 days written notice, delivered in person, during staffed hours only",
    method: "EFT bank draft only — no card cancellations accepted by phone",
    crowdPeak: "5:30–7:30 PM weekdays, every rack occupied, every mirror contested",
    catchClause:
      "Auto-renews into a new 12-month term if cancellation isn't postmarked in the 5-day window before your anniversary date.",
  },
  {
    id: "gym-002",
    brandName: "IronCastle Athletic Club",
    trueCost: "$19.99/mo advertised, $59.99/mo once the 'starter rate' expires at month 4",
    noticePeriod: "30 days, must be submitted via certified mail to corporate HQ",
    method: "Credit card only; a declined card triggers a $25 late fee, not a pause",
    crowdPeak: "6:00–8:00 AM and 5:00–9:00 PM — there is no quiet hour",
    catchClause:
      "The 'starter rate' is a promotional teaser rate, not a locked price; the standard rate applies automatically with no renotification.",
  },
  {
    id: "gym-003",
    brandName: "MetroBox Fitness",
    trueCost: "$9.99/mo base, but the free-weight floor requires the $34.99 'Black' tier",
    noticePeriod: "In-person cancellation only, at the home location you originally joined",
    method: "Bank draft; card payments incur a 3% 'convenience surcharge'",
    crowdPeak: "Weekend mornings 9–11 AM turn the squat rack into a 40-minute queue",
    catchClause:
      "Cancelling requires presenting government ID at the original enrollment location — no exceptions for relocated members.",
  },
  {
    id: "gym-004",
    brandName: "Apex Performance Studios",
    trueCost: "$149/mo 'premium coaching' tier most walk-ins are upsold into on day one",
    noticePeriod: "90 days, and the final 2 months are billed regardless of attendance",
    method: "Auto-draft tied to a stored card; updating the card resets your contract clock",
    crowdPeak: "Every class slot within 2 hours of a 9-to-5 workday, booked out a week ahead",
    catchClause:
      "The 12-month agreement includes an early-termination fee equal to 50% of the remaining contract value.",
  },
  {
    id: "gym-005",
    brandName: "Highline Wellness Collective",
    trueCost: "$79/mo plus a mandatory $150 annual 'member enhancement' charge",
    noticePeriod: "45 days, and only accepted during the first 5 business days of a month",
    method: "EFT only; PayPal and cards are accepted for signup but not for cancellation refunds",
    crowdPeak: "Sauna and pool are functionally unusable after 6 PM on weekdays",
    catchClause:
      "Missing the 5-business-day cancellation window resets the clock and locks in another full billing month automatically.",
  },
];
