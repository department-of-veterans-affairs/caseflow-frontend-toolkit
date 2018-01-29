# `Breadcrumbs`

#### `renders with props`

```
<MemoryRouter
  initialEntries={
    Array [
      "/vacolsId/documents/docId",
    ]
  }
>
  <Router
    history={
      Object {
        "action": "POP",
        "block": [Function],
        "canGo": [Function],
        "createHref": [Function],
        "entries": Array [
          Object {
            "hash": "",
            "key": "ncncuj",
            "pathname": "/vacolsId/documents/docId",
            "search": "",
            "state": undefined,
          },
        ],
        "go": [Function],
        "goBack": [Function],
        "goForward": [Function],
        "index": 0,
        "length": 1,
        "listen": [Function],
        "location": Object {
          "hash": "",
          "key": "ncncuj",
          "pathname": "/vacolsId/documents/docId",
          "search": "",
          "state": undefined,
        },
        "push": [Function],
        "replace": [Function],
      }
    }
  >
    <Breadcrumbs>
      <span>
        <Route
          key="Claims Folder"
          path="/:vacolsId/documents"
          render={[Function]}
        >
          <span
            data-css-1mdtwij=""
          >
            <h2
              className="cf-application-title"
              id="page-title"
            >
                &gt;  
            </h2>
            <Link
              id="cf-logo-link"
              to="/vacolsId/documents"
            >
              <Link
                replace={false}
                to="/vacolsId/documents"
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
              </Link>
            </Link>
          </span>
        </Route>
        <Route
          key="Document Viewer"
          path="/:vacolsId/documents/:docId"
          render={[Function]}
        >
          <span
            data-css-1mdtwij=""
          >
            <h2
              className="cf-application-title"
              id="page-title"
            >
                &gt;  
            </h2>
            <Link
              id="cf-logo-link"
              to="/vacolsId/documents/docId"
            >
              <Link
                replace={false}
                to="/vacolsId/documents/docId"
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
              </Link>
            </Link>
          </span>
        </Route>
      </span>
    </Breadcrumbs>
  </Router>
</MemoryRouter>
```

