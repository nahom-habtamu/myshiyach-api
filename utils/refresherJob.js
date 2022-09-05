const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler');
const scheduler = new ToadScheduler();

function scheduleRefresherJob() {
    const task = new Task('simple task', () => {
        console.log("I AM CHECKING SOME THING");
    });
    const job = new SimpleIntervalJob({ hours: 6 }, task);

    scheduler.addSimpleIntervalJob(job);
}

module.exports = scheduleRefresherJob;