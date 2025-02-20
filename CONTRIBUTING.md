<!-- https://univer.work/guides/contributing/ -->

# Univer Contributing Guide

Welcome, and thank you for your interest in contributing to Univer!

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before you join in the Univer community.

## Asking Questions

If you encounter any issues while using Univer, you can seek help in the following communities:

-   [Discord community](https://discord.gg/XPGnMBmpd6)
-   [GitHub Discussions](https://github.com/dream-num/univer/discussions)
-   Join the Univer Chinese community (please scan the QR code [here](https://univer.work/enterprises/#%E8%8E%B7%E5%8F%96%E5%95%86%E4%B8%9A%E7%89%88))

## Reporting Issues

If you encounter any issues or have any suggestions while using Univer, please feel free to raise them in the Github Issues. We will respond promptly.

To better assist you, we recommend:

-   Before submitting an issue, please search to see if someone has already raised a similar question.
-   We provide an [issue template](https://github.com/dream-num/univer/issues/new/choose) and encourage you to fill it out with sufficient information, which helps us quickly identify the problem.
-   Please try to describe the issue in English, as it enables more people to participate in the discussion. We will also make an effort to reply in English to benefit a wider audience.

> If you're new to submitting issues, we recommend to read [How To Ask Questions The Smart Way](http://www.catb.org/~esr/faqs/smart-questions.html) and [How to Report Bugs Effectively](https://www.chiark.greenend.org.uk/~sgtatham/bugs.html) before posting. Well-written bug reports help us and help you!

## Contributing Code

### Install dependencies

Univer requires Node.js >= 18.17.0. We recommend using nvm or fnm to switch between different versions of Node.js.

```shell
git clone http://github.com/dream-num/univer
cd univer

# install package manager pnpm
npm i -g pnpm

# install dependencies
pnmp install

```

### Start dev server

```shell
pnpm dev:demo
```

### Architecture

Please refer to the architecture doc. The [Chinese version](https://univer.work/guides/architecture/architecture/).

### Source code organization

The file structure of a plugin should be organized as follows:

```
|- common/
|- models/
|- services/
|- commands/
  |- commands/
  |- mutations/
  |- operations/
|- controllers/
|- views/
  |- components/
  |- parts/
|- plugin.ts
|- index.ts
```

There are some limits on what paths could a file import from.

-   common cannot import file in other folders
-   models can only import files from common
-   services can only import files from models and common
-   commands can only import files from common, models and services

During the refactoring process, it is recommended to remove legacy folders such as `Enum`, `Interface`, `Basics`, and `Shared`.

Avoid creating barrel imports (index.ts) unless it is the main root index.ts file of a plugin.

### Naming conventions

To ensure code quality and consistency, please adhere to the following guidelines:

-   Use kebab-case for both file names and folder names. If the file contains a React component, it should be in capital camelCase.
-   Folder names should be in plural format, e.g. `SheetTab.tsx`.
-   Interfaces should be named starting with a capital "I".
-   Resolve all ESLint issues that are identified in the code.
-   Do use conventional type names including .service, .controller, .menu, .command, .mutation, and .operation. Invent additional type names if you must but take care not to create too many.

### Submitting pull requests

Before merging a pull request, please make sure the following requirements are met:

-   All tests are passed. ESLint and Prettier errors are fixed.
-   Test coverage is not decreased.

We provide preview deployments for pull requests. You can view the preview deployment by clicking the "Preview" link in the "View Deployment" section.

### Documentation

If you are adding a new feature, please make sure to update the documentation accordingly. Refer to our [documentation repository](https://github.com/dream-num/docs) for more guidance.

### Storybook

We use Storybook to develop and test components in isolation. It is a great tool to develop UI components in isolation, which can improve component reuse, testability, and development efficiency. You can use the following command to start Storybook:

```shell
pnpm storybook
```

When a new pull request is submitted, a Storybook deployment will be automatically generated. You can view the Storybook deployment by clicking the "Preview" link in the "View Storybook" section.

### Debugging

We provided some Visual Studio Code (vscode) tasks to help you debug in vscode.

After stating dev server, you can launch Edge or Chrome instance and debug in vscode, and you can debug directly in vscode!

![image](https://github.com/dream-num/univer/assets/12122021/25da436c-2155-4ea0-8646-ff3b3dc23112)

### Unit test

To ensure the quality of the code and move with confidence, we require that all code must be covered by unit tests. We use vitest as the unit test framework. You can use the following command to run unit tests:

```shell
pnpm test
```

With the help of vscode and its rich ecosystem, you could directly debug unit tests in vscode. Please install the extension we recommend, and you will see the debug button in the codelens.

![](./docs/img/debug-unit-test.png)

### Clean code

> Programs are meant to be ready by humans and only icidentally for computers to execute. - Harold Abelson

-   Do not expose properties or methods those are not necessary to be exposed.
-   Group related methods or properties together. Do not always use blank lines to separate them.
-   Keep your concepts consistent by naming your variables consistently.

### New Package

Create a new package with our CLI tool:

```shell
# pnpm
pnpm create @univerjs/cli init <project-name>

# npm
npm create @univerjs/cli init <project-name>

```

## Links

* [How to Contribute to Facade API](./packages/facade/docs/CONTRIBUTING.md)