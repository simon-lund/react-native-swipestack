![](./docs/logo.png)

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

**WIP (unstable)**

# React-Native Swipe Card Stack

Package implementing a flexible approach for tinder-like swipe cards.
By exposing the `pan` developers can easily use their choice of animation.

## Demo

Insert gif or link to demo

## Installation

This package requires no additional dependencies
and you can simply install it via the CLI with your package manager of choice.

```bash
  yarn add react-native-swipestack
```

```bash
  npm install react-native-swipestack
```

## Usage/Example

See the example app in the example folder:
[/example](https://github.com/simon-lund/react-native-swipestack/tree/master/example)

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.
