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
  console.log(await helloAsync);
  console.log(await getTen());

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

import { simulateTask, rejectPromise } from "./A_Basics_with_Promise.ts";

// B. Async/Await

// 11. Convert Exercise 1 into async/await.
function helloAsync(): Promise<string> {
  return Promise.resolve("Hello, Async!");
}
async function helloAsyncAwait() {
  return await helloAsync();
}

// 12. Async function that calls simulateTask(2000) and logs result.
async function runSimulateTask() {
  const res = await simulateTask(2000);
  console.log("SimulateTask result:", res);
}

// 13. Handle errors using try/catch with async/await.
async function tryCatchExample() {
  try {
    await rejectPromise();
  } catch (err) {
    console.error("Caught error:", err);
  }
}

// 14. Async function that takes a number, waits 1s, returns number × 3.
async function tripleAfter1s(n: number): Promise<number> {
  await new Promise((r) => setTimeout(r, 1000));
  return n * 3;
}

// 15. Call multiple async functions sequentially using await.
async function sequentialCalls() {
  const a = await tripleAfter1s(2);
  const b = await tripleAfter1s(3);
  console.log("Sequential:", a, b);
}

// 16. Call multiple async functions in parallel using Promise.all().
async function parallelCalls() {
  const [a, b] = await Promise.all([tripleAfter1s(2), tripleAfter1s(3)]);
  console.log("Parallel:", a, b);
}

// 17. Use for await...of to iterate over array of Promises.
async function forAwaitExample() {
  const promises = [1, 2, 3].map(tripleAfter1s);
  for await (const result of promises) {
    console.log("for await result:", result);
  }
}

// 18. Async function fetchUser(id) simulates API call (resolves user after 1s).
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  await new Promise((r) => setTimeout(r, 1000));
  return { id, name: `User${id}` };
}

// 19. Async function fetchUsers(ids: number[]) that calls fetchUser for each ID.
async function fetchUsers(ids: number[]) {
  return Promise.all(ids.map(fetchUser));
}

// 20. Add a timeout: if API call takes more than 2s, throw error.
async function fetchUserWithTimeout(id: number): Promise<{ id: number; name: string }> {
  return Promise.race([
    fetchUser(id),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 2000)),
  ]) as Promise<{ id: number; name: string }>;
}

async function main_B() {

  console.log(await helloAsyncAwait());


  await runSimulateTask();


  await tryCatchExample();


  console.log(await tripleAfter1s(5));


  await sequentialCalls();


  await parallelCalls();


  await forAwaitExample();

  console.log(await fetchUser(1));

  console.log(await fetchUsers([1, 2, 3]));

  try {
    console.log(await fetchUserWithTimeout(1));
  } catch (e) {
    console.error(e);
  }
}

main_B().catch(console.error);

import { simulateTask } from "./A_Basics_with_Promise";

// C. Fetch API & Simulated I/O

// 21. Use fetch to get data from a public API.
async function fetchTodo() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();
  console.log("Fetched todo:", data);
}

// 22. Call the API multiple times and log the results.
async function fetchMultipleTodos() {
  const ids = [1, 2, 3];
  const results = await Promise.all(
    ids.map((id) =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((r) => r.json())
    )
  );
  console.log("Multiple todos:", results);
}

// 23. Async function that fetches list of todos and filters out not completed.
async function fetchCompletedTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();
  const completed = todos.filter((t: any) => t.completed);
  console.log("Completed todos:", completed);
}

// 24. Async function postData() that sends a POST request to a test API.
async function postData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({ title: "foo", body: "bar", userId: 1 }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  const data = await res.json();
  console.log("POST result:", data);
}

// 25. downloadFile simulates downloading a file in 3s and logs when done.
function downloadFile() {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      console.log("File downloaded");
      resolve();
    }, 3000)
  );
}

// 26. Use async/await with setTimeout to simulate a 5-second wait.
async function wait5Seconds() {
  await new Promise((r) => setTimeout(r, 5000));
  console.log("Waited 5 seconds");
}

// 27. fetchWithRetry(url, retries): retries up to retries times if API call fails.
async function fetchWithRetry(url: string, retries: number): Promise<any> {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Fetch failed");
      return await res.json();
    } catch (err) {
      if (i === retries) throw err;
    }
  }
}

// 28. batchProcess(): processes 5 async tasks at once (use Promise.all).
async function batchProcess(tasks: (() => Promise<any>)[]) {
  const results = await Promise.all(tasks.map((t) => t()));
  console.log("Batch results:", results);
}

// 29. queueProcess(): processes tasks sequentially in a queue.
async function queueProcess(tasks: (() => Promise<any>)[]) {
  const results: any[] = [];
  for (const task of tasks) {
    results.push(await task());
  }
  console.log("Queue results:", results);
}

// 30. async/await + Promise.allSettled() to handle multiple API calls and display their status.
async function allSettledExample(urls: string[]) {
  const results = await Promise.allSettled(urls.map((url) => fetch(url)));
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`Call ${i} succeeded`);
    } else {
      console.log(`Call ${i} failed:`, result.reason);
    }
  });
}

async function main_C() {
  // 21
  await fetchTodo();

  // 22
  await fetchMultipleTodos();

  // 23
  await fetchCompletedTodos();

  // 24
  await postData();

  // 25
  await downloadFile();

  // 26
  await wait5Seconds();

  // 27
  try {
    console.log(await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 2));
  } catch (e) {
    console.error(e);
  }

  // 28. Batch process example
  await batchProcess([
    () => simulateTask(500),
    () => simulateTask(600),
    () => simulateTask(700),
    () => simulateTask(800),
    () => simulateTask(900),
  ]);

  // 29. Queue process example
  await queueProcess([
    () => simulateTask(500),
    () => simulateTask(600),
    () => simulateTask(700),
    () => simulateTask(800),
    () => simulateTask(900),
  ]);

  // 30. allSettled example
  await allSettledExample([
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/404",
  ]);
}

main_C().catch(console.error);
