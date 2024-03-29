export function getDate(createdAt: Date) {
  const dayDeffirence = new Date().getDay() - createdAt.getDay();

  if (dayDeffirence === 0) {
    if (new Date().getHours() - createdAt.getHours() === 0) {
      return new Date().getMinutes() - createdAt.getMinutes() + " minute ago";
    } else {
      return new Date().getHours() - createdAt.getHours() + " hours ago";
    }
  } else if (dayDeffirence === 1) {
    return (
      "Yesterday at " +
      createdAt.toLocaleTimeString("eng-US", { hour: "numeric", minute: "numeric" })
    );
  }
  return (
    createdAt.toLocaleDateString() +
    " at " +
    createdAt.toLocaleTimeString("eng-US", { hour: "numeric", minute: "numeric" })
  );
}
