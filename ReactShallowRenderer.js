import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { isFragment, isLazy, isPortal, isMemo, isSuspense, isForwardRef } from 'react-is';

class ReactShallowRenderer {
  instance = null;
  shallowRenderer = null;

  constructor(children, { Wrapper = null } = {}) {
    this.shallowRenderer = new ShallowRenderer();
    this.shallowWrapper = Wrapper
      ? this.shallowRenderer.render(<Wrapper>{children}</Wrapper>)
      : this.shallowRenderer.render(children);
  }

  getRenderOutput() {
    if (!this.shallowWrapper) return this.shallowWrapper;
    
    const getNodeName = node => node.displayName || node.name || '';

    const getWrappedName = (outerNode, innerNode, wrapperName) => {
      const functionName = getNodeName(innerNode);
      return outerNode.type.displayName || (functionName !== '' ? `${wrapperName}(${functionName})` : wrapperName);
    };

    const extractType = node => {
      if (typeof node === 'string') return node;
      const name = getNodeName(node.type) || node.type || 'Component';
      if (isLazy(node)) return 'Lazy';
      if (isMemo(node)) return `Memo(${name || extractType(node.type)})`;
      if (isSuspense(node)) return 'Suspense';
      if (isPortal(node)) return 'Portal';
      if (isFragment(node)) return 'Fragment';
      if (isForwardRef(node)) return getWrappedName(node, node.type.render, 'ForwardRef');
      return name;
    };

    const transformNode = node => {
      const extractProps = ({ children, ...props } = {}, key) => {
        const childrenArray = Array.isArray(children) ? children : [children];
        return {
          children: childrenArray.filter(Boolean).flatMap(transformNode),
          props: {
            ...props,
            ...(key ? { key } : {}),
          },
        };
      };

      if (Array.isArray(node)) return node.map(transformNode);
      if (typeof node !== 'object') return node;

      return {
        $$typeof: Symbol.for('react.test.json'),
        type: extractType(node),
        ...extractProps(node.props, node.key),
      };
    };

    return transformNode(this.shallowWrapper);
  }
}

export default ReactShallowRenderer;
