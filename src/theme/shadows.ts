import { ViewStyle } from 'react-native';

export const shadows: Record<string, ViewStyle> = {
  subtle: {
    shadowColor: 'rgba(15,35,70,1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 4,
  },
  floating: {
    shadowColor: 'rgba(15,35,70,1)',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.14,
    shadowRadius: 40,
    elevation: 8,
  },
};
