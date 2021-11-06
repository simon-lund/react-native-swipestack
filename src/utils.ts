import { Animated, PanResponder } from "react-native";
import { Direction, Options, SwipeEvent, ReleaseEvent } from "./types";

/**
 * Creates a pan responder
 */
export function createPanResponder(
  pan: Animated.ValueXY,
  onSwipe: SwipeEvent,
  onRelease: ReleaseEvent,
  options: Options
) {
  const { allowedDirections, screenWidth, horizontalThreshold, offset } =
    options;

  return PanResponder.create({
    onMoveShouldSetPanResponder: (_, { dx, dy }) => dx != 0 && dy != 0,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease(_, { dx, dy }) {
      if (dx > horizontalThreshold) {
        Animated.spring(pan, {
          toValue: { x: screenWidth + offset, y: dy },
          useNativeDriver: false,
        }).start(() => {
          onRelease("right");
        });
      } else if (dx < -horizontalThreshold) {
        Animated.spring(pan, {
          toValue: { x: -screenWidth - offset, y: dy },
          useNativeDriver: false,
        }).start(() => {
          onRelease("left");
        });
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: false,
        }).start(() => {
          onRelease(null);
        });
      }
    },
  });
}

export const useSwipe =
  (
    pan: Animated.ValueXY,
    onRelease: (direction: Direction | null) => void,
    options: Options
  ) =>
  (direction: Direction): void => {
    const { screenWidth, offset } = options;

    switch (direction) {
      case "left":
        Animated.spring(pan, {
          toValue: { x: -screenWidth - offset, y: Number(pan.y) },
          overshootClamping: true,
          useNativeDriver: false,
        }).start(() => {
          onRelease("left");
        });
        break;
      case "up":
        // TODO
        console.log("Not implemented yet");
        break;
      case "right":
        Animated.spring(pan, {
          toValue: { x: screenWidth + offset, y: Number(pan.y) },
          overshootClamping: true,
          useNativeDriver: false,
        }).start(() => {
          onRelease("right");
        });
        break;
      case "down":
        // TODO
        console.log("Not implemented yet");
        break;
      default:
        console.error("Unknown direction:", direction);
    }
  };

export const useSwipeUndo = (pan: Animated.ValueXY) => () =>
  new Promise((resolve) =>
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      restDisplacementThreshold: 0.5,
      useNativeDriver: false,
    }).start(resolve)
  );
