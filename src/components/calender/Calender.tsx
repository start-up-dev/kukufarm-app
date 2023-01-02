import isEmpty from 'lodash/isEmpty';
import React, {useState, useCallback, useEffect, FC} from 'react';
import {
  Platform,
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';

import {renderColor} from 'utils/renderEmoji';
import {getFullDate} from 'utils/calender';
import SingleFrdCheckin from './SingleFrdCheckin';
import {classes, theme} from 'styles/theme';
import {ICheckIn} from 'interfaces/ICheckin';

const today = new Date().toISOString().split('T')[0];

const themeColor = theme.colors.primary;
// const lightThemeColor = `${Material.brandPrimary}88`;
const lightThemeColor = '#EBF9F9';

function getMarkedDates(items: any) {
  const marked = {};

  items?.forEach((item: any) => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      // marked[item.title] = {marked: true};
      const dots = [];
      item?.data?.map(el => {
        // console.log(el);
        dots.push({
          key: el?.createdAt,
          color: renderColor(el?.status),
          // selectedDotColor: themeColor,
        });
      });

      marked[item.title] = {dots};
    } else {
      marked[item.title] = {disabled: true};
    }
  });
  return marked;
}

function getTheme() {
  const disabledColor = 'grey';

  return {
    // arrows
    arrowColor: 'black',
    arrowStyle: {padding: 0},
    // month
    monthTextColor: 'black',
    textMonthFontSize: 16,
    textMonthFontWeight: 'bold',
    // day names
    textSectionTitleColor: 'black',
    textDayHeaderFontSize: 12,
    textDayHeaderFontWeight: 'normal',
    // dates
    dayTextColor: themeColor,
    textDayFontSize: 18,
    textDayFontWeight: '500',
    textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
    // selected date
    selectedDayBackgroundColor: themeColor,
    selectedDayTextColor: 'white',
    // disabled date
    textDisabledColor: disabledColor,
    // dot (marked date)
    dotColor: themeColor,
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: {marginTop: -2},
  };
}

// const leftArrowIcon = require('../img/previous.png');
// const rightArrowIcon = require('../img/next.png');

interface IProps {
  notifications: any;
  getData: any;
  weekView?: any;
  isLoading: boolean;
}

const Calender: FC<IProps> = ({
  notifications,
  getData,
  weekView,
  isLoading,
}) => {
  const [fallBackDate, setFallBackDate] = useState(new Date());
  // const [marked, setMarked] = useState(getMarkedDates(notifications));
  const marked = getMarkedDates(notifications);
  const theme = getTheme();
  const todayBtnTheme = {
    todayButtonTextColor: themeColor,
  };

  const onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  const onMonthChange = (filter: any, updateSource: any) => {
    setFallBackDate(new Date(filter.dateString));
    getData(filter.year, filter.month);
    console.log(filter);
  };

  const renderItem = ({item}: {item: ICheckIn}) => {
    return <SingleFrdCheckin checkIn={item} key={item?.createdAt} />;
  };

  // useEffect(() => {
  //   setMarked(getMarkedDates(notifications));
  // }, [notifications]);

  return (
    <CalendarProvider
      date={notifications?.[0]?.title || getFullDate(fallBackDate)}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
      theme={todayBtnTheme}
      // todayBottomMargin={16}
      style={{borderTopStartRadius: 15, backgroundColor: '#fff'}}>
      {weekView ? (
        <WeekCalendar
          testID={testIDs.weekCalendar.CONTAINER}
          firstDay={1}
          markedDates={marked}
        />
      ) : (
        <ExpandableCalendar
          testID={testIDs.expandableCalendar.CONTAINER}
          displayLoadingIndicator={isLoading}
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.calendar} // for horizontal only
          // disableWeekScroll
          theme={theme}
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={marked}
          // leftArrowImageSource={leftArrowIcon}
          // rightArrowImageSource={rightArrowIcon}
          // animateScroll
          markingType="multi-dot"
          style={{marginBottom: 12}}
        />
      )}
      {notifications.length > 0 ? (
        <AgendaList
          sections={notifications}
          renderItem={renderItem}
          // scrollToNextEvent
          sectionStyle={styles.section}
          // dayFormat={'YYYY-MM-d'}
          contentContainerStyle={styles.content}
        />
      ) : (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 50,
            fontSize: 18,
            color: 'gray',
          }}>
          There is no check in
        </Text>
      )}
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
    textAlignVertical: 'center',
    paddingBottom: 18,
    paddingTop: 19,
    borderRadius: 3,
    fontSize: 13,
    ...classes.shadow,
  },
  content: {
    // ...style.shadow,
    marginHorizontal: 15,
  },
});

export default Calender;
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
