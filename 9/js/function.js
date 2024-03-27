const convertToMinute = (timeInHour) => {
  const time = timeInHour.split(':');
  const timeInMinyte = Number(time[0]) * 60 + Number(time[1]);
  return timeInMinyte;
};

const workDay = (startTime, endTime, startMeeting, timeMeeting) => {
  const startTimeMinute = convertToMinute(startTime);
  const endTimeMinute = convertToMinute(endTime);
  const startMeetingMinute = convertToMinute(startMeeting);

  if (startMeetingMinute + timeMeeting > endTimeMinute || startMeetingMinute < startTimeMinute) {
    return false;
  }{
    return true;
  }
};

export {workDay};

// console.log(workDay('08:00', '17:30', '14:00', 90));
// console.log(workDay('14:00', '17:30', '08:0', 90));
// console.log(workDay('8:30', '17:30', '08:00', 40));
// console.log(workDay('08:00', '14:30', '14:00', 90));
// console.log(workDay('8:0', '10:0', '8:0', 120));
