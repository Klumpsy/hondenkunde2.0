export interface Partner {
  id: string;
  collectionId: string;
  collectionName: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  logo?: string;
  heroBanner?: string;
  promotionalImages?: string[];
  embeddedBannerImage?: string;
  affiliateUrl: string;
  ctaText?: string;
  secondaryUrl?: string;
  secondaryCtaText?: string;
  promoCode?: string;
  promoCodeLabel?: string;
  uspOne?: string;
  uspTwo?: string;
  uspThree?: string;
  metaDataDescription?: string;
  featured?: boolean;
  isActive?: boolean;
  order?: number;
}
