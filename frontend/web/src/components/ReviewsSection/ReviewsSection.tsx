import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Review, ReviewsSectionProps } from 'types/reviews';
import * as S from './styles';
import { LoadingState } from 'components/LoadingState/LoadingState';

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onReviewClick,
  onLikeClick,
  isLoading
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <S.ReviewsContainer>
      {reviews.map((review, index) => (
        <ReviewCard
          key={review.id}
          review={review}
          index={index}
          onClick={() => onReviewClick(review)}
          onLike={() => onLikeClick(review.id)}
        />
      ))}
    </S.ReviewsContainer>
  );
};

interface ReviewCardProps {
  review: Review;
  index: number;
  onClick: () => void;
  onLike: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  index,
  onClick,
  onLike
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLike();
  };

  return (
    <S.ReviewCard
      ref={ref}
      onClick={onClick}
      animate={inView}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <S.ReviewHeader>
        <S.GameInfo>
          <S.GameCover src={review.game.coverUrl} alt={review.game.title} />
          <S.GameTitle>{review.game.title}</S.GameTitle>
        </S.GameInfo>
        <S.Rating rating={review.rating}>{review.rating}/10</S.Rating>
      </S.ReviewHeader>

      <S.ReviewContent>
        {review.content}
      </S.ReviewContent>

      <S.ReviewFooter>
        <S.InteractionButton
          onClick={handleLike}
          active={isLiked}
        >
          <Heart size={20} />
          {review.likes}
        </S.InteractionButton>

        <S.InteractionButton>
          <MessageCircle size={20} />
          {review.comments}
        </S.InteractionButton>

        <S.InteractionButton>
          <Share2 size={20} />
          Share
        </S.InteractionButton>
      </S.ReviewFooter>
    </S.ReviewCard>
  );
};