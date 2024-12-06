import styled from "styled-components/native";
import { Platform } from "react-native";

export const HeaderContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 1px;
      shadow-opacity: 0.1;
      shadow-radius: 2px;
    `,
    android: `
      elevation: 3;
    `,
  })}
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const UserAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

// Dashboard styles
export const DashboardContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-vertical: ${({ theme }) => theme.spacing.md};
`;

export const GameGridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-horizontal: -${({ theme }) => theme.spacing.xs};
`;

export const GameCard = styled.TouchableOpacity`
  width: 48%;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
  ${Platform.select({
    ios: `
      shadow-color: #000;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.1;
      shadow-radius: 3px;
    `,
    android: `
      elevation: 3;
    `,
  })}
`;

export const GameImage = styled.Image`
  width: 100%;
  aspect-ratio: 0.67;
`;

export const GameTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.sm};
`;
