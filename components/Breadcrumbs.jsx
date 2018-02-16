import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import { Route } from 'react-router-dom';
import { STYLES } from '../util/StyleConstants';
import _ from 'lodash';

// When passed a child component with Route or PageRoute objects that have
// breadcrumb properties set, this will generate breadcrumbs as links to
// those other routes.
const getElementsWithBreadcrumbs = (element) => React.Children.toArray(element.props.children).
  reduce((acc, child) => {
    if (child.props.breadcrumb) {
      return [...acc, {
        path: child.props.path,
        breadcrumb: child.props.breadcrumb
      }];
    }

    return [...acc, ...getElementsWithBreadcrumbs(child)];
  }, []);

const getBreadcrumbLabel = (route) => <h2 id="page-title" className="cf-application-title">
  {route.breadcrumb}
</h2>;

export default class Breadcrumbs extends React.PureComponent {
  render = () => {
    const {
      styling,
      getElements,
      caretBeforeCrumb
    } = this.props;
    const children = getElements(this);
    const caret = <React.Fragment>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</React.Fragment>;

    const breadcrumbComponents = _.sortBy(children, ({ path }) => path.length).
      map((route, idx) =>
        <Route key={route.breadcrumb} path={route.path} render={(props) =>
          <React.Fragment>
            {caretBeforeCrumb && caret}
            <Link id="cf-logo-link" to={props.match.url} classNames={['cf-btn-link']}>
              {this.props.getBreadcrumbLabel(route)}
            </Link>
            {(!caretBeforeCrumb && idx + 1 < children.length) && caret}
          </React.Fragment>
        } />
      );

    return <div {...styling}>{breadcrumbComponents}</div>;
  };
}

Breadcrumbs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      path: PropTypes.string,
      breadcrumb: PropTypes.string
    })
  ]),
  styling: PropTypes.object,
  getElements: PropTypes.func,
  caretBeforeCrumb: PropTypes.bool
};

Breadcrumbs.defaultProps = {
  getBreadcrumbLabel,
  getElements: getElementsWithBreadcrumbs,
  caretBeforeCrumb: true,
  styling: STYLES.APPLICATION_TITLE
};
