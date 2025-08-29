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
