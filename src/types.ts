import React from "react";
import { Animated, StyleProp, ViewStyle } from "react-native";

export type Direction = "left" | "right" | "up" | "down";

// Function signatures
export type ReleaseEvent = (direction: Direction | null) => void;
export type SwipeEvent = (pan: Animated.ValueXY) => void;

// Option type for pan responder
export type Options = {
  allowedDirections: Direction[];
  screenWidth: number;
  horizontalThreshold: number;
  offset: number;
};

export type SwipeableProps = {
  // Custom props (see docs)
  disabled: boolean;
  options: Options;
  // Special react props
  // TODO: update style to animated view style prop
  style: StyleProp<ViewStyle>;
  children: React.ReactNode;
  // Event handlers
  onSwipe: SwipeEvent;
  onRelease: ReleaseEvent;
};

export type SwipeableRef = {
  // Should match the type of the returned function of utils.useSwipe()
  swipe: (direction: Direction) => void;
  // Should match the type of the returned function of utils.useSwipeUndo()
  undo: () => Promise<unknown>;
};
