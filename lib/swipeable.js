import React, { useRef, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Animated, View, Dimensions, StyleSheet } from "react-native";
import { createPanResponder, useSwipe, useSwipeUndo } from "./utils";

/**
 * Swipeable
 *
 * Exposes pan (=Anmimated.ValueXY) to children which can be used for custom animations triggered by swiping.
 */
export const Swipeable = forwardRef(
  ({ onRelease, screenWidth, threshold, offset, style, children }, ref) => {
    // init pan and panResponder
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
      createPanResponder(pan, onRelease, screenWidth, threshold, offset)
    ).current;

    // init callables & attach to swipeable ref
    const swipe = useSwipe(pan, onRelease, screenWidth, offset);
    const undo = useSwipeUndo(pan);

    useImperativeHandle(ref, () => ({ swipe, undo }));

    // compose hardcoded styles with style prop
    const composedStyles = StyleSheet.compose(
      {
        transform: [
          {
            rotate: pan.x.interpolate({
              inputRange: [-screenWidth / 2, 0, screenWidth / 2],
              outputRange: ["-10deg", "0deg", "10deg"],
              extrapolate: "clamp",
            }),
          },
          ...pan.getTranslateTransform(),
        ],
      },
      style
    );

    return (
      <Animated.View style={composedStyles} {...panResponder.panHandlers}>
        {typeof children === "function" ? children(pan) : children}
      </Animated.View>
    );
  }
);

Swipeable.displayName = "Swipeable";
Swipeable.propTypes = {
  onRelease: PropTypes.func,
  screenWidth: PropTypes.number,
  threshold: PropTypes.number,
  offset: PropTypes.number,
  // TODO: find out what is the right proptype => maybe write small package for react native prop types
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
Swipeable.defaultProps = {
  // TODO: find good percentage for threshold and offset (e.g. card width)
  screenWidth: Dimensions.get("window").width,
  threshold: 120,
  offset: 100,
};
