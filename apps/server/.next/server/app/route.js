const CHUNK_PUBLIC_PATH = "server/app/route.js";
const runtime = require("../chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/node_modules_next_d6c6be3a._.js");
runtime.loadChunk("server/chunks/[root-of-the-server]__c52b7a24._.js");
runtime.getOrInstantiateRuntimeModule("[project]/apps/server/.next-internal/server/app/route/actions.js [app-rsc] (server actions loader, ecmascript)", CHUNK_PUBLIC_PATH);
runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/apps/server/src/app/route.ts [app-route] (ecmascript)\" } [app-route] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/apps/server/src/app/route.ts [app-route] (ecmascript)\" } [app-route] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
