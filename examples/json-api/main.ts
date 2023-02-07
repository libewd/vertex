// Copyright 2023 the libewd authors. All rights reserved. MIT license.

/**
 * examples/json-api/main.ts
 */

import vertex, { router } from "../../mod.ts";

const app = vertex();

app.use(() => async (context) => {
  const data = await context.request.json();
  await context.next();
  context.json(data);
});

const routes = app.use(router);

routes.get("/hello/world");

await app.start(3000);
