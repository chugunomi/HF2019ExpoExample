import React from 'react';
import { StyleSheet, PanResponder, PanResponderInstance, View, ViewProps } from 'react-native';

import { Animated } from 'react-native';

import colors from '../constants/colors';

interface Props extends ViewProps {
  limit?: number;
}

interface State {
  marginTop: number;
  radius: number;
}

export default class DraggableCard extends React.PureComponent<Props, State> {
  static defaultProps = {
    limit: 40,
  };

  private pos = { x:0, y:0 };
  private panResponder: PanResponderInstance = null;
  private pan = new Animated.ValueXY({ x: 0, y: 0 });
  private marginTop = new Animated.Value(-120);
  private radius = new Animated.Value(640);

  constructor(props: Props) {
    super(props);

    this.state = {
      marginTop: -120,
      radius: 640,
    };

    this.pan.addListener(({x, y}) => {
      this.pos.x = x < props.limit ? x : this.pos.x;
      this.pos.y = y < props.limit ? y : this.pos.y;
    });

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        const x = gesture.moveX - gesture.x0;
        const y = gesture.moveY - gesture.y0;
        Animated.timing(this.pan, {
          toValue: { x: Math.abs(x) < props.limit ? x : this.pos.x, y: Math.abs(y) < props.limit ? y : this.pos.y },
          duration: 0,
          useNativeDriver: true
        }).start();
      },
      onPanResponderRelease: () => {
        Animated.spring(this.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: true
        }).start();
        Animated.timing(this.marginTop, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true
        }).start();
      }
    });
  }

  componentDidMount()  {
    this.marginTop.addListener(({value}) => this.setState({marginTop: value}));
    this.radius.addListener(({value}) => this.setState({radius: value}));
    Animated.timing(this.marginTop, {
      toValue: 0,
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
      marginTop: this.state.marginTop,
      borderRadius: this.state.radius,
    };

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
