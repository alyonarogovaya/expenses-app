export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function isValidDateFormat(date) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;

  const [year, month, day] = date.split('-').map(Number);
  const parsedDate = new Date(date);

  return (
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() + 1 === month &&
    parsedDate.getDate() === day
  );
}

export function isFutureDate(date) {
  const parsedDate = new Date(date);

  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return parsedDate >= tomorrow;
}
