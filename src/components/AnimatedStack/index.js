import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  Pressable,
  TouchableOpacity,
  Button
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedGestureHandler,
  interpolate,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Like from '../../../assets/images/LIKE.png';
import Nope from '../../../assets/images/nope.png';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;
const bottomIconSize = 30;

const AnimatedStack = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const {data, renderItem, onSwipeRight, onSwipeLeft} = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentProfile = data[currentIndex];
  const nextProfile = data[nextIndex];

  const {width: screenWidth} = useWindowDimensions();

  const hiddenTranslateX = 2 * screenWidth;

  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      'deg',
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.8, 1],
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.5, 1],
    ),
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, hiddenTranslateX / 5], [0, 1]),
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -hiddenTranslateX / 5], [0, 1]),
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: event => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }

      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {},
        () => runOnJS(setCurrentIndex)(currentIndex + 1),
      );

      const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft;
      onSwipe && runOnJS(onSwipe)(currentProfile);
    },
  });

  const wrapperSwipeLeft = () => {
    console.log('got press');
    setCurrentIndex(currentIndex + 1);
    onSwipeLeft(currentProfile);
  };

  const wrapperSwipeRight = () => {
    console.log('got press');
    setCurrentIndex(currentIndex + 1);
    onSwipeRight(currentProfile);
  };

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex, translateX]);

  return (
    <View style={styles.root}>
      <Modal
        isVisible={isModalVisible}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={800}
        onBackdropPress={handleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeadingText}>HELP</Text>
          </View>
          <View style={styles.modalBody}>
            <Text>
              + If you like the current profile, swipe RIGHT or press the HEART button. 
            </Text>
            <Text>
            {'\n'}+ If you don't like the profile swipe LEFT or press the X button.
            </Text>
            <Text>
            {'\n'}+ If you and another account swipe right on eachother, then it's a MATCH. You
              will then be able to message them and discuss being pet pals!
            </Text>
            <Text>
              {'\n'}+ Press the PLUS button near the current profile name to see their full bio
            </Text>
            <Text>
              {'\n'}+ Press the REPORT USER button at the top of the screen to send a report for the PetPal Team to review
            </Text>
          </View>
          <View style = {styles.modalFooter}>
            <Button title="Close" onPress={handleModal} color ={'#e97a3a'} borderRadius={100} />
          </View>
        </View>
      </Modal>
      {nextProfile && (
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            {renderItem({item: nextProfile})}
          </Animated.View>
        </View>
      )}
      {currentProfile ? (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <Animated.Image
              source={Like}
              style={[styles.like, {left: 10}, likeStyle]}
              resizeMode="contain"
            />
            <Animated.Image
              source={Nope}
              style={[styles.like, {right: 10}, nopeStyle]}
              resizeMode="contain"
            />
            {renderItem({item: currentProfile})}
          </Animated.View>
        </PanGestureHandler>
      ) : (
        <View>
          <Text>Oops, No More users</Text>
        </View>
      )}
      {currentProfile ? (
        <View style={styles.icons}>
          <View style={styles.button}>
            <TouchableOpacity onPress={wrapperSwipeLeft}>
              <Entypo name="cross" size={bottomIconSize} color="#F76C6B" />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={handleModal}>
              <FontAwesome
                name="question"
                size={bottomIconSize}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={wrapperSwipeRight}>
              <FontAwesome name="heart" size={bottomIconSize} color="#4FCC94" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  animatedCard: {
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 10,
    zIndex: 1,
    elevation: 1,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    marginTop: 75,
    backgroundColor: '#ededed',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  modalHeader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeadingText: {
    paddingTop: 10,
    textAlign: 'center',
    fontFamily: 'Gill Sans',
    fontWeight: 'bold',
    fontSize: 24,
  },
  modalText: {
    fontSize: 18,
  },
  modalBody: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    minHeight: 100,
  },
  modalFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
});

export default AnimatedStack;
