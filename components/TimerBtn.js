import React from "react";
import { Button } from "react-native";

export default class TimerBtn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.timerState) {
      return <Button title="stop" onPress={this.props.timerFunc} />;
    } else {
      return <Button title="start" onPress={this.props.timerFunc} />;
    }
  }
}
