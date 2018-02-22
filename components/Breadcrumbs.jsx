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
  renderBreadcrumb = (props, route, idx) => {
    const { caretBeforeAllCrumbs } = this.props;
    const caret = <React.Fragment>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</React.Fragment>;
    const caretPositions = {
      before: caretBeforeAllCrumbs,
      after: !caretBeforeAllCrumbs && idx > 0
    };

    return <React.Fragment>
      {(caretPositions.before || caretPositions.after) && caret}
      <Link id="cf-logo-link" to={props.match.url} classNames={['cf-btn-link']}>
        {this.props.getBreadcrumbLabel(route)}
      </Link>
    </React.Fragment>;
  };

  render() {
    const {
      elements,
      styling
    } = this.props;
    const children = elements || getElementsWithBreadcrumbs(this);

    const breadcrumbComponents = _.sortBy(children, 'length').
      map((route, idx) =>
        <Route
          key={route.breadcrumb}
          path={route.path}
          render={(props) => this.renderBreadcrumb(props, route, idx)} />
      );

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
  caretBeforeAllCrumbs: PropTypes.bool
};

Breadcrumbs.defaultProps = {
  getBreadcrumbLabel,
  caretBeforeAllCrumbs: true,
  styling: STYLES.APPLICATION_TITLE
};
