class ProductionCycle {
  constructor(
    startHour,
    startMinute,
    startSecond,
    endHour,
    endMinute,
    endSecond,
    breakTimes, // Array of break times
    cycleIntervals // Array of cycle intervals with time and duration
  ) {
    // Set startTime dan endTime untuk dua hari berbeda
    const now = new Date();
    this.startTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      startHour,
      startMinute,
      startSecond
    );
    this.endTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      endHour,
      endMinute,
      endSecond
    );

    // Jika endTime sebelum startTime, tambahkan satu hari ke endTime
    if (this.endTime < this.startTime) {
      this.endTime.setDate(this.endTime.getDate() + 1);
    }

    // Atur waktu istirahat sebagai array of objects
    this.breakTimes = breakTimes.map((breakTime) => ({
      start: new Date(this.startTime),
      end: new Date(this.startTime),
    }));

    this.breakTimes.forEach((breakTime, index) => {
      breakTime.start.setHours(breakTimes[index].startHour);
      breakTime.start.setMinutes(breakTimes[index].startMinute);
      breakTime.start.setSeconds(breakTimes[index].startSecond);

      breakTime.end.setHours(breakTimes[index].endHour);
      breakTime.end.setMinutes(breakTimes[index].endMinute);
      breakTime.end.setSeconds(breakTimes[index].endSecond);

      // Jika endTime sebelum startTime dalam waktu istirahat, tambahkan satu hari ke endTime
      if (breakTime.end < breakTime.start) {
        breakTime.end.setDate(breakTime.end.getDate() + 1);
      }
    });

    // Atur interval cycle time
    this.cycleIntervals = cycleIntervals.map((interval) => ({
      start: new Date(this.startTime),
      durationSeconds: interval.durationSeconds,
    }));

    this.cycleIntervals.forEach((interval, index) => {
      interval.start.setHours(cycleIntervals[index].startHour);
      interval.start.setMinutes(cycleIntervals[index].startMinute);
      interval.start.setSeconds(cycleIntervals[index].startSecond);
    });
  }

  getTotalProductionTime() {
    let totalMilliseconds = this.endTime - this.startTime;

    // Kurangi durasi istirahat dari total waktu produksi
    this.breakTimes.forEach((breakTime) => {
      const breakMilliseconds = breakTime.end - breakTime.start;
      totalMilliseconds -= breakMilliseconds;
    });

    const totalSeconds = totalMilliseconds / 1000;
    const totalMinutes = totalSeconds / 60;
    const totalHours = totalMinutes / 60;

    return {
      hours: Math.floor(totalHours),
      minutes: Math.floor(totalMinutes % 60),
      seconds: Math.floor(totalSeconds % 60),
      totalMilliseconds,
      totalSeconds,
      totalMinutes,
    };
  }

  getCycleTimes() {
    const cycles = [];
    let currentTime = new Date(this.startTime);
    let lastCycleEndTime = new Date(this.startTime);

    while (currentTime <= this.endTime) {
      // Lewati waktu istirahat
      const inBreakTime = this.breakTimes.some(
        (breakTime) =>
          currentTime >= breakTime.start && currentTime < breakTime.end
      );

      if (inBreakTime) {
        const nextBreakEndTime = this.breakTimes.find(
          (breakTime) =>
            currentTime >= breakTime.start && currentTime < breakTime.end
        ).end;
        currentTime = new Date(nextBreakEndTime);
        lastCycleEndTime = new Date(nextBreakEndTime);
        continue;
      }

      // Tentukan cycle time yang sesuai untuk waktu saat ini
      const currentInterval = this.cycleIntervals
        .slice()
        .reverse()
        .find((interval) => currentTime >= interval.start);

      if (!currentInterval) break;

      // Simpan waktu dan durasi cycle
      const cycleStartTime = new Date(currentTime);
      const cycleEndTime = new Date(
        cycleStartTime.getTime() + currentInterval.durationSeconds * 1000
      );

      // Periksa jika ada waktu yang tersisa sebelum istirahat
      const breakStart = this.breakTimes.find(
        (breakTime) =>
          currentTime < breakTime.end && cycleEndTime > breakTime.start
      );

      if (breakStart) {
        const timeUntilBreak = breakStart.start - currentTime;
        if (timeUntilBreak > 0) {
          const newCycleEndTime = new Date(
            cycleEndTime.getTime() + timeUntilBreak
          );

          // Tambah sisa waktu ke cycle berikutnya
          currentTime = new Date(newCycleEndTime);
        } else {
          currentTime = new Date(cycleEndTime);
        }
      } else {
        currentTime = new Date(cycleEndTime);
      }

      cycles.push({
        startTime: cycleStartTime.toTimeString().split(" ")[0], // Simpan waktu dengan format HH:MM:SS
        endTime: cycleEndTime.toTimeString().split(" ")[0],
        cycleDurationSeconds: currentInterval.durationSeconds,
        intervalStart: lastCycleEndTime.toTimeString().split(" ")[0],
        intervalDuration: (cycleEndTime - lastCycleEndTime) / 1000,
      });

      lastCycleEndTime = new Date(cycleEndTime);
    }

    return cycles;
  }
}

module.exports = ProductionCycle;
