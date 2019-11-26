# `Breadcrumbs`

#### `renders with props`

```
<Breadcrumbs
  getBreadcrumbLabel={[Function]}
  renderAllCrumbs={false}
  shouldDrawCaretBeforeFirstCrumb={true}
  styling={
    Object {
      "data-css-1mdtwij": "",
    }
  }
>
  <div
    data-css-1mdtwij=""
  >
    <Route
      key="Claims Folder"
      path="/:vacolsId/documents"
      render={[Function]}
    >
        &gt;  
      <Link
        classNames={
          Array [
            "cf-btn-link",
          ]
        }
        id="cf-logo-link"
        role="Breadcrumbs"
        to="/vacolsId/documents"
      >
        <Link
          to="/vacolsId/documents"
          type={null}
        >
          <LinkAnchor
            href="/vacolsId/documents"
            navigate={[Function]}
            type={null}
          >
            <a
              href="/vacolsId/documents"
              onClick={[Function]}
              type={null}
            >
              <h2
                className="cf-application-title"
                id="page-title"
              >
                Claims Folder
              </h2>
            </a>
          </LinkAnchor>
        </Link>
      </Link>
    </Route>
    <Route
      key="Document Viewer"
      path="/:vacolsId/documents/:docId"
      render={[Function]}
    >
        &gt;  
      <Link
        classNames={
          Array [
            "cf-btn-link",
          ]
        }
        id="cf-logo-link"
        role="Breadcrumbs"
        to="/vacolsId/documents/docId"
      >
        <Link
          to="/vacolsId/documents/docId"
          type={null}
        >
          <LinkAnchor
            href="/vacolsId/documents/docId"
            navigate={[Function]}
            type={null}
          >
            <a
              href="/vacolsId/documents/docId"
              onClick={[Function]}
              type={null}
            >
              <h2
                className="cf-application-title"
                id="page-title"
              >
                Document Viewer
              </h2>
            </a>
          </LinkAnchor>
        </Link>
      </Link>
    </Route>
  </div>
</Breadcrumbs>
```

#### `renders array of crumbs, custom label fn, styling, without initial caret`

```
<Breadcrumbs
  elements={
    Array [
      Object {
        "breadcrumb": "Document Viewer",
        "path": "/:vacolsId/documents/:docId",
      },
      Object {
        "breadcrumb": "Claims Folder",
        "path": "/:vacolsId/documents",
      },
      Object {
        "breadcrumb": "Assignments | Caseflow Reader",
        "path": "/",
      },
    ]
  }
  getBreadcrumbLabel={[Function]}
  renderAllCrumbs={false}
  shouldDrawCaretBeforeFirstCrumb={false}
  styling={
    Object {
      "data-css-c6mfa5": "",
    }
  }
>
  <div
    data-css-c6mfa5=""
  >
    <Route
      key="Assignments | Caseflow Reader"
      path="/"
      render={[Function]}
    >
      <Link
        classNames={
          Array [
            "cf-btn-link",
          ]
        }
        id="cf-logo-link"
        role="Breadcrumbs"
        to="/"
      >
        <Link
          to="/"
          type={null}
        >
          <LinkAnchor
            href="/"
            navigate={[Function]}
            type={null}
          >
            <a
              href="/"
              onClick={[Function]}
              type={null}
            >
              Assignments | Caseflow Reader
            </a>
          </LinkAnchor>
        </Link>
      </Link>
    </Route>
    <Route
      key="Claims Folder"
      path="/:vacolsId/documents"
      render={[Function]}
    >
        &gt;  
      <Link
        classNames={
          Array [
            "cf-btn-link",
          ]
        }
        id="cf-logo-link"
        role="Breadcrumbs"
        to="/vacolsId/documents"
      >
        <Link
          to="/vacolsId/documents"
          type={null}
        >
          <LinkAnchor
            href="/vacolsId/documents"
            navigate={[Function]}
            type={null}
          >
            <a
              href="/vacolsId/documents"
              onClick={[Function]}
              type={null}
            >
              Claims Folder
            </a>
          </LinkAnchor>
        </Link>
      </Link>
    </Route>
    <Route
      key="Document Viewer"
      path="/:vacolsId/documents/:docId"
      render={[Function]}
    >
        &gt;  
      <Link
        classNames={
          Array [
            "cf-btn-link",
          ]
        }
        id="cf-logo-link"
        role="Breadcrumbs"
        to="/vacolsId/documents/docId"
      >
        <Link
          to="/vacolsId/documents/docId"
          type={null}
        >
          <LinkAnchor
            href="/vacolsId/documents/docId"
            navigate={[Function]}
            type={null}
          >
            <a
              href="/vacolsId/documents/docId"
              onClick={[Function]}
              type={null}
            >
              Document Viewer
            </a>
          </LinkAnchor>
        </Link>
      </Link>
    </Route>
  </div>
</Breadcrumbs>
```

#### `renders an array of crumbs regardless of route`

```
<Breadcrumbs
  elements={
    Array [
      Object {
        "breadcrumb": "Your Queue",
        "path": "/",
      },
      Object {
        "breadcrumb": "Vet. E Ran",
        "path": "/tasks/:vacolsId",
      },
      Object {
        "breadcrumb": "Select Dispositions",
        "path": "/tasks/:vacolsId/dispositions",
      },
      Object {
        "breadcrumb": "Submit Draft Decision",
        "path": "/tasks/:vacolsId/submit",
      },
    ]
  }
  getBreadcrumbLabel={[Function]}
  renderAllCrumbs={true}
  shouldDrawCaretBeforeFirstCrumb={false}
  styling={
    Object {
      "data-css-c6mfa5": "",
    }
  }
>
  <div
    data-css-c6mfa5=""
  >
    <span
      key="Your Queue"
    >
      <Link
        classNames={
          Array [
            "cf-btn-link",
          ]
        }
        id="cf-logo-link"
        role="Breadcrumbs"
        to="/"
      >
        <Link
          to="/"
          type={null}
        >
          <LinkAnchor
            href="/"
            navigate={[Function]}
            type={null}
          >
            <a
              href="/"
              onClick={[Function]}
              type={null}
            >
              Your Queue
            </a>
          </LinkAnchor>
        </Link>
      </Link>
    </span>
    <span
      key="Vet. E Ran"
    >
        &gt;  
      <Link
        classNames={
          Array [
            "cf-btn-link",
          ]
        }
        id="cf-logo-link"
        role="Breadcrumbs"
        to="/tasks/:vacolsId"
      >
        <Link
          to="/tasks/:vacolsId"
          type={null}
        >
          <LinkAnchor
            href="/tasks/:vacolsId"
            navigate={[Function]}
            type={null}
          >
            <a
              href="/tasks/:vacolsId"
              onClick={[Function]}
              type={null}
            >
              Vet. E Ran
            </a>
          </LinkAnchor>
        </Link>
      </Link>
    </span>
    <span
      key="Select Dispositions"
    >
        &gt;  
      <Link
        classNames={
          Array [
            "cf-btn-link",
          ]
        }
        id="cf-logo-link"
        role="Breadcrumbs"
        to="/tasks/:vacolsId/dispositions"
      >
        <Link
          to="/tasks/:vacolsId/dispositions"
          type={null}
        >
          <LinkAnchor
            href="/tasks/:vacolsId/dispositions"
            navigate={[Function]}
            type={null}
          >
            <a
              href="/tasks/:vacolsId/dispositions"
              onClick={[Function]}
              type={null}
            >
              Select Dispositions
            </a>
          </LinkAnchor>
        </Link>
      </Link>
    </span>
    <span
      key="Submit Draft Decision"
    >
        &gt;  
      <Link
        classNames={
          Array [
            "cf-btn-link",
          ]
        }
        id="cf-logo-link"
        role="Breadcrumbs"
        to="/tasks/:vacolsId/submit"
      >
        <Link
          to="/tasks/:vacolsId/submit"
          type={null}
        >
          <LinkAnchor
            href="/tasks/:vacolsId/submit"
            navigate={[Function]}
            type={null}
          >
            <a
              href="/tasks/:vacolsId/submit"
              onClick={[Function]}
              type={null}
            >
              Submit Draft Decision
            </a>
          </LinkAnchor>
        </Link>
      </Link>
    </span>
  </div>
</Breadcrumbs>
```

