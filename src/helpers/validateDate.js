
export const validateDate = (startDate, startTime)=> {
  const currentDateTime = new Date();
  const startTimeString = `${startDate}T${startTime}`;
  const startDateAndTime = new Date(startTimeString);
  return currentDateTime >= startDateAndTime;
}