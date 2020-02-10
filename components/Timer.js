import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import TimerBtn from "./TimerBtn";
import { vibrate } from "../utils";

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bigFont: {
    fontSize: 42
  }
});

const ActivityType = props => {
  if (!props.phaze) {
    return <Text style={styles.bigFont}>Work Time</Text>;
  } else {
    return <Text style={styles.bigFont}>Break Time</Text>;
  }
};

export default class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      workT: 7,
      breakT: 5,
      currentTime: 0,
      normcurrentTime: "",
      timerOn: false,
      secondPhaze: false
    };
  }

  componentDidMount() {
    this.correctTime();
  }

  componentWillMount() {
    if (!this.state.secondPhaze) {
      this.setState({
        currentTime: this.state.workT
      });
    }
  }

  decreaseTime = () => {
    this.setState(prevStates => ({
      currentTime: prevStates.currentTime - 1
    }));
    if (this.state.currentTime === 0 && !this.state.secondPhaze) {
      vibrate();
      clearInterval(this.interval);
      this.setState({
        secondPhaze: true,
        currentTime: this.state.breakT
      });
      this.interval = setInterval(this.decreaseTime, 1000);
    } else if (this.state.currentTime === 0 && this.state.secondPhaze) {
      vibrate();
      clearInterval(this.interval);
      this.setState({
        timerOn: false,
        currentTime: this.state.workT,
        secondPhaze: false
      });
    }
    console.log(this.state.currentTime);
    this.correctTime();
  };

  correctTime = () => {
    const workMins =
      this.state.currentTime % 60 === 0
        ? "00"
        : (this.state.currentTime % 60).toString().length === 1
        ? "0" + (this.state.currentTime % 60).toString()
        : (this.state.currentTime % 60).toString();

    this.setState(prevStates => ({
      normcurrentTime:
        Math.floor(prevStates.currentTime / 60).toString() + ":" + workMins
    }));

    console.log(Math.floor(this.currentTime / 60).toString() + ":" + workMins);
  };

  startTimer = () => {
    if (!this.state.timerOn) {
      this.interval = setInterval(this.decreaseTime, 1000);
      this.setState(prevStates => ({
        timerOn: !prevStates.timerOn
      }));
    } else {
      clearInterval(this.interval);
      this.setState(prevStates => ({
        timerOn: !prevStates.timerOn
      }));
    }
  };

  render() {
    return (
      <View style={styles.timerContainer}>
        <ActivityType phaze={this.state.secondPhaze} />
        <Text style={styles.bigFont}>{this.state.normcurrentTime}</Text>
        <TimerBtn timerState={this.state.timerOn} timerFunc={this.startTimer} />
      </View>
    );
  }
}
