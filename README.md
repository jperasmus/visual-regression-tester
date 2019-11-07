# Visual Regression Tester

> This idea is still very much in its infancy. It is a start to scratch my own itch.

## Installation

### Install dependencies

```bash
yarn
```

### Config Setup

- Make a copy of the `config.sample.js` file and save it as `config.js` in the root directory alongside `config.sample.js`.
- Add the URLs that you want to test to your new `config.js` file.
- Optionally, specify some code that needs to run before and after each screenshot.

## Usage

There are a few options:

### Only capture screenshots

```bash
yarn capture
```

### Only diff screenshots

```bash
yarn diff
```

### Capture screenshots and run visual diff

```bash
yarn test
```
