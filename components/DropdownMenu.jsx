import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import { css } from 'glamor';

// Lots of this class are taken from
// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

const dropdownMenuStyles = css({
  top: '3em',
  width: 'auto',
  minWidth: '13em',
  display: 'block'
});

const triggerStyles = css({
  '::after': {
    backgroundSize: '.75em'
  }
});

export default class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);

    this.wrapperRef = null;
    this.state = {
      menu: false
    };
  }

  componentDidMount = () => document.addEventListener('mousedown', this.onClickOutside);

  componentWillUnmount = () => document.removeEventListener('mousedown', this.onClickOutside);

  setWrapperRef = (node) => this.wrapperRef = node

  onClickOutside = (event) => {
    // event.composedPath() is [html, document, Window] when clicking the scroll bar and more when clicking content
    // this stops the menu from closing if a user clicks to use the scroll bar with the menu open
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) &&
      event.composedPath()[2] !== window && this.state.menu) {
      window.analyticsEvent(this.props.analyticsTitle, 'menu', 'blur');

      this.setState({
        menu: false
      });
    }
  }

  onClick = (title) => () => {
    window.analyticsEvent(this.props.analyticsTitle, title.toString().toLowerCase());
  }

  onMenuClick = () => {
    window.analyticsEvent(this.props.analyticsTitle, 'menu', this.state.menu ? 'close' : 'open');

    this.setState((prevState) => ({
      menu: !prevState.menu
    }));
  };

  render() {
    const {
      label,
      ariaLabel,
      options
    } = this.props;

    const dropdownMenuList = () => {
      return <ul className="cf-dropdown-menu active" role="menu"
        {...dropdownMenuStyles}
        aria-labelledby="menu-trigger">
        {options.map((option, index) =>
          <li key={index} role="menuitem" aria-label={option.title}>
            {option.border && <div className="dropdown-border"></div>}
            <Link
              href={option.link}
              target={option.target}
              onClick={this.onClick(option.title)}>{option.title}</Link>
          </li>)}
      </ul>;
    };

    return <div ref={this.setWrapperRef}
      className="cf-dropdown" role="dropdown-menu" >

      <a href={`#${label}`}
        {...triggerStyles}
        className="cf-dropdown-trigger"
        role="button"
        id="menu-trigger"
        aria-haspopup="menu"
        aria-expanded={this.state.menu}
        aria-pressed={this.state.menu}
        aria-label={ariaLabel || label}
        onClick={this.onMenuClick}>
        {label}
      </a>
      {this.state.menu && dropdownMenuList() }
    </div>;
  }
}

DropdownMenu.propTypes = {
  analyticsTitle: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    border: PropTypes.bool,
    target: PropTypes.string
  })),
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string
};
