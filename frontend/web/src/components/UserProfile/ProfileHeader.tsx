import { useTheme } from "theme/ThemeContext";
import { useResponsive } from "utils/responsive/responsive";
import * as S from '../../styles/components/UserProfile/styles';
import { User } from "types/user";

interface ProfileHeaderProps {
    user: User;
  }

  export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    const { theme } = useTheme();
    const responsive = useResponsive();

    return (
      <S.BannerContainer>
        <S.BannerImage src={user.bannerUrl} alt="Profile banner" />
        <S.BannerOverlay />
        <S.UserInfoSection>
          <S.Avatar src={user.avatarUrl} alt={user.name} />
          <S.UserInfo>
            <S.UserName>{user.name}</S.UserName>
            <S.UserBio>{user.bio}</S.UserBio>
          </S.UserInfo>
          <S.Button variant="primary">Follow</S.Button>
        </S.UserInfoSection>
      </S.BannerContainer>
    );
  };