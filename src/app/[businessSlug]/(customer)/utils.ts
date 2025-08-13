// Get range for valid duration options
export function createInclusiveRange(start: number, end: number) {
  const result = [];

  const min = Math.min(start, end);
  const max = Math.max(start, end);

  for (let i = min; i <= max; i++) {
    result.push(String(i));
  }

  return result;
}

// Get formatted time slots
export function getFormattedTimeSlots(
  duration: string,
  operatingHoursStart: string,
  operatingHoursEnd: string
): string[] {
  const rawSlots = createValidTimeSlots(
    duration,
    operatingHoursStart,
    operatingHoursEnd
  );

  return rawSlots.map(slot => {
    const formattedStart = formatTimeToAMPM(slot.start);
    const formattedEnd = formatTimeToAMPM(slot.end);

    return `${formattedStart} - ${formattedEnd}`;
  });
}

function createValidTimeSlots(
  duration: string,
  operatingHoursStart: string,
  operatingHoursEnd: string
): { start: string; end: string }[] {
  const timeSlots: { start: string; end: string }[] = [];

  // Convert duration from an hour string to minutes
  const durationInMinutes = parseInt(duration) * 60;

  // Convert operating hours to minutes from midnight
  const opStartMinutes = timeToMinutes(operatingHoursStart);
  const opEndMinutes = timeToMinutes(operatingHoursEnd);

  // Iterate and create time slots
  let currentSlotStartMinutes = opStartMinutes;

  while (true) {
    const currentSlotEndTimes = currentSlotStartMinutes + durationInMinutes;

    // If the end time of the current slot exceeds the operating hours end,
    // then no more valid slots can be created.
    if (currentSlotEndTimes > opEndMinutes) {
      break;
    }

    // Add the valid time slot to the array
    timeSlots.push({
      start: minutesToTime(currentSlotStartMinutes),
      end: minutesToTime(currentSlotEndTimes),
    });

    // Move to the next potential slot start time
    currentSlotStartMinutes += 60;
  }

  return timeSlots;
}

// Converts "22:00" to "10:00 PM"
function formatTimeToAMPM(time24hr: string): string {
  const [hoursStr, minutesStr] = time24hr.split(":");

  let hours = parseInt(hoursStr);
  let minutes = parseInt(minutesStr);

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  // Pad with leading 0
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${hours}:${formattedMinutes} ${ampm}`;
}

// Converts "HH:MM" string to total minutes from midnight
function timeToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

// Converts total minutes to a 24 hr format "HH:MM" string
function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Pad with leading 0
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
}
