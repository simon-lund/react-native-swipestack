/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {Swipeable} from 'react-native-swipestack';
import {Reaction} from './reaction';

export function App() {
  const swipeable = useRef(null);
  const [showUndoButton, setShowUndoButton] = useState(false);

  const handleSwipe = direction => () => {
    swipeable.current.swipe(direction);
    setShowUndoButton(prev => !prev);
  };

  const handleUndo = () => {
    swipeable.current.undo();
    setShowUndoButton(prev => !prev);
  };

  const handleRelease = e => {
    if (e !== null) {
      setShowUndoButton(prev => !prev);
    }
  };

  return (
    <View style={styles.screen}>
      {/* NOTE: do not apply paddings since reaction is only shown within the padding */}
      <Swipeable
        ref={swipeable}
        onRelease={handleRelease}
        style={styles.swipeable}>
        {pan => (
          <>
            <Text style={{fontSize: 20, paddingHorizontal: 50}}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            </Text>
            {/* NOTE: position reactions last to be visible */}
            <Reaction reaction="❤️" pan={pan} />
            <Reaction
              reaction="👎"
              pan={pan}
              opacityOptions={{outputRange: [1, 0, 0]}}
            />
          </>
        )}
      </Swipeable>
      <View style={styles.space} />
      <View style={styles.buttonGroup}>
        {showUndoButton ? (
          <Button label="Undo" onPress={handleUndo} />
        ) : (
          <>
            <Button label="Left" onPress={handleSwipe('left')} />
            <Button label="Right" onPress={handleSwipe('right')} />
          </>
        )}
      </View>
    </View>
  );
}

const Button = ({label, onPress}) => (
  <Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.buttonLabel}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  space: {
    marginBottom: 40,
  },
  swipeable: {
    height: '60%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 300,
  },
});
