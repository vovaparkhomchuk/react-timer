import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import TimerBtn from './TimerBtn'

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})


export default class Timer extends React.Component {
  constructor() {
    super()
    this.state = {
      workTime: 65,
      normWorkTime: '',
      breakTime: 60,
      normBreakTime: '',
      breakPart: false,
      timerOn: false,
    }
  }

  componentDidMount() {
    this.correctTime();
  }

  decreaseTime = () => {
    this.setState(prevStates => ({
      workTime: prevStates.workTime - 1,
    }))
    if (this.state.workTime === 0) {
      clearInterval(this.interval);
    }
    console.log(this.state.workTime);
    this.correctTime();
  }

  correctTime = () => {
    const workMins =
      this.state.workTime % 60 === 0 ? '00' :
        (this.state.workTime % 60).toString().length === 1 ? '0' + (this.state.workTime % 60).toString() :
          (this.state.workTime % 60).toString();
    const breakMins =
      this.state.breakTime % 60 === 0 ? '00' :
        (this.state.breakTime % 60).toString().length === 1 ? '0' + (this.state.breakTime % 60).toString() :
          (this.state.breakTime % 60).toString();

    this.setState(prevStates => ({
      normWorkTime: (Math.floor(prevStates.workTime / 60)).toString() + ':' + workMins,
      normBreakTime: (Math.floor(prevStates.breakTime / 60)).toString() + ':' + breakMins,
    }))

    console.log(this.state)
  }

  startTimer = () => {
    if (!this.state.timerOn) {
      this.interval = setInterval(this.decreaseTime, 1000)
      this.setState(prevStates => ({
        timerOn: !prevStates.timerOn,
      }))
    } else {
      clearInterval(this.interval)
      this.setState(prevStates => ({
        timerOn: !prevStates.timerOn,
      }))
    }
  }


  render() {
    return (
      <View style={styles.timerContainer}>
        <Text style={{ fontSize: 42 }}>
          {this.state.normWorkTime}
        </Text>
        <TimerBtn timerState={this.state.timerOn} timerFunc={this.startTimer} />
      </View>
    )
  }
}

