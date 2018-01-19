import { css } from 'glamor';

export default (wideApp) => {
  const widthVW = wideApp ? 85 : 75;

  return css({
    marginLeft: 'auto',
    marginRight: 'auto',
    width: `${widthVW}vw`
  });
};
