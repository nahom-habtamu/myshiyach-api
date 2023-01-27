const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler');
const productRepository = require('../repositories/ProductRepository');
const scheduler = new ToadScheduler();

function scheduleRefresherJob() {
    const task = new Task('Refresh All Posts Every 6 Hours',
        async () => {
            let allProducts = await productRepository.getAllProducts();
            for (let i = 0; i < allProducts.length; i++) {
                const product = allProducts[i];
                await productRepository
                    .updateProductRefreshedAtByConstantTime(product._id);
            }
        });
    const job = new SimpleIntervalJob({ days: 2 }, task);
    scheduler.addSimpleIntervalJob(job);
}

module.exports = scheduleRefresherJob;