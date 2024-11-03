import { Platform } from 'react-native';

export * from './types';

if (Platform.OS === 'web') {
  module.exports = require('./responsive.web');
} else {
  module.exports = require('./responsive.native');
}