// Copyright 2023 the libewd authors. All rights reserved. MIT license.

/**
 * middleware/router.ts
 */

import Context from "../context.ts";

export default function router() {
  const routes = async (context: Context) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;
  };

  routes.get = (path: string) => {
  };

  return routes;
}
