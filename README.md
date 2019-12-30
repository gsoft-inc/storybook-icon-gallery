# Storybook Icon Gallery

<a href="https://circleci.com/gh/gsoft-inc/storybook-icon-gallery/tree/master"><img alt="build" src="https://img.shields.io/circleci/build/github/gsoft-inc/storybook-icon-gallery/master"></a>
<a href="https://david-dm.org/gsoft-inc/storybook-icon-gallery?type=dev" title="devDependencies"><img src="https://david-dm.org/gsoft-inc/storybook-icon-gallery/dev-status.svg"/></a>
[![Netlify Status](https://api.netlify.com/api/v1/badges/df98c158-8a37-4882-b8b9-59540f32c204/deploy-status)](https://app.netlify.com/sites/storybook-icon-gallery/deploys)

An icon gallery for Storybook docs that support multiple icon variants.

![Icon Gallery](https://raw.githubusercontent.com/gsoft-inc/storybook-icon-gallery/master/assets/teaser.png)

## Installation

```bash
npm i -D storybook-icon-gallery react-spring
```

Full documentation available at: https://storybook-icon-gallery.netlify.com/

## Maintainers

The following documentation is only for the maintainers of this repository.

### Installation

Clone the repository:

```bash
git clone https://github.com/gsoft-inc/storybook-icon-gallery.git
```

Then, install the dependencies for all the packages with Yarn (or NPM):

```bash
yarn install
```

### Development process

Once the project is installed you can start developping with Storybook by executing the following script:

```bash
yarn start-sb
```

If you want to start Storybook in `--docs` mode, use the following script:

```bash
yarn start-docs
```

At some point you might need to build a version of Storybook for production:

```bash
yarn build:sb
yarn serve-sb

yarn build:docs
yarn serve-docs
```

Or test the actual icon gallery component for production:

```bash
yarn build:pkg
```

If something is messed up and you need a clean project, use the `reset` script:

```bash
yarn reset
```

### Release

#### Process

To ensure that the consumers understand the impact of updating this package, every release should follow [semantic versioning](https://semver.org/).

#### Do the actual release

Before you release, make sure you have **write access** to the NPM package and that you are [logged in to NPM](https://docs.npmjs.com/logging-in-to-an-npm-enterprise-registry-from-the-command-line).

To release, open a terminal at the root of the project and execute the following commands:

```bash
yarn release
```

The release flow will automatically create a new [Github release](https://github.com/gsoft-inc/storybook-icon-gallery/releases) for the current release.

Make sure to document all the changes contained in the current release and dont forget to **publish** the release.

If you updated the documentation, make sure it's deployed. 

To do so:

1. Go to [Netlify web app](https://app.netlify.com/sites/storybook-icon-gallery/deploys)
2. Select the latest build on master
3. Click on "Publish deploy"

## License

Copyright © 2019, GSoft inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
