import _ from 'lodash';

const debounceFns = {};

/**
 * Create a middleware you can pass into your Redux store to automatically fire Google Analytics events.
 * Redux actions with an meta.analytics property will be logged:
 *
 *    const action = {
 *      type: string
 *      meta: {
 *        anaytics: {
 *          category: string?, // defaults to defaultCategory
 *          action: string?, // defaults to action.type
 *          label: string?|function(state: redux state): string,
 *          debounceMs: number?
 *        }
 *      }
 *    }
 *
 * meta.analytics.label is optional. If label is a function, then it will be invoked with the redux state after the
 * action is applied, and is expected to return the label to log. You can use this to dynamically set the label based
 * on how the action updated the state.
 *
 * If meta.analytics.debounceMs is passed, then a tracking event will only be fired every debounceMs milliseconds.
 * See https://lodash.com/docs/4.17.4#debounce for more detail. This is useful for noisy actions, where you want some
 * relative indicator of how often they're being fired, but tracking every action would be excessive.
 *
 * If meta.analytics is a function, then it will be invoked with a `triggerEvent` method, with type signature:
 *    function(category: string, action: string, label: string)
 *
 * You can use this to dynamically fire as many events for this action as you want. For instance, if clicking a button
 * collapses a number of accordion panes, you may wish to fire a separate event for each pane.
 *
 * @param {string?} defaultCategory a default category for all events.
 */
// export const getReduxAnalyticsMiddleware = (defaultCategory, customSetTimeout = setTimeout) => {
//   const debounceFns = {};

//   return (store) => (next) => (action) => {
//     const dispatchedAction = next(action);
//     const { meta } = action;

//     if (meta && meta.analytics) {
//       if (_.isFunction(meta.analytics)) {
//         meta.analytics(window.analyticsEvent, defaultCategory, action.type);
//       } else {
//         // const label = _.isFunction(meta.analytics.label) 
//         //   ? meta.analytics.label(store.getState()) 
//         //   : (meta.analytics.label || 'default-label');
//         const label = _.isFunction(meta.analytics.label) ? meta.analytics.label(store.getState()) : meta.analytics.label;
//         const category = meta.analytics.category || defaultCategory;
//         const actionName = meta.analytics.action || action.type;
//         const debounceMs = meta.analytics.debounceMs || 0;

//         const triggerAnalytics = () => {
//           console.log(`Triggering analytics event for ${action.type} with label:${label}, and ${category}`, );
//           window.analyticsEvent(category, actionName, label);
//         };

//         if (debounceMs > 0) {
//           if (!debounceFns[action.type]) {
//             debounceFns[action.type] = _.debounce(triggerAnalytics, debounceMs);
//           }
//           debounceFns[action.type]();
//         } else {
//           // console.log('Calling non-debounced analytics with:', label);
//           customSetTimeout(triggerAnalytics, 0);
//         }
//       }
//     }

//     return dispatchedAction;
//   };
// };

export const getReduxAnalyticsMiddleware = (defaultCategory, customSetTimeout = setTimeout) => {
  const debounceFns = {};

  return (store) => (next) => (action) => {
    const dispatchedAction = next(action);
    const { meta } = action;

    if (meta && meta.analytics) {
      if (_.isFunction(meta.analytics)) {
        meta.analytics(window.analyticsEvent, defaultCategory, action.type);
      } else {
        const debounceMs = meta.analytics.debounceMs || 0;

        const triggerAnalytics = () => {
          const state = store.getState();
          const label = _.isFunction(meta.analytics.label) ? meta.analytics.label(state) : meta.analytics.label;
          const category = meta.analytics.category || defaultCategory;
          const actionName = meta.analytics.action || action.type;

          console.log(`Triggering analytics event for ${action.type} with label:${label}, and ${category}`);
          
          if (typeof window.analyticsEvent === 'function') {
            window.analyticsEvent(category, actionName, label);
          } else {
            console.error('window.analyticsEvent is not a function');
          }
        };

        if (debounceMs > 0) {
          console.log(`Creating debounce function for ${action.type} with ${debounceMs}ms`);
          if (!debounceFns[action.type]) {
            debounceFns[action.type] = _.debounce(() => {
              console.log(`Executing debounced function for ${action.type}`);
              triggerAnalytics();
            }, debounceMs);
          }
          console.log(`Calling debounce function for ${action.type}`);
          debounceFns[action.type]();
        } else {
          console.log(`Immediate execution for ${action.type}`);
          customSetTimeout(triggerAnalytics, 0);
        }
      }
    }

    return dispatchedAction;
  };
};

export const flushDebouncedAnalytics = () => {
  Object.values(debounceFns).forEach(fn => fn.flush());
};