// NSBM Cricket Performance Management System - Design System
// Official NSBM Green University Branding

export const NSBM_DESIGN_SYSTEM = {
  // Brand Colors
  colors: {
    // Primary Brand Colors
    brandPrimary: '#2E7D32', // NSBM Green (official)
    brandSecondary: '#0D47A1', // NSBM Blue (official)
    brandAccent: '#FFC107', // NSBM Gold (accent)
    
    // Brand Color Variations
    brandPrimaryLight: '#4CAF50',
    brandPrimaryDark: '#1B5E20',
    brandSecondaryLight: '#1976D2',
    brandSecondaryDark: '#002171',
    brandAccentLight: '#FFD54F',
    brandAccentDark: '#F57F17',
    
    // Neutral Grayscale
    neutral900: '#212121',
    neutral800: '#424242',
    neutral700: '#616161',
    neutral600: '#757575',
    neutral500: '#9E9E9E',
    neutral400: '#BDBDBD',
    neutral300: '#E0E0E0',
    neutral200: '#EEEEEE',
    neutral100: '#F5F5F5',
    neutral50: '#FAFAFA',
    
    // Semantic Colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    // Background Colors
    backgroundPrimary: '#FFFFFF',
    backgroundSecondary: '#FAFAFA',
    backgroundTertiary: '#F5F5F5',
    
    // Text Colors
    textPrimary: '#212121',
    textSecondary: '#616161',
    textTertiary: '#9E9E9E',
    textInverse: '#FFFFFF',
    
    // Border Colors
    borderLight: '#E0E0E0',
    borderMedium: '#BDBDBD',
    borderDark: '#757575',
  },

  // Typography
  typography: {
    fontFamily: {
      primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing (8pt grid)
  spacing: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.5rem',  // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Z-Index
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Animation
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Cricket-specific Design Elements
  cricket: {
    // Cricket seam divider pattern
    seamPattern: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(46, 125, 50, 0.1) 2px, rgba(46, 125, 50, 0.1) 4px)',
    
    // Pitch stripe pattern
    pitchStripe: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(46, 125, 50, 0.04) 8px, rgba(46, 125, 50, 0.04) 16px)',
    
    // Micro-iconography
    icons: {
      bat: '🏏',
      ball: '⚾',
      wicket: '🏏',
      trophy: '🏆',
      medal: '🥇',
    },
  },
};

// Helper functions for design system usage
export const getBrandColor = (color, opacity = 1) => {
  const colorValue = NSBM_DESIGN_SYSTEM.colors[color] || color;
  if (opacity < 1) {
    const hex = colorValue.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return colorValue;
};

export const getSpacing = (size) => NSBM_DESIGN_SYSTEM.spacing[size] || size;
export const getRadius = (size) => NSBM_DESIGN_SYSTEM.borderRadius[size] || size;
export const getShadow = (size) => NSBM_DESIGN_SYSTEM.shadows[size] || size;
export const getFontSize = (size) => NSBM_DESIGN_SYSTEM.typography.fontSize[size] || size;
export const getFontWeight = (weight) => NSBM_DESIGN_SYSTEM.typography.fontWeight[weight] || weight;

// CSS Variables for easy integration
export const generateCSSVariables = () => {
  const variables = {};
  
  // Brand colors
  Object.entries(NSBM_DESIGN_SYSTEM.colors).forEach(([key, value]) => {
    variables[`--brand-${key}`] = value;
  });
  
  // Spacing
  Object.entries(NSBM_DESIGN_SYSTEM.spacing).forEach(([key, value]) => {
    variables[`--spacing-${key}`] = value;
  });
  
  // Border radius
  Object.entries(NSBM_DESIGN_SYSTEM.borderRadius).forEach(([key, value]) => {
    variables[`--radius-${key}`] = value;
  });
  
  // Shadows
  Object.entries(NSBM_DESIGN_SYSTEM.shadows).forEach(([key, value]) => {
    variables[`--shadow-${key}`] = value;
  });
  
  return variables;
};

export default NSBM_DESIGN_SYSTEM;


