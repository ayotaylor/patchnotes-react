import {Dimensions} from 'react-native';

export const colors = {
  primary: '#10B981',
  background: {
    main: '#18181B',
    secondary: '#27272A',
    card: '#3F3F46',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A1A1AA',
    muted: '#71717A',
  },
  border: '#3F3F46',
};

export const metrics = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  bannerHeight: 200,
  avatarSize: 80,
};
