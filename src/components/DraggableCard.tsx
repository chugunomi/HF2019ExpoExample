import React from 'react';
import { StyleSheet, PanResponder, PanResponderInstance, View, ViewStyle, ViewProps } from 'react-native';

import { Animated } from 'react-native';

import colors from '../constants/colors';

interface Props extends ViewProps {
  limit?: number;
}

interface State {
  scale: number;
  radius: number;
}

export default class DraggableCard extends React.Component<Props, State> {
  static defaultProps = {
    limit: 40,
  };

  private pos = { x:0, y:0 };
  private panResponder: PanResponderInstance = null;
  private pan = new Animated.ValueXY({ x: 0, y: 0 });
  private scale = new Animated.Value(0);
  private radius = new Animated.Value(640);

  constructor(props: Props) {
    super(props);

    this.state = {
      scale: 0,
      radius: 640,
    }

    this.pan.addListener(({x, y}) => {
      this.pos.x = x < props.limit ? x : this.pos.x; 
      this.pos.y = y < props.limit ? y : this.pos.y; 
    });

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: (e, gesture) => {
        const x = gesture.moveX - gesture.x0;
        const y = gesture.moveY - gesture.y0;
        Animated.timing(this.pan, {
          toValue: { x: Math.abs(x) < props.limit ? x : this.pos.x, y: Math.abs(y) < props.limit ? y : this.pos.y },
          duration: 0,
          useNativeDriver: true
        }).start();
      },
      onPanResponderRelease: (e, gesture) => {
        Animated.spring(this.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: true
        }).start();
        Animated.timing(this.scale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true
        }).start();
      }
    });
  }

  componentDidMount()  {
    this.scale.addListener(({value}) => this.setState({scale: value}));
    this.radius.addListener(({value}) => this.setState({radius: value}));
    Animated.timing(this.scale, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
    }).start();
    Animated.timing(this.radius, {
      toValue: 3,
      duration: 600,
      useNativeDriver: true
    }).start();
  }

  render() {
    const panStyle = {
      transform: this.pan.getTranslateTransform(),
      scaleX: this.state.scale,
      scaleY: this.state.scale,
      borderRadius: this.state.radius,
    }

    return (
        <Animated.View {...this.panResponder.panHandlers} style={[styles.card, panStyle]}>
          <View style={styles.cardInner}>
            {this.props.children}
          </View>
        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.seconday,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 3,
    shadowColor: colors.secondayLight,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.45,
    shadowRadius: 10.00,

    elevation: 4,
  },
  cardInner: {
    padding: 24,
  }
});
