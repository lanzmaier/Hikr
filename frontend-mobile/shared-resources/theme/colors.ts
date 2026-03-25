export const Colors = {
  // Brand colors (from mobile design template)
  primary: '#13ec13',
  primaryDark: '#0db80d',
  primaryMuted: 'rgba(19, 236, 19, 0.2)',

  // Dark backgrounds
  backgroundDark: '#102210',
  cardDark: '#193319',
  inputDark: 'rgba(13, 26, 13, 0.5)',

  // Borders
  borderDark: '#326732',
  borderWhiteTransparent: 'rgba(255, 255, 255, 0.1)',
  borderWhiteLight: 'rgba(255, 255, 255, 0.2)',

  // Text
  textWhite: '#ffffff',
  textMuted: '#92c992',
  textPlaceholder: 'rgba(146, 201, 146, 0.5)',
  textSlate: '#94a3b8',

  // Light backgrounds (unused in dark mode, kept for flexibility)
  backgroundLight: '#f6f8f6',

  // Semantic
  error: '#f87171',
  errorBackground: 'rgba(248, 113, 113, 0.15)',
  success: '#4ade80',
  warning: '#facc15',

  // Overlays
  black50: 'rgba(0, 0, 0, 0.5)',
  dark90: 'rgba(16, 34, 16, 0.9)',
  glassBg: 'rgba(16, 34, 16, 0.85)',
  white05: 'rgba(255, 255, 255, 0.05)',
  white10: 'rgba(255, 255, 255, 0.1)',
} as const;

export const FontFamily = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
