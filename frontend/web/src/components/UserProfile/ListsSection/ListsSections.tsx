import React, { useState } from 'react';
import { useTheme } from '../../../theme/ThemeContext';
import { useInView } from 'react-intersection-observer';
import type { List } from 'types/list'
import * as S from './styles';

interface ListsSectionProps {
  lists: List[];
  onListClick?: (list: List) => void;
}

export const ListsSection: React.FC<ListsSectionProps> = ({
  lists,
  onListClick
}) => {
  return (
    <S.ListsContainer>
      {lists.map(list => (
        <ListCard
          key={list.id}
          list={list}
          onClick={() => onListClick?.(list)}
        />
      ))}
    </S.ListsContainer>
  );
};

interface ListCardProps {
  list: List;
  onClick?: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ list, onClick }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <S.ListCard ref={ref} onClick={onClick}>
      <S.ListHeader>
        <S.ListTitle>{list.title}</S.ListTitle>
        <S.ListDescription>{list.description}</S.ListDescription>
      </S.ListHeader>

      <S.GamePreviewGrid>
        {list.games.slice(0, 4).map(game => (
          <S.GamePreview key={game.id}>
            <S.GamePreviewImage
              src={game.cover}
              alt={game.name}
              loading="lazy"
            />
          </S.GamePreview>
        ))}
      </S.GamePreviewGrid>

      <S.ListMeta>
        <span>{list.games.length} games</span>
        <span>{new Date(list.updatedAt).toLocaleDateString()}</span>
      </S.ListMeta>
    </S.ListCard>
  );
};