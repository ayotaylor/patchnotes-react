import * as S from '../../styles/components/UserProfile/styles';

interface TabNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
  }

  export const TabNavigation: React.FC<TabNavigationProps> = ({
    activeTab,
    onTabChange
  }) => {
    const tabs = [
      { id: 'games', label: 'Games' },
      { id: 'lists', label: 'Lists' },
      { id: 'reviews', label: 'Reviews' },
      { id: 'likes', label: 'Likes' },
      { id: 'following', label: 'Following' }
    ];

    return (
      <S.TabsContainer>
        <S.TabsList>
          {tabs.map(tab => (
            <S.Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </S.Tab>
          ))}
        </S.TabsList>
      </S.TabsContainer>
    );
  };