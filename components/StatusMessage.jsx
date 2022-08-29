import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import AppSegment from './AppSegment';

export default class StatusMessage extends React.Component {
  render() {
    const {
      checklist,
      checklistClassNames,
      example,
      leadMessageList,
      messageText,
      title,
      wrapInAppSegment = true,
      children,
      type
    } = this.props;

    if (example) {
      checklistClassNames.push('cf-sg-success-example');
    }

    const getClassNames = () => {
      const h1classNames = ['cf-msg-screen-heading'];

      if (type === 'success') {
        h1classNames.push('cf-success');
      } else if (type === 'alert') {
        h1classNames.push('cf-red-text');
      } else if (type === 'warning') {
        h1classNames.push('usa-alert-error', 'cf-warning');
      }

      return h1classNames.join(' ');
    };

    const wrappedContent = <div>
      <h1 className={getClassNames()}>{title}</h1>

      { children ?
        <p className="cf-msg-screen-deck">
          {children}
        </p> :
        _.map(leadMessageList, (listValue, i) =>
          <p className="cf-msg-screen-deck" key={i}>
            {listValue}
          </p>)
      }
      {type === 'success' && checklist && <ul className={checklistClassNames.join(' ')}>
        {checklist.map((listValue, i) => <li key={i}>{listValue}</li>)}
      </ul>}
      <p className="cf-msg-screen-text">
        { messageText }
      </p>
    </div>;

    return wrapInAppSegment ?
      <AppSegment extraClassNames="cf-app-msg-screen" filledBackground>{wrappedContent}</AppSegment> :
      <div className="cf-app-msg-screen">{wrappedContent}</div>;
  }
}

StatusMessage.defaultProps = {
  checklistClassNames: ['cf-success-checklist', 'cf-left-padding']
};

StatusMessage.props = {
  checklist: PropTypes.array,
  leadMessageList: PropTypes.array,
  messageText: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string
};
