// Copyright 2023 the libewd authors. All rights reserved. MIT license.

/**
 * vertex.ts
 */

import Context from "./context.ts";
import { Server } from "../deps.ts";

export type Middleware = (context: Context) => Promise<void>;

/**
 * @returns
 */
export default function vertex() {
  return new class {
    private server?: Server;
    private stack: Array<Middleware> = [];

    async start(port: number) {
      const handler = async (request: Request) => {
        const context = Context.withRequestAndStack(
          request,
          this.stack,
        );

        await context.next();
        return this.makeResponse(context);
      };

      this.server = new Server({ port, handler });
      return await this.server.listenAndServe();
    }

    use(middleware: Middleware) {
      this.stack.push(middleware);
      return this;
    }

    private makeResponse(context: Context) {
      const { status, headers } = context;
      return new Response(context.body, { status, headers });
    }
  }();
}
