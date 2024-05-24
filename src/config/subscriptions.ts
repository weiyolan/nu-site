export interface SubscriptionPlan {
  id: string;
  name: string;
  type?: string;
  description: string;
  stripePriceId: string;
  price: number;
  features: Array<string>;
}

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "pro",
    name: "Temp Abo",
    description: "Pro tier that offers x, y, and z features.",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? "",
    price: 1500,
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: "max",
    name: "Le Pack Total",
    type: "product",
    description: "Super Pro tier that offers x, y, and z features.",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_MAX_PRICE_ID ?? "",
    price: 4000,
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: "ultra",
    name: "Les Shampoings Nu",
    type: "product",
    description: "Ultra Pro tier that offers x, y, and z features.",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ULTRA_PRICE_ID ?? "",
    price: 2500,
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: "drizzle",
    name: "Nyx",
    type: "product",
    description: "One off drizzle product!",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PROD1_PRICE_ID ?? "",
    price: 1600,
    features: ["Featurezz 1", "Featurezz 2", "Featurezz 3"],
  },
  {
    id: "drizzle2",
    name: "Chaos",
    type: "product",
    description: "One off drizzle product!",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PROD2_PRICE_ID ?? "",
    price: 1600,
    features: ["Featurezz 1", "Featurezz 2", "Featurezz 3"],
  },
];
