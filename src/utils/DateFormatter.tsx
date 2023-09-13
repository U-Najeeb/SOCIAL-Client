export function FormatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) {
    return "Now";
  } else if (diff < hour) {
    const minutesAgo = Math.floor(diff / minute);
    return `${minutesAgo} min ago`;
  } else if (diff < day) {
    const hoursAgo = Math.floor(diff / hour);
    return `${hoursAgo} hours ago`;
  } else if (diff < week) {
    const daysAgo = Math.floor(diff / day);
    return `${daysAgo} days ago`;
  } else if (diff < month) {
    const weeksAgo = Math.floor(diff / week);
    return `${weeksAgo} weeks ago`;
  } else if (diff < year) {
    const monthsAgo = Math.floor(diff / month);
    return `${monthsAgo} months ago`;
  } else {
    const yearsAgo = Math.floor(diff / year);
    return `${yearsAgo} years ago`;
  }
}
