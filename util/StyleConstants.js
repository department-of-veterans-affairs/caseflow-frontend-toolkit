import { css } from 'glamor';

export const COLORS = {
  PRIMARY_ALT: '#02bfe7',

  GREY_LIGHT: '#d6d7d9',
  GREY_MEDIUM: '#757575',
  GREY_DARK: '#323a45',

  WHITE: '#fff'
};

export const LOGO_COLORS = {
  READER: {
    ACCENT: '#417505',
    OVERLAP: '#2D5104'
  },
  INTAKE: {
    ACCENT: '#FFCC4E',
    OVERLAP: '#CA9E00'
  },
  DISPATCH: {
    ACCENT: '#844e9f',
    OVERLAP: '#7a4b91'
  },
  HEARINGS: {
    ACCENT: '#56b605',
    OVERLAP: COLORS.GREY_LIGHT
  },
  CERTIFICATION: {
    ACCENT: '#459FD7',
    OVERLAP: COLORS.GREY_LIGHT
  },
  DEFAULT: {
    ACCENT: COLORS.GREY_DARK,
    OVERLAP: COLORS.GREY_LIGHT
  }
};

export const STYLES = {
  APPLICATION_TITLE: css({
    color: COLORS.GREY_MEDIUM
  })
};
