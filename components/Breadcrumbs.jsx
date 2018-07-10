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

const getBreadcrumbLabel = (route) => <h2 id="page-title" className="cf-application-title" >
  {route.breadcrumb}
</h2>;

export default class Breadcrumbs extends React.Component {
  renderBreadcrumbContent = (props, route, idx) => {
    const { shouldDrawCaretBeforeFirstCrumb } = this.props;
    const caret = <React.Fragment>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</React.Fragment>;

    return <React.Fragment>
      {(shouldDrawCaretBeforeFirstCrumb || idx > 0) && caret}
      <Link id="cf-logo-link" to={props.match.url} classNames={['cf-btn-link']} role="Breadcrumbs">
        {this.props.getBreadcrumbLabel(route)}
      </Link>
    </React.Fragment>;
  };

  getCrumb = (route, idx) => {
    if (this.props.renderAllCrumbs) {
      return <span key={route.breadcrumb}>
        {this.renderBreadcrumbContent({ match: { url: route.path } }, route, idx)}
      </span>;
    }

    return <Route
      key={route.breadcrumb}
      path={route.path}
      render={(props) => this.renderBreadcrumbContent(props, route, idx)} />;
  };

  render() {
    const {
      elements,
      styling
    } = this.props;
    const children = elements || getElementsWithBreadcrumbs(this);

    // When we're rendering breadcrumbs based on path then we want to sort by
    // path length to get the correct breadcrumb ordering. Otherwise we want the order
    // in which we push breadcrumbs.
    const breadcrumbComponents = this.props.renderAllCrumbs ?
      children.map(this.getCrumb) : _.sortBy(children, 'path.length').map(this.getCrumb);

    return <div {...styling}>{breadcrumbComponents}</div>;
  }
}

Breadcrumbs.propTypes = {
  children: PropTypes.node,
  elements: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    breadcrumb: PropTypes.string
  })),
  getBreadcrumbLabel: PropTypes.func,
  styling: PropTypes.object,
  shouldDrawCaretBeforeFirstCrumb: PropTypes.bool,
  renderAllCrumbs: PropTypes.bool
};

Breadcrumbs.defaultProps = {
  getBreadcrumbLabel,
  shouldDrawCaretBeforeFirstCrumb: true,
  styling: STYLES.APPLICATION_TITLE,
  renderAllCrumbs: false
};
