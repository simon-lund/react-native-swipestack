import React from 'react';
import PropTypes from 'prop-types';
import {Animated, Text, Dimensions, StyleSheet} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export function Reaction({pan, reaction, opacityOptions}) {
  const opacity = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    ...opacityOptions,
  });

  return (
    <Animated.View style={[styles.reaction, {opacity}]}>
      <Text style={{fontSize: 40}}>{reaction}</Text>
    </Animated.View>
  );
}

Reaction.displayName = 'Reaction';
Reaction.propTypes = {
  pan: PropTypes.any,
  reaction: PropTypes.string,
  opacityOptions: PropTypes.shape({
    extrapolate: PropTypes.string,
    inputRange: PropTypes.array,
    outputRange: PropTypes.array,
  }),
};

const styles = StyleSheet.create({
  reaction: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gainsboro',
    borderRadius: 15,
  },
});
