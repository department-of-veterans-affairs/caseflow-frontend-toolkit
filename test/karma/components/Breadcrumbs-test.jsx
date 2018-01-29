import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

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
      ))
    ).to.matchSnapshot()
  );
});
