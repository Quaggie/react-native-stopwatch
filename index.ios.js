var React = require('react-native');
var formatTime = require('minutes-seconds-milliseconds');
var {
  Text,
  View,
  TouchableHighlight,
  AppRegistry,
  StyleSheet
} = React;

// StopWatch component
var StopWatch = React.createClass({

  getInitialState () {
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    };
  },

  render () {
    return <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          {this.startStopButton()}
          {this.lapButton()}
          {this.clearButton()}
        </View>
      </View>

      <View style={styles.footer}>
        {this.laps()}
      </View>
    </View>
  },

  laps () {
    return this.state.laps.map((time, index) => {
      return <View key={index} style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    })
  },

  startStopButton () {
    var style = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleStartPress}
      style={[styles.button, style]}>
      <Text>
        {this.state.running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  },

  lapButton () {
    return <TouchableHighlight
      style={styles.button}
      underlayColor='gray'
      onPress={this.handleLapPress}>
      <Text>
        Lap
      </Text>
    </TouchableHighlight>
  },

  clearButton () {
    if (this.state.running) {
      return <TouchableHighlight
        underlayColor='red'
        style={[styles.button]}>
        <Text>
          Reset
        </Text>
      </TouchableHighlight>
    } else {
      return <TouchableHighlight
        underlayColor='gray'
        onPress={this.handleClearPress}
        style={[styles.button]}>
        <Text>
          Reset
        </Text>
      </TouchableHighlight>
    }
  },

  handleLapPress () {
    var lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  },

  handleStartPress () {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return;
    }

    var startTime = new Date();
    this.setState({startTime: new Date()});

    // Update state with a new value
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);

  },

  handleClearPress () {

    this.setState({
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    });
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    alignItems: 'stretch'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5, // Takes up to 5/8ths of the available space
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3, // Takes up 3/8ths of the available space
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
