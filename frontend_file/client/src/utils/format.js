// export function formatDate(isoString) {
//   const date = new Date(isoString);
//   const options = {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   };
//   return `${date.toLocaleDateString("en-US", options)} ${date.toLocaleTimeString()}`;
// }

export function formatDate(isoString) {
  const date = new Date(isoString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return `${date.toLocaleDateString("en-US", options)} ${date.toLocaleTimeString()}`;
}

export function formatDateWithWeekday(isoString) {
  const date = new Date(isoString);
  const options = {
    weekday: "long",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

export function formatDateForTodoCard(isoString) {
  const date = new Date(isoString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
    return "Today";
  } else if (date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()) {
    return "Yesterday";
  } else {
    const options = {
      weekday: "long",
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }
}

export function priorityClassNameColor(priority) {
  switch (priority) {
    case "low":
      return "text-green-400";
    case "medium":
      return "text-yellow-300";
    case "high":
      return "text-red-500";
    case "notSet":
      return "text-transparent";
  }
}

export function priorityFormat(priority) {
  switch (priority) {
    case "low":
      return "Low";
    case "medium":
      return "Medium";
    case "high":
      return "High";
    case "notSet":
      return "Not Set";
  }
}

export function priorityTableColor(priority) {
  switch (priority) {
    case "low":
      return "text-green-400";
    case "medium":
      return "text-yellow-300";
    case "high":
      return "text-red-500";
    case "notSet":
      return "text-gray-600 dark:text-dark-subtext";
  }
}

export function formatDateForDeadline(isoString) {
  if (!isoString) {
    return "Deadline is not set";
  }

  const now = new Date();
  const timeDif = new Date(isoString) - now;
  if (timeDif <= 0) {
    return "Passed";
  }

  const date = new Date(isoString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return `${date.toLocaleDateString("en-US", options)} ${date.toLocaleTimeString()}`;
}
