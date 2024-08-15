const ProductionCycle = require("./ProductionCycle.js");

class GenerateCycle {
  constructor() {
    this.schedule = [];
    this.plan = 0;
    this.ct = 0;
    this.line = null;
  }
  compareTime(targetTimeStr) {
    // Parsing waktu target dari string
    const [targetHours, targetMinutes, targetSeconds] = targetTimeStr
      .split(":")
      .map(Number);

    // Mendapatkan waktu saat ini
    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();
    const nowSeconds = now.getSeconds();

    // Membuat waktu target sebagai objek Date
    const targetTime = new Date();
    targetTime.setHours(targetHours, targetMinutes, targetSeconds, 0);

    // Membuat waktu sekarang sebagai objek Date dengan waktu target
    const nowTime = new Date();
    nowTime.setHours(nowHours, nowMinutes, nowSeconds, 0);

    // Membandingkan waktu target dengan waktu sekarang
    if (nowTime.getTime() === targetTime.getTime()) {
      // console.log("Waktu sekarang sama dengan target time.");
      return 0;
    } else if (nowTime.getTime() > targetTime.getTime()) {
      // console.log("Waktu sekarang sudah melewati target time.");
      return 1;
    } else {
      // console.log("Waktu sekarang sebelum target time.");
      return -1;
    }
  }

  /*
    startTime = "07:50:00"
    endTime = "16:30:00"
    breaks = [
        {
        startBreak: "10:10:00",
        endBreak: "10:25:00",
        },
        {
        startBreak: "12:00:00",
        endBreak: "13:00:00",
        },
        {
        startBreak: "15:15:00",
        endBreak: "15:30:00",
        },
    ];

    ct = [
      {
        startCt: "07:50:00",
        durationCt: 180,
      },
      {
        startCt: "10:30:20",
        durationCt: 180,
      },
      {
        startCt: "14:44:25",
        durationCt: 180,
      },
    ];
    */
  countCycle(startTime, endTime, breaks, ct) {
    // Inisialisasi dengan waktu mulai jam 07:50:30 dan waktu akhir jam 16:30:45
    const [startHour, startMinute, startSecond] = startTime
      .split(":")
      .map(Number);
    const [endHour, endMinute, endSecond] = endTime.split(":").map(Number);

    // Atur waktu istirahat (bisa lebih dari satu)
    for (const value of breaks) {
    }
    const breakTimes = [];

    for (const value of breaks) {
      const [startHour, startMinute, startSecond] = value.startBreak
        .split(":")
        .map(Number);
      const [endHour, endMinute, endSecond] = value.endBreak
        .split(":")
        .map(Number);

      breakTimes.push({
        startHour,
        startMinute,
        startSecond,
        endHour,
        endMinute,
        endSecond,
      });
    }

    // Atur cycle time yang berubah pada waktu tertentu
    const cycleIntervals = [];
    for (const value of ct) {
      const [startHour, startMinute, startSecond] = value.startCt
        .split(":")
        .map(Number);

      cycleIntervals.push({
        startHour,
        startMinute,
        startSecond,
        durationSeconds: value.durationCt,
      });
    }

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
    const schedule = [];

    cycleTimes.forEach((cycle, index) => {
      schedule.push({
        plan: index + 1,
        startTimeCycle: cycle.startTime,
        endTimeCycle: cycle.endTime,
        duration: cycle.cycleDurationSeconds,
        intervalDuration: cycle.intervalDuration,
      });
    });

    return schedule;
  }

  loop(startTime, endTime, breaks, ct) {
    setInterval(() => {
      if (this.schedule.length === 0) {
        this.schedule = this.countCycle(startTime, endTime, breaks, ct);
        console.log("\n\n============ Generate Plan ================");
        for (const value of this.schedule) {
          console.log(
            `Plan: ${value.plan} | Start Time: ${value.startTimeCycle} | End Time: ${value.endTimeCycle} | CT: ${value.intervalDuration}`
          );
        }
        console.log("============ Generate Plan ================\n\n");
      }

      const index = this.schedule.findIndex(
        (x) =>
          this.compareTime(x.endTimeCycle) !== 1 &&
          this.compareTime(x.startTimeCycle) !== -1
      );
      this.plan = index === -1 ? 0 : this.schedule[index].plan;
      this.ct = index === -1 ? 0 : this.schedule[index].intervalDuration;

      console.log(`plan: ${this.plan} | ct: ${this.ct} | line: ${this.line}`);
    }, 1000);

    return;
  }
}

module.exports = GenerateCycle;
