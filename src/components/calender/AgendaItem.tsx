import isEmpty from 'lodash/isEmpty';
import React, {Component, useCallback} from 'react';
import {
  Platform,
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import SingleFrdCheckin from './SingleFrdCheckin';

const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';

const AgendaItem = React.memo(function AgendaItem(props) {
  const {item} = props;

  // const buttonPressed = useCallback(() => {
  //   Alert.alert('Show me more');
  // }, []);

  // const itemPressed = useCallback(() => {
  //   Alert.alert(item?.title);
  // }, []);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <View>
      <SingleFrdCheckin item={item} />
    </View>
    // <TouchableOpacity
    //   onPress={itemPressed}
    //   style={styles.item}
    //   testID={testIDs.agenda.ITEM}>
    //   <View>
    //     <Text style={styles.itemHourText}>{item?.hour}</Text>
    //     <Text style={styles.itemDurationText}>{item?.duration}</Text>
    //   </View>
    //   <Text style={styles.itemTitleText}>{item?.checkinText}</Text>
    //   <View style={styles.itemButtonContainer}>
    //     <Button color={'grey'} title={'Info'} onPress={buttonPressed} />
    //   </View>
    // </TouchableOpacity>
  );
});

export default AgendaItem;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});

export const testIDs = {
  menu: {
    CONTAINER: 'menu',
    CALENDARS: 'calendars_btn',
    CALENDAR_LIST: 'calendar_list_btn',
    HORIZONTAL_LIST: 'horizontal_list_btn',
    AGENDA: 'agenda_btn',
    EXPANDABLE_CALENDAR: 'expandable_calendar_btn',
    WEEK_CALENDAR: 'week_calendar_btn',
    TIMELINE_CALENDAR: 'timeline_calendar_btn',
  },
  calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar',
  },
  calendarList: {CONTAINER: 'calendarList'},
  horizontalList: {CONTAINER: 'horizontalList'},
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item',
  },
  expandableCalendar: {CONTAINER: 'expandableCalendar'},
  weekCalendar: {CONTAINER: 'weekCalendar'},
};
