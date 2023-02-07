// Copyright 2023 the libewd authors. All rights reserved. MIT license.

/**
 * context.ts
 */

import { Middleware } from "./vertex.ts";

export default class Context {
  static withRequestAndStack(request: Request, stack: Array<Middleware>) {
    return new Context(request, Array.from(stack));
  }

  headers = new Headers();
  status = 404;
  body?: BodyInit;

  constructor(public request: Request, private stack: Array<Middleware>) {
  }

  async next() {
    const middleware = this.stack.shift();
    if (!middleware) return;
    await middleware(this);
  }

  json(value: unknown) {
    this.status = 200;
    this.body = JSON.stringify(value);
    this.headers.set("Content-Type", "application/json");
  }

  makeResponse(
    body?: BodyInit,
    status = 204,
    headers: Record<string, string> = {},
  ) {
    return new Response(body, {
      status,
      headers,
    });
  }
}
