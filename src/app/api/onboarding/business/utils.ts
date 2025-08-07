import { PricingModel } from "../../../../../prisma/generated/client";

export const pricingModelDisplayValues = [
  "Hourly",
  "Per Job",
  "Per SqFt",
  "Per Room",
] as const;

export const mapPricingModelStringToEnum = (
  modelString: string
): PricingModel => {
  switch (modelString) {
    case "Hourly":
      return PricingModel.HOUR;
    case "Per Job":
      return PricingModel.JOB;
    case "Per SqFt":
      return PricingModel.SQFT;
    case "Per Room":
      return PricingModel.ROOM;
    default:
      throw new Error(`Invalid pricing model string: ${modelString}`);
  }
};

export const mapPricingModelEnumToString = (
  enumValue: PricingModel
): (typeof pricingModelDisplayValues)[number] => {
  switch (enumValue) {
    case PricingModel.HOUR:
      return "Hourly";
    case PricingModel.SQFT:
      return "Per SqFt";
    case PricingModel.ROOM:
      return "Per Room";
    case PricingModel.JOB:
      return "Per Job";
    default:
      throw new Error(`Unknown PricingModel enum value: ${enumValue}`);
  }
};

export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function transformCoreServiceForForm(coreService: {
  id: string;
  businessId: string;
  name: string;
  description: string;
  durationMin: number;
  durationMax: number;
  typicalCleanersAssigned: number;
  pricingModel: PricingModel;
  priceMin: number;
  priceMax: number;
  rate: number;
  createdAt: Date;
  updatedAt: Date;
}): {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  durationMax: number;
  typicalCleanersAssigned: number;
  pricingModel: (typeof pricingModelDisplayValues)[number];
  priceMin: number;
  priceMax: number;
  rate: number;
} {
  const displayPricingModel = mapPricingModelEnumToString(
    coreService.pricingModel
  );

  return {
    id: coreService.id,
    name: coreService.name,
    description: coreService.description,
    durationMin: coreService.durationMin,
    durationMax: coreService.durationMax,
    typicalCleanersAssigned: coreService.typicalCleanersAssigned,
    pricingModel: displayPricingModel,
    priceMin: coreService.priceMin,
    priceMax: coreService.priceMax,
    rate: coreService.rate,
  };
}
