import * as serverBuild from 'virtual:react-router/server-build';
import {createRequestHandler, createHydrogenContext} from '@shopify/hydrogen';
import {createCookieSessionStorage} from 'react-router';

export default {
  async fetch(request, env, executionContext) {
    const waitUntil = executionContext.waitUntil.bind(executionContext);

    const sessionStorage = createCookieSessionStorage({
      cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [env.SESSION_SECRET || 'default-secret'],
      },
    });

    const session = await sessionStorage.getSession(
      request.headers.get('Cookie'),
    );

    const hydrogenContext = createHydrogenContext({
      env,
      request,
      cache: await caches.open('hydrogen'),
      waitUntil,
      session: {
        get: session.get.bind(session),
        set: session.set.bind(session),
        unset: session.unset.bind(session),
        commit: () => sessionStorage.commitSession(session),
      },
    });

    const handleRequest = createRequestHandler({
      build: serverBuild,
      mode: process.env.NODE_ENV,
      getLoadContext: () => hydrogenContext,
    });

    return handleRequest(request);
  },
};
