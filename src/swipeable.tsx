import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { SwipeableRef, SwipeableProps } from "./types";
import { createPanResponder, useSwipe, useSwipeUndo } from "./utils";

// HACK: This will lead to unexpected behavior when orientation changes
const SCREEN_WIDTH = Dimensions.get("window").width;

/**
 * Swipeable
 *
 * Exposes pan (=Anmimated.ValueXY) to children which can be used for custom animations triggered by swiping.
 */
export const Swipeable = forwardRef<SwipeableRef, SwipeableProps>(
  ({ style, disabled, options, onSwipe, onRelease, children }, ref) => {
    // Init pan (i.e. value storage for the x and y position of the card)
    const pan = useRef(new Animated.ValueXY()).current;

    // Init pan responder (creates a pan responder instance with respective pan handlers)
    const panResponder = useRef(
      createPanResponder(pan, onSwipe, onRelease, options)
    ).current;

    // Init callables & attach to swipeable ref
    const swipe = useSwipe(pan, onRelease, options);
    const undo = useSwipeUndo(pan);
    useImperativeHandle(ref, () => ({ swipe, undo }));

    // Build transform style used for the rotation when moving sideways
    const transformStyle = {
      transform: [
        {
          rotate: pan.x.interpolate({
            inputRange: [-options.screenWidth / 2, 0, options.screenWidth / 2],
            outputRange: ["-10deg", "0deg", "10deg"],
            extrapolate: "clamp",
          }),
        },
        ...pan.getTranslateTransform(),
      ],
    };

    return (
      <Animated.View
        style={[transformStyle, style]}
        // Add pan handlers
        {...panResponder.panHandlers}
      >
        {/* We get a lot of flexiblity by exposing the pan (i.e. Animated.ValueXY) to the child components.
        Inspired by pressable component.  */}
        {typeof children === "function" ? children(pan) : children}
      </Animated.View>
    );
  }
);

Swipeable.displayName = "Swipeable";
Swipeable.defaultProps = {
  options: {
    allowedDirections: ["left", "right"],
    screenWidth: SCREEN_WIDTH,
    horizontalThreshold: (SCREEN_WIDTH / 2) * 0.8,
    offset: 50,
  },
};
