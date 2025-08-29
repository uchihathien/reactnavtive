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