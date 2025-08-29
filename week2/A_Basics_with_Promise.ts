// A. Basics with Promise

// 1. Create a Promise that returns "Hello Async" after 2 seconds.
export const helloAsync = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Hello Async"), 2000);
});

// 2. Function that returns a Promise resolving with 10 after 1 second.
export function getTen(): Promise<number> {
  return new Promise((resolve) => setTimeout(() => resolve(10), 1000));
}

// 3. Function that rejects a Promise with error after 1 second.
export function rejectPromise(): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Something went wrong")), 1000)
  );
}

// 5. simulateTask(time): returns Promise resolving with "Task done" after time ms.
export function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("Task done"), time));
}

async function main_A() {
  // 1
  console.log(await helloAsync);

  // 2
  console.log(await getTen());

  // 3
  try {
    await rejectPromise();
  } catch (e) {
    console.error(e);
  }

  // 4. Use .then() and .catch() to handle a Promise that returns a random number.
  const randomPromise = new Promise<number>((resolve) =>
    setTimeout(() => resolve(Math.random()), 500)
  );
  randomPromise
    .then((num) => console.log("Random number:", num))
    .catch((err) => console.error(err));
  await randomPromise;

  // 5
  console.log(await simulateTask(1000));

  // 6. Promise.all() to run 3 simulated Promises in parallel and print result.
  const allResults = await Promise.all([
    simulateTask(1000),
    simulateTask(1500),
    simulateTask(500),
  ]);
  console.log("All done:", allResults);

  // 7. Promise.race() to return whichever Promise resolves first.
  const raceResult = await Promise.race([
    simulateTask(1000),
    simulateTask(1500),
    simulateTask(500),
  ]);
  console.log("Race winner:", raceResult);

  // 8. Promise chain: square 2, then double, then add 5.
  const chainResult = await Promise.resolve(2)
    .then((n) => n * n)
    .then((n) => n * 2)
    .then((n) => n + 5);
  console.log("Chain result:", chainResult);

  // 9. Promise that reads array after 1s and filters even numbers.
  const filterEvenPromise = new Promise<number[]>((resolve) =>
    setTimeout(() => resolve([1, 2, 3, 4, 5, 6].filter((n) => n % 2 === 0)), 1000)
  );
  const evens = await filterEvenPromise;
  console.log("Even numbers:", evens);

  // 10. Use .finally() to log "Done" when a Promise finishes.
  await simulateTask(500)
    .then((res) => console.log(res))
    .catch((err) => console.error(err))
    .finally(() => console.log("Done"));
}

main_A().catch(console.error);
