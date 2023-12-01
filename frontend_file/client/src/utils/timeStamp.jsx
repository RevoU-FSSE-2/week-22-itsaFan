export function timePassed(date) {
  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
  const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;
  const SECONDS_IN_MONTH = SECONDS_IN_DAY * 30;
  const SECONDS_IN_YEAR = SECONDS_IN_DAY * 365;

  const elapsedSeconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(elapsedSeconds / SECONDS_IN_YEAR);
  if (interval >= 1) {
    return interval + (interval === 1 ? " year ago" : " years ago");
  }

  interval = Math.floor(elapsedSeconds / SECONDS_IN_MONTH);
  if (interval >= 1) {
    return interval + (interval === 1 ? " month ago" : " months ago");
  }

  interval = Math.floor(elapsedSeconds / SECONDS_IN_DAY);
  if (interval >= 1) {
    return interval + (interval === 1 ? " day ago" : " days ago");
  }

  interval = Math.floor(elapsedSeconds / SECONDS_IN_HOUR);
  if (interval >= 1) {
    return interval + (interval === 1 ? " hour ago" : " hours ago");
  }

  interval = Math.floor(elapsedSeconds / SECONDS_IN_MINUTE);
  if (interval >= 1) {
    return interval + (interval === 1 ? " minute ago" : " minutes ago");
  }

  return "Just now";
}

export function timeUntil(deadline) {
  if (!deadline) {
    return;
  }

  const now = new Date();
  const timeDifference = new Date(deadline) - now;
  if (timeDifference <= 0) {
    return <span className="dark:text-red-400 text-red-500">Deadline Passed</span>;
  }
  const text = "Set Deadline: ";
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 7) {
    return text + Math.floor(days / 7) + " weeks left";
  } else if (days > 1) {
    return text + days + " days left";
  } else if (days === 1) {
    return text + "1 day left";
  } else if (hours > 1) {
    return text + hours + " hours left";
  } else if (hours === 1) {
    return text + "1 hour left";
  } else {
    return text + "less than an hour left";
  }
}
