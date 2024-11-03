export interface Review {
  id: string;
  gameId: string;
  userId: string;
  rating: number;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  game: {
    id: string;
    title: string;
    coverUrl: string;
  };
}

export interface ReviewsSectionProps {
  reviews: Review[];
  onReviewClick: (review: Review) => void;
  onLikeClick: (reviewId: string) => void;
  isLoading?: boolean;
}
