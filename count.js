const ProductionCycle = require("./ProdCycle");

// Inisialisasi dengan waktu mulai jam 07:40:00 hari ini dan waktu akhir jam 07:30:00 besok
const startHour = 7;
const startMinute = 40;
const startSecond = 0;

const endHour = 7;
const endMinute = 30;
const endSecond = 0;

// Atur waktu istirahat (bisa lebih dari satu)
const breakTimes = [
  {
    startHour: 10,
    startMinute: 10,
    startSecond: 0,
    endHour: 10,
    endMinute: 25,
    endSecond: 0,
  },
  {
    startHour: 12,
    startMinute: 0,
    startSecond: 0,
    endHour: 13,
    endMinute: 0,
    endSecond: 0,
  },
  {
    startHour: 15,
    startMinute: 0,
    startSecond: 0,
    endHour: 15,
    endMinute: 10,
    endSecond: 0,
  },
];

// Atur cycle time yang berubah pada waktu tertentu
const cycleIntervals = [
  { startHour: 7, startMinute: 40, startSecond: 0, durationSeconds: 180 }, // 180 detik
  { startHour: 10, startMinute: 30, startSecond: 0, durationSeconds: 220 }, // 220 detik
  { startHour: 14, startMinute: 0, startSecond: 0, durationSeconds: 135 }, // 135 detik
];

const cycle = new ProductionCycle(
  startHour,
  startMinute,
  startSecond,
  endHour,
  endMinute,
  endSecond,
  breakTimes,
  cycleIntervals
);

const totalTime = cycle.getTotalProductionTime();
console.log(
  `Total production time (excluding breaks): ${totalTime.hours} hours, ${totalTime.minutes} minutes, ${totalTime.seconds} seconds`
);

const cycleTimes = cycle.getCycleTimes();
console.log("Cycle times:");
cycleTimes.forEach((cycle, index) => {
  console.log(
    `Cycle ${index + 1}: Start Time: ${cycle.startTime}, End Time: ${
      cycle.endTime
    }, Duration: ${cycle.cycleDurationSeconds} seconds, Interval Duration: ${
      cycle.intervalDuration
    } seconds`
  );
});
