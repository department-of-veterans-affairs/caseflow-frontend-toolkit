// import React from 'react';
// import { expect } from 'chai';
// import { mount } from 'enzyme';
// import toJson from 'enzyme-to-json';
// import { MemoryRouter } from 'react-router-dom';
// import Breadcrumbs from '../../components/Breadcrumbs';
// import { css } from 'glamor';

// describe('Breadcrumbs', () => {
//   it('renders with props', () =>
//     expect(
//       toJson(mount(
//         <MemoryRouter initialEntries={['/vacolsId/documents/docId']}>
//           <Breadcrumbs>
//             <div
//               breadcrumb="Document Viewer"
//               path="/:vacolsId/documents/:docId" />
//             <div
//               breadcrumb="Claims Folder"
//               path="/:vacolsId/documents" />
//             <div
//               path="/"
//               title="Assignments | Caseflow Reader" />
//           </Breadcrumbs>
//         </MemoryRouter>
//       ).find(Breadcrumbs))
//     ).to.matchSnapshot()
//   );

//   it('renders array of crumbs, custom label fn, styling, without initial caret', () =>
//     expect(
//       toJson(mount(
//         <MemoryRouter initialEntries={['/vacolsId/documents/docId']}>
//           <Breadcrumbs
//             getBreadcrumbLabel={(route) => route.breadcrumb}
//             shouldDrawCaretBeforeFirstCrumb={false}
//             styling={css({
//               marginTop: '-1.5rem',
//               marginBottom: '-1.5rem'
//             })}
//             elements={[{
//               breadcrumb: 'Document Viewer',
//               path: '/:vacolsId/documents/:docId'
//             }, {
//               breadcrumb: 'Claims Folder',
//               path: '/:vacolsId/documents'
//             }, {
//               breadcrumb: 'Assignments | Caseflow Reader',
//               path: '/'
//             }]}
//           />
//         </MemoryRouter>
//       ).find(Breadcrumbs))
//     ).to.matchSnapshot()
//   );

//   it('renders an array of crumbs regardless of route', () =>
//     expect(
//       toJson(mount(
//         <MemoryRouter initialEntries={['/vacolsId/documents/docId']}>
//           <Breadcrumbs
//             getBreadcrumbLabel={(route) => route.breadcrumb}
//             shouldDrawCaretBeforeFirstCrumb={false}
//             renderAllCrumbs
//             styling={css({
//               marginTop: '-1.5rem',
//               marginBottom: '-1.5rem'
//             })}
//             elements={[{
//               breadcrumb: 'Your Queue',
//               path: '/'
//             }, {
//               breadcrumb: 'Vet. E Ran',
//               path: '/tasks/:vacolsId'
//             }, {
//               breadcrumb: 'Select Dispositions',
//               path: '/tasks/:vacolsId/dispositions'
//             }, {
//               breadcrumb: 'Submit Draft Decision',
//               path: '/tasks/:vacolsId/submit'
//             }]}
//           />
//         </MemoryRouter>
//       ).find(Breadcrumbs))
//     ).to.matchSnapshot()
//   );
// });
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';
import { css } from 'glamor';
import shallowRender from '../../shallowRender';

describe('Breadcrumbs', () => {
  it('renders with props', () => {
    const tree = (
      <MemoryRouter initialEntries={['/vacolsId/documents/docId']}>
        <Breadcrumbs>
          <div breadcrumb="Document Viewer" path="/:vacolsId/documents/:docId" />
          <div breadcrumb="Claims Folder" path="/:vacolsId/documents" />
          <div path="/" title="Assignments | Caseflow Reader" />
        </Breadcrumbs>
      </MemoryRouter>
    );
    const {asFragment} = render(tree);
  
    expect(asFragment()).toMatchSnapshot();
    expect(shallowRender(tree)).toMatchSnapshot();
  });

  it('renders array of crumbs, custom label fn, styling, without initial caret', () => {
    const tree = (
      <MemoryRouter initialEntries={['/vacolsId/documents/docId']}>
        <Breadcrumbs
          getBreadcrumbLabel={(route) => route.breadcrumb}
          shouldDrawCaretBeforeFirstCrumb={false}
          styling={css({
            marginTop: '-1.5rem',
            marginBottom: '-1.5rem',
          })}
          elements={[
            {
              breadcrumb: 'Document Viewer',
              path: '/:vacolsId/documents/:docId',
            },
            {
              breadcrumb: 'Claims Folder',
              path: '/:vacolsId/documents',
            },
            {
              breadcrumb: 'Assignments | Caseflow Reader',
              path: '/',
            },
          ]}
        />
      </MemoryRouter>
    );

    const {asFragment} = render(tree);
  
    expect(asFragment()).toMatchSnapshot();
    expect(shallowRender(tree)).toMatchSnapshot();
  });

  it('renders an array of crumbs regardless of route', () => {
    const tree = (
      <MemoryRouter initialEntries={['/vacolsId/documents/docId']}>
        <Breadcrumbs
          getBreadcrumbLabel={(route) => route.breadcrumb}
          shouldDrawCaretBeforeFirstCrumb={false}
          renderAllCrumbs
          styling={css({
            marginTop: '-1.5rem',
            marginBottom: '-1.5rem',
          })}
          elements={[
            {
              breadcrumb: 'Your Queue',
              path: '/',
            },
            {
              breadcrumb: 'Vet. E Ran',
              path: '/tasks/:vacolsId',
            },
            {
              breadcrumb: 'Select Dispositions',
              path: '/tasks/:vacolsId/dispositions',
            },
            {
              breadcrumb: 'Submit Draft Decision',
              path: '/tasks/:vacolsId/submit',
            },
          ]}
        />
      </MemoryRouter>
    );

    const {asFragment} = render(tree);
  
    expect(asFragment()).toMatchSnapshot();
    expect(shallowRender(tree)).toMatchSnapshot();
  });
});
