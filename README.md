# appeals-frontend-toolkit
Build tools and React components for the Appeals frontends.

## Installation

```
$ yarn add @department-of-veterans-affairs/appeals-frontend-toolkit
```

## Usage

See how other libraries, like [Caseflow](https://github.com/department-of-veterans-affairs/caseflow/), are using this tool.

## Dev Notes
### Build Process
Traditionally, an npm module is supposed to own its build process. Before running `yarn publish`, you'd have a script that compiles a JS file that does not need further compilation to run in any environment you support. This greatly simplifies sharing code in the broad OSS world, because you don't need to know how a module was compiled to use it.

For our use case, I've decided to forgo that. Our team owns both this module and the consumers of it. In the near term, we have two consumers. Additionally, the build process for those two consumers is defined by this module itself. So it should be easy to keep all three places in sync. And this allows us to greatly simplify our publishing process. Instead of having Travis publish on `master` builds, or hoping that people remember to run `yarn run build-and-publish` instead of just `yarn publish`, we can just publish directly without extra steps. We won't have the pain of accidentally publishing a version that does not have the prebuilt JS file.
