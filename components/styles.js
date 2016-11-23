import { Dimensions, StyleSheet } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#f7f7f7',
  },
  monthContainer: {
    width: DEVICE_WIDTH,
  },
  calendarControls: {
    flex: 1,
    flexDirection: 'row',
  },
  controlButton: {
  },
  controlButtonText: {
    margin: 10,
    fontSize: 11,
    color: '#999999',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    margin: 10,
  },
  calendarHeading: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#e3e3e3',
    backgroundColor: '#efeff4',
    height: 33,
  },
  dayHeading: {
    flex: 1,
    fontSize: 11,
    color: '#999999',
    textAlign: 'center',
    marginVertical: 7,
  },
  weekendHeading: {
    flex: 1,
    fontSize: 11,
    color: '#999999',
    textAlign: 'center',
    marginVertical: 7,
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayButton: {
    alignItems: 'center',
    padding: 5,
    width: DEVICE_WIDTH / 7,
  },
  dayButtonFiller: {
    padding: 5,
    width: DEVICE_WIDTH / 7,
  },
  day: {
    fontSize: 11,
    alignSelf: 'center',
    color: '#454545'
  },
  eventIndicatorFiller: {
    marginTop: 3,
    borderColor: 'transparent',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  eventIndicator: {
    backgroundColor: '#cccccc',
  },
  dayCircleFiller: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  currentDayCircle: {
    backgroundColor: '#0B9444',
  },
  weekendDayCircle: {
    backgroundColor: '#ffc817',
  },
  eventDayCircle: {
    backgroundColor: '#1fd662',
  },
  eventInvalidateDayCircle: {
    backgroundColor: '#999999',
  },
  currentDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedDayCircle: {
    backgroundColor: 'black',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  weekendDayText: {
    color: 'white',
  },
  eventDayText: {
    color: 'white',
  },
});

export default styles;
