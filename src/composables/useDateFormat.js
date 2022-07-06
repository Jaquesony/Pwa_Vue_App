export default function useDateFormat(date) {
  date == null
    ? ""
    : (typeof date === "string"
        ? new Date(date.trim())
        : date
      ).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  return useDateFormat;
}
