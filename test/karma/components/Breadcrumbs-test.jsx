import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { css } from 'glamor';

describe('Breadcrumbs', () => {
  it('renders with props', () =>
    expect(
      toJson(mount(
        <MemoryRouter initialEntries={['/vacolsId/documents/docId']}>
          <Breadcrumbs>
            <div
              breadcrumb="Document Viewer"
              path="/:vacolsId/documents/:docId" />
            <div
              breadcrumb="Claims Folder"
              path="/:vacolsId/documents" />
            <div
              path="/"
              title="Assignments | Caseflow Reader" />
          </Breadcrumbs>
        </MemoryRouter>
      ).find(Breadcrumbs))
    ).to.matchSnapshot()
  );

  it('renders array of crumbs, custom label fn, styling, without initial caret', () =>
    expect(
      toJson(mount(
        <MemoryRouter initialEntries={['/vacolsId/documents/docId']}>
          <Breadcrumbs
            getBreadcrumbLabel={((route) => route.breadcrumb)}
            caretBeforeAllCrumbs={false}
            styling={css({
              marginTop: '-1.5rem',
              marginBottom: '-1.5rem'
            })}
            elements={[{
              breadcrumb: 'Document Viewer',
              path: '/:vacolsId/documents/:docId'
            }, {
              breadcrumb: 'Claims Folder',
              path: '/:vacolsId/documents'
            }, {
              breadcrumb: 'Assignments | Caseflow Reader',
              path: '/'
            }]}
          />
        </MemoryRouter>
      ).find(Breadcrumbs))
    ).to.matchSnapshot()
  );
});
