<p align="center">
    <image src="./docs/logo.png" alt="react-native-swipe-card logo"/>
</p>

<p align="center">
   <a href="https://reactnative.dev">React Native</a> - Swipe Card Stack
</p>


<p align="center">
  <a href="https://www.npmjs.com/package/react-native-swipestack"><img src="https://img.shields.io/npm/v/react-native-swipestack.svg"></a>
  <a href="https://github.com/simon-lund/react-native-swipestack"><img src="https://img.shields.io/github/stars/simon-lund/react-native-swipestack"></a>
  <a href="https://www.npmjs.com/package/react-native-swipestack"><img src="https://img.shields.io/npm/dm/react-native-swipestack.svg"></a>
</p>

<p align="center">
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
</p>


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
