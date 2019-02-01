import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import { css } from 'glamor';
import { COLORS } from '../util/StyleConstants';

// Lots of this class are taken from
// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

const dropdownMenuStyles = css({
  top: '3em',
  width: 'auto',
  minWidth: '13em',
  display: 'block'
});

const dropdownWrapperStyles = css({
  '& a': {
    color: COLORS.GREY_MEDIUM
  },

  '& li a:hover': {
    color: COLORS.WHITE
  }
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
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.menu) {
      window.analyticsEvent(this.props.analyticsTitle, 'menu', 'blur');

      this.setState({
        menu: false
      });
    }
  }

  onClick = (title) => () => {
    window.analyticsEvent(this.props.analyticsTitle, title.toLowerCase());
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
      options
    } = this.props;

    const dropdownMenuList = () => {
      return <ul className="cf-dropdown-menu active"
        {...dropdownMenuStyles}
        aria-labelledby="menu-trigger">
        {options.map((option, index) =>
          <li key={index}>
            {option.border && <div className="dropdown-border"></div>}
            <Link
              href={option.link}
              target={option.target}
              onClick={this.onClick(option.title)}>{option.title}</Link>
          </li>)}
      </ul>;
    };

    return <div ref={this.setWrapperRef} {...dropdownWrapperStyles}
      className="cf-dropdown" role="dropdown-menu" >
      <a
        {...triggerStyles}
        className="cf-dropdown-trigger"
        id="menu-trigger"
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
    border: PropTypes.boolean,
    target: PropTypes.string
  })),
  label: PropTypes.string.isRequired
};
