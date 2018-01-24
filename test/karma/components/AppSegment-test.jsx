import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { css } from 'glamor';
import AppSegment from '../../../components/AppSegment';

describe('AppSegment', () => {
  it('no props', () =>
    expect(
      toJson(shallow(<AppSegment><p>children</p></AppSegment>))
    ).to.matchSnapshot()
  );

  it('filledBackground', () =>
    expect(
      toJson(shallow(<AppSegment filledBackground><p>children</p></AppSegment>))
    ).to.matchSnapshot()
  );

  it('noMarginTop', () =>
    expect(
      toJson(shallow(<AppSegment noMarginTop><p>children</p></AppSegment>))
    ).to.matchSnapshot()
  );

  it('styling', () =>
    expect(
      toJson(shallow(<AppSegment styling={css({ color: 'red' })}><p>children</p></AppSegment>))
    ).to.matchSnapshot()
  );
});
