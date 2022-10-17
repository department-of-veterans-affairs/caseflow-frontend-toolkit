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

const pStyling = css({
  margin: 0,
  display: 'inline-block',
  fontSize: '1.7rem',
  fontWeight: 900,
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
      applicationUrls,
      outsideCurrentRouter,
      topMessage,
      logoProps,
      rightNavElement,
      wideApp,
      userDisplayName
    } = this.props;

    let targetArgument = { to: defaultUrl };

    if (outsideCurrentRouter) {
      targetArgument = { href: defaultUrl };
    }

    return <div>
      <a class="skip-link" href="#Main">Skip to Content</a>
      <header {...headerStyling}>
        <div>
          <div {...getAppWidthStyling(wideApp)}>
            <nav className="cf-push-left" {...pushLeftStyling} >
              <p {...pStyling}>
                <Link id="cf-logo-link" {...targetArgument} title="Homepage" aria-label="Caseflow">
                  <CaseflowLogo {...logoProps} />
                  Caseflow
                </Link>
                {appName && <Link {...targetArgument}>
                  <span id="page-title" className="cf-application-title" {...STYLES.APPLICATION_TITLE}>
                    {appName}
                  </span>
                </Link>}
              </p>
              <Breadcrumbs>
                {this.props.children}
              </Breadcrumbs>
              {topMessage && <p className="cf-application-title" {...STYLES.APPLICATION_TITLE} {...topMessageStyling}>
                 &nbsp; | &nbsp; {topMessage}
              </p>}
              { applicationUrls &&
                <span>&nbsp; | &nbsp;
                  <DropdownMenu
                    analyticsTitle={`${appName} Switch App`}
                    options={applicationUrls.map((option) => {
                      return {
                        ...option,
                        title: <span><b>Caseflow</b> {option.title}</span>
                      };
                    })}
                    label="Switch product"
                  />
                </span>}
            </nav>
            <span className="cf-push-right">
              { rightNavElement && rightNavElement }
              <DropdownMenu
                analyticsTitle={`${appName} Navbar`}
                options={dropdownUrls}
                onClick={this.handleMenuClick}
                onBlur={this.handleOnBlur}
                label={userDisplayName}
                ariaLabel={`Logged in as ${userDisplayName}`}
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
  applicationUrls: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    target: PropTypes.string,
    border: PropTypes.bool
  })),
  dropdownUrls: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    target: PropTypes.string,
    border: PropTypes.bool
  })),
  extraBanner: PropTypes.element,
  defaultUrl: PropTypes.string,
  userDisplayName: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired
};
