import React from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from './DropdownMenu';
import Link from './Link';
import Breadcrumbs from './Breadcrumbs';
import CaseflowLogo from './CaseflowLogo';
import { css } from 'glamor';
import { COLORS, STYLES } from '../util/StyleConstants';
import getAppWidthStyling from './util/getAppWidthStyling';

const lineHeight = { lineHeight: '4em' };

const h1Styling = css({
  margin: 0,
  display: 'inline-block',
  fontSize: '1.7rem',
  ...lineHeight,
  '& > a': {
    color: `${COLORS.GREY_DARK} !important`,
    paddingLeft: '.3em'
  }
});

const pushLeftStyling = css({
  display: 'flex',
  alignItems: 'center',
  ...lineHeight
});

const headerStyling = css({
  background: COLORS.WHITE,
  ...lineHeight
});

const clearingDivStyling = css({
  borderBottom: `1px solid ${COLORS.GREY_LIGHT}`,
  clear: 'both'
});

const topMessageStyling = css({
  marginBottom: 0
});

export default class NavigationBar extends React.Component {
  render() {
    const {
      appName,
      defaultUrl,
      dropdownUrls,
      topMessage,
      logoProps,
      wideApp,
      userDisplayName
    } = this.props;

    return <div>
      <header {...headerStyling}>
        <div>
          <div {...getAppWidthStyling(wideApp)}>
            <span className="cf-push-left" {...pushLeftStyling}>
              <CaseflowLogo {...logoProps} />
              <h1 {...h1Styling}>
                <Link id="cf-logo-link" to={defaultUrl}>
                  Caseflow
                  <h2 id="page-title" className="cf-application-title" {...STYLES.APPLICATION_TITLE}>
                    &nbsp; {appName}
                  </h2>
                </Link>
              </h1>
              <Breadcrumbs>
                {this.props.children}
              </Breadcrumbs>
              {topMessage && <h2 className="cf-application-title" {...STYLES.APPLICATION_TITLE} {...topMessageStyling}>
                 &nbsp; | &nbsp; {topMessage}
              </h2>}
            </span>
            <span className="cf-push-right">
              <DropdownMenu
                analyticsTitle={`${appName} Navbar`}
                options={dropdownUrls}
                onClick={this.handleMenuClick}
                onBlur={this.handleOnBlur}
                label={userDisplayName}
              />
            </span>
          </div>
        </div>
        <div {...clearingDivStyling}> </div>
      </header>
      {this.props.children}
    </div>;
  }
}

NavigationBar.defaultProps = {
  extraBanner: null
};

NavigationBar.propTypes = {
  dropdownUrls: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    target: PropTypes.string
  })),
  extraBanner: PropTypes.element,
  defaultUrl: PropTypes.string.isRequired,
  userDisplayName: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired
};
