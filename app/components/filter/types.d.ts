interface PaginationProps {
    totalPages: number;
    currentPage: number;
  }
  
  export interface RatingItem {
    id: string;
    title: string;
    explanationText: string;
    rating: number;
    slug: string;
    ratedBy: string;
    metaDataDescription: string;
  }
  
  export interface PaginatedRatingItems {
    items: RatingItem[];
    totalPages: number;
  }