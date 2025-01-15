export interface RatingItemInterface {
  title: string;
  slug: string;
  ratedBy: string;
  rating: number;
  explanationText: string;
  tags?: string[];
  id: string | number;
  coverImage?: any;
  shortText: string;
}
