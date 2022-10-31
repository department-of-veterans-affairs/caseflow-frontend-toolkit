import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import { css } from 'glamor';
import getAppWidthStyling from './util/getAppWidthStyling';

const footerStyles = css({
  marginTop: '100px',
  minHeight: '5em',

  '& > div': {
    padding: '30px 0',
    height: 'auto'
  }
});

export default class Footer extends React.Component {
  onFeedbackClick = () => {
    window.analyticsEvent(this.props.appName, 'feedback', 'footer');
  }

  render() {
    const {
      wideApp,
      feedbackUrl
    } = this.props;

    return <footer className="cf-app-footer" {...footerStyles}>
      <div {...getAppWidthStyling(wideApp)}>
        <div className="cf-push-right">
          <Link
            href={feedbackUrl}
            target="_blank"
            onClick={this.onFeedbackClick}>Send feedback</Link>
        </div>
      </div>
    </footer>;
  }
}

Footer.propTypes = {
  appName: PropTypes.string.isRequired,
  buildDate: PropTypes.string,
  feedbackUrl: PropTypes.string.isRequired
};
