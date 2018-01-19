import { css } from 'glamor';

export default (wideApp) => {
  const width = wideApp === 'full' ? '100%' : `${wideApp ? 85 : 75}vw`;

  return css({
    marginLeft: 'auto',
    marginRight: 'auto',
    width
  });
};
