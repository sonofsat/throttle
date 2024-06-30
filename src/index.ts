import { Command } from 'commander';
import throttle from './throttle';

const program = new Command();

function simulateHeavyOperation() {
  console.log(`Heavy operation executed at ${new Date().toISOString()}`);
}

program
  .name('throttle-cli')
  .description('CLI to test the throttle function')
  .version('1.0.0')
  .option('-i, --interval <number>', 'Throttle interval in milliseconds', '1000')
  .action((options) => {
    const interval = parseInt(options.interval, 10);
    const throttledOperation = throttle(simulateHeavyOperation, interval);

    console.log(`Starting throttled operations with interval ${interval}ms...`);
    
    setInterval(() => {
      throttledOperation();
    }, 100);
  });

program.parse(process.argv);