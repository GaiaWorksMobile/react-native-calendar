import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Day from './Day';

import moment from 'moment';
import styles from './styles';

const DEVICE_WIDTH = Dimensions.get('window').width;
const VIEW_INDEX = 2;

export default class Calendar extends Component {

  state = {
    currentMonthMoment: moment(this.props.startDate),
    selectedMoment: moment(this.props.selectedDate),
  };

  static propTypes = {
    customStyle: PropTypes.object,
    dayHeadings: PropTypes.array,
    eventDates: PropTypes.array,
    monthNames: PropTypes.array,
    nextButtonText: PropTypes.string,
    onDateSelect: PropTypes.func,
    onSwipeNext: PropTypes.func,
    onSwipePrev: PropTypes.func,
    onTouchNext: PropTypes.func,
    onTouchPrev: PropTypes.func,
    prevButtonText: PropTypes.string,
    scrollEnabled: PropTypes.bool,
    selectedDate: PropTypes.any,
    showControls: PropTypes.bool,
    startDate: PropTypes.any,
    titleFormat: PropTypes.string,
    today: PropTypes.any,
    weekStart: PropTypes.number,
  };

  static defaultProps = {
    customStyle: {},
    dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    eventDates: [],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    nextButtonText: 'Next',
    prevButtonText: 'Prev',
    scrollEnabled: false,
    showControls: false,
    startDate: moment().format('YYYY-MM-DD'),
    titleFormat: 'MMMM YYYY',
    today: moment(),
    weekStart: 1,
  };

  componentDidMount() {
    this.scrollToItem(VIEW_INDEX);
  }

  componentDidUpdate() {
    this.scrollToItem(VIEW_INDEX);
  }

  getMonthStack(currentMonth) {
    if (this.props.scrollEnabled) {
      const res = [];
      for (let i = -VIEW_INDEX; i <= VIEW_INDEX; i++) {
        res.push(moment(currentMonth).add(i, 'month'));
      }
      return res;
    }
    return [moment(currentMonth)];
  }

 prepareEventDates(eventDates) {
    const parsedDates = {};

    eventDates.forEach(event => {
      const date = moment(event);
      const month = moment(date).startOf('month').format();
      if (!parsedDates[month]) {
        parsedDates[month] = {};
      }
      parsedDates[month][date.date() - 1] = true;
    })
    return parsedDates;
  }

  prepareHolidayDates(eventDates) {
    const parsedDates = {};

    eventDates.forEach(event => {
      const date = moment(event);
      const month = moment(date).startOf('month').format();
      if (!parsedDates[month]) {
        parsedDates[month] = {};
      }
      parsedDates[month][date.date() - 1] = true;
    })
    return parsedDates;
  }

  selectDate(date) {
    this.setState({ selectedMoment: date });
    this.props.onDateSelect && this.props.onDateSelect(date.format());
  }

  onPrev = () => {
    const newMoment = moment(this.state.currentMonthMoment).subtract(1, 'month');
    
    this.setState({ currentMonthMoment: newMoment });
    this.props.onTouchPrev && this.props.onTouchPrev(newMoment);
  }

  onNext = () => {
    const newMoment = moment(this.state.currentMonthMoment).add(3, 'month');
    this.setState({ currentMonthMoment: newMoment });
    this.props.onTouchNext && this.props.onTouchNext(newMoment);
  }
  //下标由0开始
  jump(YearIndex, monthIndex) {
    let currentMonth = moment(this.state.currentMonthMoment).month();
    let dis = monthIndex - currentMonth;
    let currentYear = moment(this.state.currentMonthMoment).year();
    let disYear = YearIndex - currentYear;
    console.log('currentYear:  ' + currentYear);
    const newMoment = moment(this.state.currentMonthMoment).add(dis, 'month').add(disYear, 'year');
    console.log('newMoment' + newMoment.format('YYYY-MM-DD'));
    this.setState({ currentMonthMoment: newMoment });
    this.props.onTouchNext && this.props.onTouchNext(newMoment);
  }

  scrollToItem(itemIndex) {
    const scrollToX = itemIndex * DEVICE_WIDTH;
    if (this.props.scrollEnabled) {
      this._calendar.scrollTo({ y: 0, x: scrollToX, animated: false });
    }
  }

  scrollEnded(event) {
    const position = event.nativeEvent.contentOffset.x;
    const currentPage = position / DEVICE_WIDTH;
    const newMoment = moment(this.state.currentMonthMoment).add(currentPage - VIEW_INDEX, 'month');
    this.setState({ currentMonthMoment: newMoment });

    if (currentPage < VIEW_INDEX) {
      this.props.onSwipePrev && this.props.onSwipePrev();
    } else if (currentPage > VIEW_INDEX) {
      this.props.onSwipeNext && this.props.onSwipeNext();
    }
  }

  renderMonthView(argMoment, eventDatesMap, holidayDatesMap) {
    let
      renderIndex = 0,
      weekRows = [],
      days = [],
      startOfArgMonthMoment = argMoment.startOf('month');
      console.log(`argMoment : ${argMoment.format('YYYY-MM-DD')}`);

    const
      selectedMoment = moment(this.state.selectedMoment),
      weekStart = this.props.weekStart,
      todayMoment = moment(this.props.today),
      todayIndex = todayMoment.date() - 1,
      argMonthDaysCount = argMoment.daysInMonth(),
      offset = (startOfArgMonthMoment.isoWeekday() - weekStart + 7) % 7,
      argMonthIsToday = argMoment.isSame(todayMoment, 'month'),
      selectedIndex = moment(selectedMoment).date() - 1,
      selectedMonthIsArg = selectedMoment.isSame(argMoment, 'month');

    const events = (eventDatesMap !== null)
      ? eventDatesMap[argMoment.startOf('month').format()]
      : null;

    const holiday = (holidayDatesMap !== null)
      ? holidayDatesMap[argMoment.startOf('month').format()]
      : null;

    do {
      const dayIndex = renderIndex - offset;
      const isoWeekday = (renderIndex + weekStart) % 7;
      let temp = moment(startOfArgMonthMoment).set('date', dayIndex + 2);
      if (dayIndex >= 0 && dayIndex < argMonthDaysCount) {
        days.push((
          <Day
            startOfMonth={startOfArgMonthMoment}
            isWeekend={isoWeekday === 0 || isoWeekday === 6}
            key={`${renderIndex}`}
            onPress={() => {
              console.log('dayIndex :  '+dayIndex);
              this.selectDate(moment(startOfArgMonthMoment).set('date', dayIndex + 1));
            }}
            caption={`${dayIndex + 1}`}
            isBefore={temp.isBefore(todayMoment)}
            isToday={argMonthIsToday && (dayIndex === todayIndex)}
            isSelected={selectedMonthIsArg && (dayIndex === selectedIndex)}
            hasEvent={events && events[dayIndex] === true}
            isHoliday={holiday && holiday[dayIndex] === true}
            usingEvents={this.props.eventDates.length > 0}
            customStyle={this.props.customStyle}
          />
        ));
      } else {
        days.push(<Day key={`${renderIndex}`} filler />);
      }
      if (renderIndex % 7 === 6) {
        weekRows.push(
          <View
            key={weekRows.length}
            style={[styles.weekRow, this.props.customStyle.weekRow]}
          >
            {days}
          </View>);
        days = [];
        if (dayIndex + 1 >= argMonthDaysCount) {
          break;
        }
      }
      renderIndex += 1;
    } while (true)
    return <View key={argMoment.month()} style={styles.monthContainer}>{weekRows}</View>;
  }

  componentWillMount(){
    let {onClickDay} = this.props;
    if(onClickDay)
      onClickDay();
  }

  renderHeading() {
    const headings = [];
    for (let i = 0; i < 7; i++) {
      const j = (i + this.props.weekStart) % 7;
      headings.push(
        <Text
          allowFontScaling={false}
          key={i}
          style={j === 0 || j === 6 ?
            [styles.weekendHeading, this.props.customStyle.weekendHeading] :
            [styles.dayHeading, this.props.customStyle.dayHeading]}
        >
          {this.props.dayHeadings[j]}
        </Text>
      );
    }

    return (
      <View style={[styles.calendarHeading, this.props.customStyle.calendarHeading]}>
        {headings}
      </View>
    );
  }

  renderTopBar() {
    let localizedMonth = this.props.monthNames[this.state.currentMonthMoment.month()];
    return this.props.showControls
    ? (
        <View style={[styles.calendarControls, this.props.customStyle.calendarControls]}>
          <TouchableOpacity
            style={[styles.controlButton, this.props.customStyle.controlButton]}
            onPress={this.onPrev}
          >
            <Text allowFontScaling={false} style={[styles.controlButtonText, this.props.customStyle.controlButtonText]}>
              {this.props.prevButtonText}
            </Text>
          </TouchableOpacity>
          <Text allowFontScaling={false} style={[styles.title, this.props.customStyle.title]}>
            {localizedMonth} {this.state.currentMonthMoment.year()}
          </Text>
          <TouchableOpacity
            style={[styles.controlButton, this.props.customStyle.controlButton]}
            onPress={this.onNext}
          >
            <Text allowFontScaling={false} style={[styles.controlButtonText, this.props.customStyle.controlButtonText]}>
              {this.props.nextButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      )
    : null;
  }

  render() {
    const calendarDates = this.getMonthStack(this.state.currentMonthMoment);
    const eventDatesMap = this.prepareEventDates(this.props.eventDates);
    const holidayDatesMap = this.prepareHolidayDates(this.props.holidayDates);

    return (
      <View style={[styles.calendarContainer, this.props.customStyle.calendarContainer]}>
        {this.renderTopBar()}
        {this.renderHeading(this.props.titleFormat)}
        {this.props.scrollEnabled ?
          <ScrollView
            ref={calendar => this._calendar = calendar}
            horizontal
            scrollEnabled
            pagingEnabled
            removeClippedSubviews
            scrollEventThrottle={1000}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets
            onMomentumScrollEnd={(event) => this.scrollEnded(event)}
          >
            {calendarDates.map((date) => this.renderMonthView(moment(date), eventDatesMap, holidayDatesMap))}
          </ScrollView>
          :
          <View ref={calendar => this._calendar = calendar}>
            {calendarDates.map((date) => this.renderMonthView(moment(date), eventDatesMap, holidayDatesMap))}
          </View>
        }
      </View>
    );
  }
}
