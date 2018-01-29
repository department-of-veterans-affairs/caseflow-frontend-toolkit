import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import { Route } from 'react-router-dom';
import { STYLES } from '../util/StyleConstants';
import _ from 'lodash';

const getElementsWithBreadcrumbs = (element) => {
  const breadcrumbs = React.Children.toArray(element.props.children).reduce((acc, child) => {
    if (child.props.breadcrumb) {
      return [...acc, {
        path: child.props.path,
        breadcrumb: child.props.breadcrumb
      }];
    }

    return [...acc, ...getElementsWithBreadcrumbs(child)];
  }, []);

  return _.sortBy(breadcrumbs, ({ path }) => path.length);
};

// When passed a child component with Route or PageRoute objects that have
// breadcrumb properties set, this component will generate breadcrumbs as links
// to those other routes.
export default class Breadcrumbs extends React.Component {
  render() {
    const breadcrumbComponents = getElementsWithBreadcrumbs(this).map(
      (route) => <Route key={route.breadcrumb} path={route.path} render={
        (props) => <span {...STYLES.APPLICATION_TITLE}>
          <h2 id="page-title" className="cf-application-title">&nbsp; > &nbsp;</h2>
          <Link id="cf-logo-link" to={props.match.url}>
            <h2 id="page-title" className="cf-application-title">{route.breadcrumb}</h2>
          </Link>
        </span>
      } />
    );

    return <span>{breadcrumbComponents}</span>;
  }
}

Breadcrumbs.propTypes = {
  children: PropTypes.node
};
