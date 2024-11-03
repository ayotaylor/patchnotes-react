import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme/types';
import { getResponsiveValue } from '../../../utils/responsive/responsive';
import { useResponsive } from '../../../utils/responsive/responsive';

export const createStyles = (theme: Theme) => {
  const { breakpoint } = useResponsive();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.main,
    },
    scrollView: {
      flex: 1,
    },
    bannerContainer: {
      position: 'relative',
      height: getResponsiveValue({
        base: theme.spacing.xxl * 3,
        md: theme.spacing.xxl * 4,
      }, breakpoint),
    },
    bannerImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    gradientOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: theme.spacing.xxl,
    },
    profileInfoContainer: {
      marginTop: -theme.spacing.xxl,
      padding: theme.spacing.md,
    },
    avatarContainer: {
      marginBottom: theme.spacing.md,
      alignItems: 'center',
    },
    avatar: {
      width: theme.spacing.xxl * 2,
      height: theme.spacing.xxl * 2,
      borderRadius: theme.spacing.xxl,
      borderWidth: 4,
      borderColor: theme.colors.background.main,
    },
    userInfo: {
      alignItems: 'center',
    },
    userName: {
      fontSize: theme.typography.fontSize.xxl,
      fontWeight: theme.typography.fontWeight.bold.toString() as '700',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    userBio: {
      fontSize: theme.typography.fontSize.md,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      paddingHorizontal: theme.spacing.md,
    },
    followButton: {
      backgroundColor: theme.colors.primary.main,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.spacing.sm,
      marginTop: theme.spacing.md,
    },
    followButtonText: {
      color: theme.colors.primary.contrast,
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.medium.toString() as '500',
    },
    statsContainer: {
      backgroundColor: theme.colors.background.paper,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.border.light,
      marginTop: theme.spacing.lg,
    },
    statsContent: {
      flexDirection: 'row' as const,
      justifyContent: 'space-around',
      paddingVertical: theme.spacing.lg,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold.toString() as '700',
      color: theme.colors.text.primary,
    },
    statLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
    },
    tabsContainer: {
      backgroundColor: theme.colors.background.paper,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.light,
    },
    tabScroll: {
      flexDirection: 'row' as const,
    },
    tab: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderBottomWidth: 2,
    },
    tabActive: {
      borderBottomColor: theme.colors.primary.main,
    },
    tabInactive: {
      borderBottomColor: 'transparent',
    },
    tabText: {
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.medium.toString() as '500',
    },
    tabTextActive: {
      color: theme.colors.primary.main,
    },
    tabTextInactive: {
      color: theme.colors.text.secondary,
    },
    contentContainer: {
      padding: theme.spacing.md,
    },
  });
};