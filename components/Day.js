import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styles from './styles';

export default class Day extends Component {
  static defaultProps = {
    customStyle: {},
  }

  static propTypes = {
    caption: PropTypes.any,
    customStyle: PropTypes.object,
    filler: PropTypes.bool,
    hasEvent: PropTypes.bool,
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    onPress: PropTypes.func,
    usingEvents: PropTypes.bool,
  }

  dayCircleStyle = (isWeekend, isSelected, isToday,hasEvent,isHoliday) => {
    const { customStyle } = this.props;
    const dayCircleStyle = [styles.dayCircleFiller, customStyle.dayCircleFiller && customStyle.dayCircleFiller];

    if (hasEvent && hasEvent === true) {
      dayCircleStyle.push(styles.eventDayCircle, customStyle.eventDayCircle && customStyle.eventDayCircle);
    } 
    if (isHoliday) {
      dayCircleStyle.push(styles.weekendDayCircle, customStyle.weekendDayCircle && customStyle.weekendDayCircle);
    }
    if (isToday) {
      dayCircleStyle.push(styles.currentDayCircle, customStyle.currentDayCircle && customStyle.currentDayCircle);
    }
    if (isSelected && !isToday) {
      dayCircleStyle.push(styles.selectedDayCircle, customStyle.selectedDayCircle && customStyle.selectedDayCircle);
    }
    return dayCircleStyle;
  }

  dayTextStyle = (isWeekend, isSelected, isToday,hasEvent,isHoliday) => {
    const { customStyle } = this.props;
    const dayTextStyle = [styles.day, customStyle.day];

    if (isToday && !isSelected) {
      dayTextStyle.push(styles.currentDayText, customStyle.currentDayText && customStyle.currentDayText);
    } else if (isToday || isSelected) {
      dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText && customStyle.selectedDayText);
    }
     else if (isHoliday) {
      dayTextStyle.push(styles.weekendDayText, customStyle.weekendDayText && customStyle.weekendDayText);
    } 
    else if (hasEvent && hasEvent === true) {
      dayTextStyle.push(styles.eventDayText, customStyle.eventDayText && customStyle.eventDayText);
    } else if (isSelected) {
      dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText && customStyle.selectedDayText);
    }
    return dayTextStyle;
  }

  render() {
    let { caption, customStyle } = this.props;
    const {
      filler,
      hasEvent,
      isWeekend,
      isSelected,
      isToday,
      usingEvents,
      isHoliday,
    } = this.props;

    return filler
    ? (
        <TouchableWithoutFeedback>
          <View style={[styles.dayButtonFiller, customStyle.dayButtonFiller]}>
            <Text style={[styles.day, customStyle.day]} />
          </View>
        </TouchableWithoutFeedback>
      )
    : (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.dayButton, customStyle.dayButton]}>
          <View style={this.dayCircleStyle(isWeekend, isSelected, isToday,hasEvent,isHoliday)}>
            <Text style={this.dayTextStyle(isWeekend, isSelected, isToday,hasEvent,isHoliday)}>{caption}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
