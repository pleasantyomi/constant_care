// Formatting for callback slots. Dates are plain "YYYY-MM-DD" and times
// "HH:MM" in Atlantic time (the office's time zone), so no time-zone maths:
// format them as calendar values.

export function formatCallbackDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatCallbackTime(time: string) {
  const [h, min] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(min).padStart(2, "0")} ${suffix}`;
}

export function formatCallbackSlot(date: string, time: string) {
  return `${formatCallbackDate(date)} at ${formatCallbackTime(time)}`;
}
