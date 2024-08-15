const GenerateCycle = require("./GenerateCycle");

const startTime = "07:40:00";
const endTime = "07:30:00";
const breaks = [
  {
    startBreak: "07:40:00",
    endBreak: "07:50:00",
  },
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

const ct = [
  {
    startCt: "07:50:00",
    durationCt: 135,
  },
  {
    startCt: "10:30:20",
    durationCt: 180,
  },
  {
    startCt: "14:44:25",
    durationCt: 220,
  },
];

const startTime2 = "07:40:00";
const endTime2 = "07:30:00";
const breaks2 = [
  {
    startBreak: "07:40:00",
    endBreak: "07:50:00",
  },
  {
    startBreak: "10:10:00",
    endBreak: "10:25:00",
  },
  {
    startBreak: "12:00:00",
    endBreak: "13:00:00",
  },
  {
    startBreak: "15:10:00",
    endBreak: "15:15:00",
  },
];

const ct2 = [
  {
    startCt: "07:50:00",
    durationCt: 125,
  },
  {
    startCt: "10:30:20",
    durationCt: 200,
  },
  {
    startCt: "14:44:25",
    durationCt: 226,
  },
];

const test = (generate, startTime, endTime, breaks, ct) => {
  // generate 1
  if (generate.schedule.length === 0) {
    generate.schedule = generate.countCycle(startTime, endTime, breaks, ct);
    console.log(
      `\n\n============ Generate ${generate.line} Plan ================`
    );
    for (const value of generate.schedule) {
      console.log(
        `Plan: ${value.plan} | Start Time: ${value.startTimeCycle} | End Time: ${value.endTimeCycle} | CT: ${value.intervalDuration}`
      );
    }
    console.log(
      `============ Generate ${generate.line} Plan ================\n\n`
    );
  }

  const index = generate.schedule.findIndex(
    (x) =>
      generate.compareTime(x.endTimeCycle) !== 1 &&
      generate.compareTime(x.startTimeCycle) !== -1
  );
  if (index !== -1) {
    generate.plan = generate.schedule[index].plan;
    generate.ct = generate.schedule[index].intervalDuration;
  }

  //   const plan = [];
  //   for (const val of generate.schedule) {
  //     // if (generate.compareTime(val.endTimeCycle) === -1) {
  //     //   plan.push(val.plan, generate.compareTime(val.endTimeCycle) === -1);
  //     // }

  //     plan.push(val.plan, generate.compareTime(val.endTimeCycle) === 1);
  //   }
  //   console.log(`${generate.line} : ${plan}`);

  console.log(
    `plan: ${generate.plan} | ct: ${generate.ct} | line: ${generate.line}`
  );
};

const generate = new GenerateCycle();
generate.line = 1;
// generate.loop(startTime, endTime, breaks, ct);

const generate2 = new GenerateCycle();
generate2.line = 2;
// generate2.loop(startTime, endTime, breaks, ct);

setInterval(() => {
  // generate 1
  test(generate, startTime, endTime, breaks, ct);
  // generate 2
  test(generate2, startTime2, endTime2, breaks2, ct2);
}, 1000);
