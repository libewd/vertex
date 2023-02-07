// Copyright 2023 the libewd authors. All rights reserved. MIT license.

/**
 * examples/simple/main.ts
 */

import vertex from "../../mod.ts";

const app = vertex();

app.use(() => async (context) => {
  const start = performance.now();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await context.next();
  context.headers.set("X-Response-Time", `${performance.now() - start}ms`);
});

app.use(() => async (context) => {
  await context.next();
  context.json([1, 2, 3, 4]);
});

await app.start(3000);
