import React from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from './DropdownMenu';
import Link from './Link';
import Breadcrumbs from './Breadcrumbs';
import CaseflowLogo from './CaseflowLogo';

import { COLORS, STYLES } from '../util/StyleConstants';
import getAppWidthStyling from './util/getAppWidthStyling';
import classnames from 'classnames';

const lineHeight = { lineHeight: '4em' };

const pStyling = {
  margin: 0,
  display: 'inline-block',
  fontSize: '1.7rem',
  fontWeight: 900,
  ...lineHeight,
  '& > a': {
    color: `${COLORS.GREY_DARK} !important`,
    paddingLeft: '.3em'
  }
};

const leftSpacing = {
  paddingLeft: '3rem'
};

const pushLeftStyling = {
  display: 'flex',
  alignItems: 'center',
  ...lineHeight
};

const headerStyling = {
  background: COLORS.WHITE,
  ...lineHeight
};

const clearingDivStyling = {
  borderBottom: `1px solid ${COLORS.GREY_LIGHT}`,
  clear: 'both'
};

const topMessageStyling = {
  marginBottom: 0
};

// eslint-disable-next-line no-process-env
const env = process.env.DEPLOY_ENV;

// eslint-disable-next-line no-process-env
const nodeEnv = process.env.NODE_ENV;


const className = classnames(
  {
    // eslint-disable-next-line no-undefined
    'dev-env-color': env !== 'prod' && nodeEnv === 'development',
    'prodtest-env-color': env !== 'prod' && nodeEnv !== 'development' && env === 'prodtest',
    'preprod-env-color': env !== 'prod' && nodeEnv !== 'development' && env === 'preprod',
    'uat-env-color': env !== 'prod' && nodeEnv !== 'development' && env === 'uat',
    'demo-env-color': env !== 'prod' && nodeEnv !== 'development' && env === 'demo',
  },
);

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
      <header style={headerStyling}>
        <div>
          <div {...getAppWidthStyling(wideApp)}>
            <nav className="cf-push-left" style={pushLeftStyling}>
              <Link {...targetArgument} tabIndex={0}>
              <p style={pStyling}>
                <Link id="cf-logo-link" {...targetArgument} tabIndex={-2} title="Homepage" aria-label="Caseflow">
                  <CaseflowLogo {...logoProps} />
                  Caseflow
                </Link>
                {appName && <Link {...targetArgument} tabIndex={-1}>
                  <span id="page-title" className="cf-application-title" {...STYLES.APPLICATION_TITLE} tabIndex={-1}>
                    {appName}
                  </span>
                </Link>}
              </p>
              </Link>
              <Breadcrumbs>
                {this.props.children}
              </Breadcrumbs>
              {topMessage && <p className="cf-application-title" {...STYLES.APPLICATION_TITLE} style={topMessageStyling}>
                &nbsp; | &nbsp; {topMessage}
              </p>}
              { applicationUrls &&
                <span>&nbsp; | &nbsp;
                  <DropdownMenu
                    analyticsTitle={`${appName} Switch App`}
                    options={applicationUrls.map((option) => {
                      return {
                        ...option,
                        title: <span><b>{option.prefix || 'Caseflow'}</b> {option.title}</span>
                      };
                    })}
                    label="Switch product"
                  />
                </span>}
            {/* Environment sticky badge */}
            {(env !== 'prod' && nodeEnv === 'development') && <span style={leftSpacing}><strong>Environment: <span className={className}>{nodeEnv}</span></strong></span>}
            {(env !== undefined && env !== 'prod' && nodeEnv !== 'development') && <span style={leftSpacing}><strong>Environment: <span className={className}>{env}</span></strong></span>}
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
        <div style={clearingDivStyling}> </div>
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
