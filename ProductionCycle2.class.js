class ProductionCycle2 {
  constructor() {
    this.startTime = null;
    this.endTime = null;
  }

  // memulai perhitungan cycle time
  startCycle() {
    this.startTime = new Date();
    console.log(`Cycle started at: ${this.startTime}`);
  }

  // mengakhir perhitungan cycle time
  endCycle() {
    if (!this.startTime) {
      console.log(`Cycle has not been started`);
      return;
    }

    this.endTime = new Date();
    console.log(`Cycle ended at: ${this.endTime}`);
  }

  getCycleTime() {
    if (!this.startTime || !this.endTime) {
      console.log(
        `Cycle time cannaot be calculate. Make sure to start and end the cycle.`
      );

      return null;
    }

    const cycleTime = this.endTime - this.startTime;
    const seconds = Math.floor((cycleTime / 1000) % 60);
    const minutes = Math.floor((cycleTime / (1000 * 60)) % 60);
    const hours = Math.floor((cycleTime / (1000 * 60 * 60)) % 24);

    return {
      hours,
      minutes,
      seconds,
      totalMilliseconds: cycleTime,
    };
  }

  // Reset cycle untuk menghitung waktu baru
  resetCycle() {
    this.startTime = null;
    this.endTime = null;
    console.log("Cycle has been reset.");
  }
}

module.exports = ProductionCycle2;
