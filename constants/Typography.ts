import { TextStyle } from 'react-native';

type TypographyTokens = {
  [key: string]: TextStyle;
};

export const Typography: TypographyTokens = {
  'heading-lg-bold': { 
    fontSize: 24, 
    fontWeight: 'bold',
    lineHeight: 29,
  },
  'heading-md-semibold': { 
    fontSize: 20, 
    fontWeight: '600',
    lineHeight: 24,
  },
  'body-md-regular': { 
    fontSize: 16, 
    fontWeight: '400',
    lineHeight: 24,
  },
  'body-sm-regular': { 
    fontSize: 14, 
    fontWeight: '400',
    lineHeight: 21,
  },
  'button-md': { 
    fontSize: 16, 
    fontWeight: '500',
    lineHeight: 24,
  },
  'caption-sm': { 
    fontSize: 12, 
    fontWeight: '300',
    lineHeight: 16,
  },
};

export default Typography;