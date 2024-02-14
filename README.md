# caseflow-frontend-toolkit
Build tools and React components for the Caseflow frontends.

## Installation

```
$ yarn add @department-of-veterans-affairs/caseflow-frontend-toolkit
```

## Usagee

See how other libraries, like [Caseflow](https://github.com/department-of-veterans-affairs/caseflow/), are using this tool.

### Component Assumptions
The components make assumptions, like:

* Caseflow Commons CSS will be on the page.
* Global analytics functions will be available.

These assumptions are not explicitly documented, so you'll have to read the code. :)

### Dependencies
This module has many peer dependencies. It relies on contracts with a variety of modules in the Webpack, React, and Karma ecosystems. Unfortunately, yarn and npm's support for `peerDependencies` is weak. For instance, adding peer dependencies can cause yarn to [log warnings for no reason](https://github.com/yarnpkg/yarn/issues/4850). This means that you'll have to just look in `package.json` for what seems relevant, and manually add it to your consumer project.

## Dev Notes
This module has the public contract that consumers can require certain files in `config/`, `test/` and `components/` directly. Before you move files around, be sure that no consumer is using them. (We can come up with a more formal way to declare what files are public when the usage of this module gets more complex, but for now I'd say it's overkill.) 

### Build Process
Traditionally, an npm module is supposed to own its build process. Before running `yarn publish`, you'd have a script that compiles a JS file that does not need further compilation to run in any environment you support. This greatly simplifies sharing code in the broad OSS world, because you don't need to know how a module was compiled to use it.

For our use case, I've decided to forgo that. Our team owns both this module and the consumers of it. In the near term, we have two consumers. Additionally, the build process for those two consumers is defined by this module itself. So it should be easy to keep all three places in sync. And this allows us to greatly simplify our publishing process. Instead of having Travis publish on `master` builds, or hoping that people remember to run `yarn run build-and-publish` instead of just `yarn publish`, we can just publish directly without extra steps. We won't have the pain of accidentally publishing a version that does not have the prebuilt JS file.

### React as a dev dep
Unfortunately, if `react` is listed as a `dependency` in `package.json`, then `yarn` fires a bunch of erroneous warnings about `react` not being met as a peer dependency. Thus, we move it to `devDependencies` to silence the warnings. Semantically, `react` is a `dependency` of this module and should be listed as such.

### Local Development
You may want to use `yarn link` to [link](https://classic.yarnpkg.com/en/docs/cli/link/) a local copy of this module project level to view changes in your development environment. Simply `yarn link` in your local directory for this module, then `yarn link <version of this module>` in the project directory that contains `package.json` that you want to use it in. This is ideal for testing changes before you push.
