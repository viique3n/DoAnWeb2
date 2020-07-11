import React, { Component } from 'react';

export default class Timer extends Component {
  state = {
    thoigianotp: 3,
    seconds: 0,
  };

  countDown() {
    this.myInterval = setInterval(() => {
      const { seconds, thoigianotp } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (thoigianotp === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ thoigianotp }) => ({
            thoigianotp: thoigianotp - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }
  componentDidMount() {
    this.countDown();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { thoigianotp, seconds } = this.state;
    return (
      <div>
        {thoigianotp === 0 && seconds === 0 ? (
          <h1>Busted!</h1>
        ) : (
          <h1>
            Time Remaining: {thoigianotp}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </h1>
        )}
      </div>
    );
  }
}
