import React, { Component } from 'react'
import { StyleSheet, Text, View, Easing } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class ProgressWeight extends Component {
    state = {
        points: 65,
        target_weight: 200,
        fill : 0
    };
    componentDidMount = () => {
        const {points, target_weight} = this.state
        let fill = points / target_weight * 100;
        this.refs.circularprogress.animate(fill, 5000);
        setTimeout(() => {
            fill = 90 / target_weight * 100
            this.refs.circularprogress.animate(fill, 2000);
        }, 7000);
    }
    render() {
        const {points, target_weight, fill} = this.state
        
        return (
            <AnimatedCircularProgress
                size={220}
                width={15}
                backgroundWidth={5}
                fill={fill}
                ref="circularprogress"
                tintColor="#0f8bc4"
                backgroundColor="#3d5875"
                arcSweepAngle={240}
                rotation={240}
                lineCap="round"
            >
                {(fill) => (
                <Text style={styles.points}>
                    { Math.round(target_weight * fill / 100) } KG
                </Text>
                )}
            </AnimatedCircularProgress>
        )
    }
}
const styles = StyleSheet.create({
    points: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 72,
      left: 56,
      width: 90,
      textAlign: 'center',
      color: '#7591af',
      fontSize: 30,
      fontWeight: "100"
    }
})
