(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/apps/web/src/lib/auth-client.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "authClient": (()=>authClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/client/react/index.mjs [app-client] (ecmascript)");
;
const authClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$client$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAuthClient"])({
    baseURL: ("TURBOPACK compile-time value", "")
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/app/dashboard/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Dashboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/auth-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$trpc$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/utils/trpc.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Dashboard() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data: session, isPending } = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession();
    const privateData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$utils$2f$trpc$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trpc"].privateData.queryOptions());
    // useEffect(() => {
    //   if (!session && !isPending) {
    //     router.push("/login");
    //   }
    // }, [session, isPending]);
    // if (isPending) {
    //   return <div>Loading...</div>;
    // }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Dashboard"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/dashboard/page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Welcome ",
                    session?.user.name
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/page.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "privateData: ",
                    privateData.data?.message
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dashboard/page.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/dashboard/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "S6Mac0Ru+rOtoCTme3Qp/gfyzMk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authClient"].useSession,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/@tanstack/query-core/build/modern/queryObserver.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/queryObserver.ts
__turbopack_context__.s({
    "QueryObserver": (()=>QueryObserver)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$focusManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/focusManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/query.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/subscribable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/thenable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
;
;
;
;
;
;
var QueryObserver = class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subscribable"] {
    constructor(client, options){
        super();
        this.options = options;
        this.#client = client;
        this.#selectError = null;
        this.#currentThenable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pendingThenable"])();
        if (!this.options.experimental_prefetchInRender) {
            this.#currentThenable.reject(new Error("experimental_prefetchInRender feature flag is not enabled"));
        }
        this.bindMethods();
        this.setOptions(options);
    }
    #client;
    #currentQuery = void 0;
    #currentQueryInitialState = void 0;
    #currentResult = void 0;
    #currentResultState;
    #currentResultOptions;
    #currentThenable;
    #selectError;
    #selectFn;
    #selectResult;
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    #lastQueryWithDefinedData;
    #staleTimeoutId;
    #refetchIntervalId;
    #currentRefetchInterval;
    #trackedProps = /* @__PURE__ */ new Set();
    bindMethods() {
        this.refetch = this.refetch.bind(this);
    }
    onSubscribe() {
        if (this.listeners.size === 1) {
            this.#currentQuery.addObserver(this);
            if (shouldFetchOnMount(this.#currentQuery, this.options)) {
                this.#executeFetch();
            } else {
                this.updateResult();
            }
            this.#updateTimers();
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            this.destroy();
        }
    }
    shouldFetchOnReconnect() {
        return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnReconnect);
    }
    shouldFetchOnWindowFocus() {
        return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnWindowFocus);
    }
    destroy() {
        this.listeners = /* @__PURE__ */ new Set();
        this.#clearStaleTimeout();
        this.#clearRefetchInterval();
        this.#currentQuery.removeObserver(this);
    }
    setOptions(options) {
        const prevOptions = this.options;
        const prevQuery = this.#currentQuery;
        this.options = this.#client.defaultQueryOptions(options);
        if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(this.options.enabled, this.#currentQuery) !== "boolean") {
            throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
        }
        this.#updateQuery();
        this.#currentQuery.setOptions(this.options);
        if (prevOptions._defaulted && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(this.options, prevOptions)) {
            this.#client.getQueryCache().notify({
                type: "observerOptionsUpdated",
                query: this.#currentQuery,
                observer: this
            });
        }
        const mounted = this.hasListeners();
        if (mounted && shouldFetchOptionally(this.#currentQuery, prevQuery, this.options, prevOptions)) {
            this.#executeFetch();
        }
        this.updateResult();
        if (mounted && (this.#currentQuery !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(this.options.enabled, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(prevOptions.enabled, this.#currentQuery) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(this.options.staleTime, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(prevOptions.staleTime, this.#currentQuery))) {
            this.#updateStaleTimeout();
        }
        const nextRefetchInterval = this.#computeRefetchInterval();
        if (mounted && (this.#currentQuery !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(this.options.enabled, this.#currentQuery) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) {
            this.#updateRefetchInterval(nextRefetchInterval);
        }
    }
    getOptimisticResult(options) {
        const query = this.#client.getQueryCache().build(this.#client, options);
        const result = this.createResult(query, options);
        if (shouldAssignObserverCurrentProperties(this, result)) {
            this.#currentResult = result;
            this.#currentResultOptions = this.options;
            this.#currentResultState = this.#currentQuery.state;
        }
        return result;
    }
    getCurrentResult() {
        return this.#currentResult;
    }
    trackResult(result, onPropTracked) {
        return new Proxy(result, {
            get: (target, key)=>{
                this.trackProp(key);
                onPropTracked?.(key);
                return Reflect.get(target, key);
            }
        });
    }
    trackProp(key) {
        this.#trackedProps.add(key);
    }
    getCurrentQuery() {
        return this.#currentQuery;
    }
    refetch({ ...options } = {}) {
        return this.fetch({
            ...options
        });
    }
    fetchOptimistic(options) {
        const defaultedOptions = this.#client.defaultQueryOptions(options);
        const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
        return query.fetch().then(()=>this.createResult(query, defaultedOptions));
    }
    fetch(fetchOptions) {
        return this.#executeFetch({
            ...fetchOptions,
            cancelRefetch: fetchOptions.cancelRefetch ?? true
        }).then(()=>{
            this.updateResult();
            return this.#currentResult;
        });
    }
    #executeFetch(fetchOptions) {
        this.#updateQuery();
        let promise = this.#currentQuery.fetch(this.options, fetchOptions);
        if (!fetchOptions?.throwOnError) {
            promise = promise.catch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]);
        }
        return promise;
    }
    #updateStaleTimeout() {
        this.#clearStaleTimeout();
        const staleTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(this.options.staleTime, this.#currentQuery);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServer"] || this.#currentResult.isStale || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTimeout"])(staleTime)) {
            return;
        }
        const time = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeUntilStale"])(this.#currentResult.dataUpdatedAt, staleTime);
        const timeout = time + 1;
        this.#staleTimeoutId = setTimeout(()=>{
            if (!this.#currentResult.isStale) {
                this.updateResult();
            }
        }, timeout);
    }
    #computeRefetchInterval() {
        return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
    }
    #updateRefetchInterval(nextInterval) {
        this.#clearRefetchInterval();
        this.#currentRefetchInterval = nextInterval;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServer"] || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(this.options.enabled, this.#currentQuery) === false || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidTimeout"])(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) {
            return;
        }
        this.#refetchIntervalId = setInterval(()=>{
            if (this.options.refetchIntervalInBackground || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$focusManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusManager"].isFocused()) {
                this.#executeFetch();
            }
        }, this.#currentRefetchInterval);
    }
    #updateTimers() {
        this.#updateStaleTimeout();
        this.#updateRefetchInterval(this.#computeRefetchInterval());
    }
    #clearStaleTimeout() {
        if (this.#staleTimeoutId) {
            clearTimeout(this.#staleTimeoutId);
            this.#staleTimeoutId = void 0;
        }
    }
    #clearRefetchInterval() {
        if (this.#refetchIntervalId) {
            clearInterval(this.#refetchIntervalId);
            this.#refetchIntervalId = void 0;
        }
    }
    createResult(query, options) {
        const prevQuery = this.#currentQuery;
        const prevOptions = this.options;
        const prevResult = this.#currentResult;
        const prevResultState = this.#currentResultState;
        const prevResultOptions = this.#currentResultOptions;
        const queryChange = query !== prevQuery;
        const queryInitialState = queryChange ? query.state : this.#currentQueryInitialState;
        const { state } = query;
        let newState = {
            ...state
        };
        let isPlaceholderData = false;
        let data;
        if (options._optimisticResults) {
            const mounted = this.hasListeners();
            const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
            const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
            if (fetchOnMount || fetchOptionally) {
                newState = {
                    ...newState,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchState"])(state.data, query.options)
                };
            }
            if (options._optimisticResults === "isRestoring") {
                newState.fetchStatus = "idle";
            }
        }
        let { error, errorUpdatedAt, status } = newState;
        data = newState.data;
        let skipSelect = false;
        if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
            let placeholderData;
            if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
                placeholderData = prevResult.data;
                skipSelect = true;
            } else {
                placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(this.#lastQueryWithDefinedData?.state.data, this.#lastQueryWithDefinedData) : options.placeholderData;
            }
            if (placeholderData !== void 0) {
                status = "success";
                data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceData"])(prevResult?.data, placeholderData, options);
                isPlaceholderData = true;
            }
        }
        if (options.select && data !== void 0 && !skipSelect) {
            if (prevResult && data === prevResultState?.data && options.select === this.#selectFn) {
                data = this.#selectResult;
            } else {
                try {
                    this.#selectFn = options.select;
                    data = options.select(data);
                    data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceData"])(prevResult?.data, data, options);
                    this.#selectResult = data;
                    this.#selectError = null;
                } catch (selectError) {
                    this.#selectError = selectError;
                }
            }
        }
        if (this.#selectError) {
            error = this.#selectError;
            data = this.#selectResult;
            errorUpdatedAt = Date.now();
            status = "error";
        }
        const isFetching = newState.fetchStatus === "fetching";
        const isPending = status === "pending";
        const isError = status === "error";
        const isLoading = isPending && isFetching;
        const hasData = data !== void 0;
        const result = {
            status,
            fetchStatus: newState.fetchStatus,
            isPending,
            isSuccess: status === "success",
            isError,
            isInitialLoading: isLoading,
            isLoading,
            data,
            dataUpdatedAt: newState.dataUpdatedAt,
            error,
            errorUpdatedAt,
            failureCount: newState.fetchFailureCount,
            failureReason: newState.fetchFailureReason,
            errorUpdateCount: newState.errorUpdateCount,
            isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
            isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
            isFetching,
            isRefetching: isFetching && !isPending,
            isLoadingError: isError && !hasData,
            isPaused: newState.fetchStatus === "paused",
            isPlaceholderData,
            isRefetchError: isError && hasData,
            isStale: isStale(query, options),
            refetch: this.refetch,
            promise: this.#currentThenable
        };
        const nextResult = result;
        if (this.options.experimental_prefetchInRender) {
            const finalizeThenableIfPossible = (thenable)=>{
                if (nextResult.status === "error") {
                    thenable.reject(nextResult.error);
                } else if (nextResult.data !== void 0) {
                    thenable.resolve(nextResult.data);
                }
            };
            const recreateThenable = ()=>{
                const pending = this.#currentThenable = nextResult.promise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$thenable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pendingThenable"])();
                finalizeThenableIfPossible(pending);
            };
            const prevThenable = this.#currentThenable;
            switch(prevThenable.status){
                case "pending":
                    if (query.queryHash === prevQuery.queryHash) {
                        finalizeThenableIfPossible(prevThenable);
                    }
                    break;
                case "fulfilled":
                    if (nextResult.status === "error" || nextResult.data !== prevThenable.value) {
                        recreateThenable();
                    }
                    break;
                case "rejected":
                    if (nextResult.status !== "error" || nextResult.error !== prevThenable.reason) {
                        recreateThenable();
                    }
                    break;
            }
        }
        return nextResult;
    }
    updateResult() {
        const prevResult = this.#currentResult;
        const nextResult = this.createResult(this.#currentQuery, this.options);
        this.#currentResultState = this.#currentQuery.state;
        this.#currentResultOptions = this.options;
        if (this.#currentResultState.data !== void 0) {
            this.#lastQueryWithDefinedData = this.#currentQuery;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(nextResult, prevResult)) {
            return;
        }
        this.#currentResult = nextResult;
        const shouldNotifyListeners = ()=>{
            if (!prevResult) {
                return true;
            }
            const { notifyOnChangeProps } = this.options;
            const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
            if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) {
                return true;
            }
            const includedProps = new Set(notifyOnChangePropsValue ?? this.#trackedProps);
            if (this.options.throwOnError) {
                includedProps.add("error");
            }
            return Object.keys(this.#currentResult).some((key)=>{
                const typedKey = key;
                const changed = this.#currentResult[typedKey] !== prevResult[typedKey];
                return changed && includedProps.has(typedKey);
            });
        };
        this.#notify({
            listeners: shouldNotifyListeners()
        });
    }
    #updateQuery() {
        const query = this.#client.getQueryCache().build(this.#client, this.options);
        if (query === this.#currentQuery) {
            return;
        }
        const prevQuery = this.#currentQuery;
        this.#currentQuery = query;
        this.#currentQueryInitialState = query.state;
        if (this.hasListeners()) {
            prevQuery?.removeObserver(this);
            query.addObserver(this);
        }
    }
    onQueryUpdate() {
        this.updateResult();
        if (this.hasListeners()) {
            this.#updateTimers();
        }
    }
    #notify(notifyOptions) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batch(()=>{
            if (notifyOptions.listeners) {
                this.listeners.forEach((listener)=>{
                    listener(this.#currentResult);
                });
            }
            this.#client.getQueryCache().notify({
                query: this.#currentQuery,
                type: "observerResultsUpdated"
            });
        });
    }
};
function shouldLoadOnMount(query, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
    return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(options.enabled, query) !== false && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(options.staleTime, query) !== "static") {
        const value = typeof field === "function" ? field(query) : field;
        return value === "always" || value !== false && isStale(query, options);
    }
    return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
    return (query !== prevQuery || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveEnabled"])(options.enabled, query) !== false && query.isStaleByTime((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveStaleTime"])(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(observer.getCurrentResult(), optimisticResult)) {
        return true;
    }
    return false;
}
;
 //# sourceMappingURL=queryObserver.js.map
}}),
"[project]/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "QueryErrorResetBoundary": (()=>QueryErrorResetBoundary),
    "useQueryErrorResetBoundary": (()=>useQueryErrorResetBoundary)
});
// src/QueryErrorResetBoundary.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
"use client";
;
;
function createValue() {
    let isReset = false;
    return {
        clearReset: ()=>{
            isReset = false;
        },
        reset: ()=>{
            isReset = true;
        },
        isReset: ()=>{
            return isReset;
        }
    };
}
var QueryErrorResetBoundaryContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(createValue());
var useQueryErrorResetBoundary = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(QueryErrorResetBoundaryContext);
var QueryErrorResetBoundary = ({ children })=>{
    const [value] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "QueryErrorResetBoundary.useState": ()=>createValue()
    }["QueryErrorResetBoundary.useState"]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(QueryErrorResetBoundaryContext.Provider, {
        value,
        children: typeof children === "function" ? children(value) : children
    });
};
;
 //# sourceMappingURL=QueryErrorResetBoundary.js.map
}}),
"[project]/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ensurePreventErrorBoundaryRetry": (()=>ensurePreventErrorBoundaryRetry),
    "getHasError": (()=>getHasError),
    "useClearResetErrorBoundary": (()=>useClearResetErrorBoundary)
});
// src/errorBoundaryUtils.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
"use client";
;
;
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary)=>{
    if (options.suspense || options.throwOnError || options.experimental_prefetchInRender) {
        if (!errorResetBoundary.isReset()) {
            options.retryOnMount = false;
        }
    }
};
var useClearResetErrorBoundary = (errorResetBoundary)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useClearResetErrorBoundary.useEffect": ()=>{
            errorResetBoundary.clearReset();
        }
    }["useClearResetErrorBoundary.useEffect"], [
        errorResetBoundary
    ]);
};
var getHasError = ({ result, errorResetBoundary, throwOnError, query, suspense })=>{
    return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldThrowError"])(throwOnError, [
        result.error,
        query
    ]));
};
;
 //# sourceMappingURL=errorBoundaryUtils.js.map
}}),
"[project]/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "IsRestoringProvider": (()=>IsRestoringProvider),
    "useIsRestoring": (()=>useIsRestoring)
});
// src/IsRestoringProvider.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
var IsRestoringContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(false);
var useIsRestoring = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(IsRestoringContext);
var IsRestoringProvider = IsRestoringContext.Provider;
;
 //# sourceMappingURL=IsRestoringProvider.js.map
}}),
"[project]/node_modules/@tanstack/react-query/build/modern/suspense.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/suspense.ts
__turbopack_context__.s({
    "defaultThrowOnError": (()=>defaultThrowOnError),
    "ensureSuspenseTimers": (()=>ensureSuspenseTimers),
    "fetchOptimistic": (()=>fetchOptimistic),
    "shouldSuspend": (()=>shouldSuspend),
    "willFetch": (()=>willFetch)
});
var defaultThrowOnError = (_error, query)=>query.state.data === void 0;
var ensureSuspenseTimers = (defaultedOptions)=>{
    if (defaultedOptions.suspense) {
        const clamp = (value)=>value === "static" ? value : Math.max(value ?? 1e3, 1e3);
        const originalStaleTime = defaultedOptions.staleTime;
        defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args)=>clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
        if (typeof defaultedOptions.gcTime === "number") {
            defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, 1e3);
        }
    }
};
var willFetch = (result, isRestoring)=>result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result)=>defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary)=>observer.fetchOptimistic(defaultedOptions).catch(()=>{
        errorResetBoundary.clearReset();
    });
;
 //# sourceMappingURL=suspense.js.map
}}),
"[project]/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useBaseQuery": (()=>useBaseQuery)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// src/useBaseQuery.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryErrorResetBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$IsRestoringProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/suspense.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function useBaseQuery(options, Observer, queryClient) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (typeof options !== "object" || Array.isArray(options)) {
            throw new Error('Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object');
        }
    }
    const isRestoring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$IsRestoringProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsRestoring"])();
    const errorResetBoundary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryErrorResetBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryErrorResetBoundary"])();
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])(queryClient);
    const defaultedOptions = client.defaultQueryOptions(options);
    client.getDefaultOptions().queries?._experimental_beforeQuery?.(defaultedOptions);
    if ("TURBOPACK compile-time truthy", 1) {
        if (!defaultedOptions.queryFn) {
            console.error(`[${defaultedOptions.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`);
        }
    }
    defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureSuspenseTimers"])(defaultedOptions);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensurePreventErrorBoundaryRetry"])(defaultedOptions, errorResetBoundary);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearResetErrorBoundary"])(errorResetBoundary);
    const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
    const [observer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useBaseQuery.useState": ()=>new Observer(client, defaultedOptions)
    }["useBaseQuery.useState"]);
    const result = observer.getOptimisticResult(defaultedOptions);
    const shouldSubscribe = !isRestoring && options.subscribed !== false;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBaseQuery.useSyncExternalStore.useCallback": (onStoreChange)=>{
            const unsubscribe = shouldSubscribe ? observer.subscribe(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifyManager"].batchCalls(onStoreChange)) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
            observer.updateResult();
            return unsubscribe;
        }
    }["useBaseQuery.useSyncExternalStore.useCallback"], [
        observer,
        shouldSubscribe
    ]), {
        "useBaseQuery.useSyncExternalStore": ()=>observer.getCurrentResult()
    }["useBaseQuery.useSyncExternalStore"], {
        "useBaseQuery.useSyncExternalStore": ()=>observer.getCurrentResult()
    }["useBaseQuery.useSyncExternalStore"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBaseQuery.useEffect": ()=>{
            observer.setOptions(defaultedOptions);
        }
    }["useBaseQuery.useEffect"], [
        defaultedOptions,
        observer
    ]);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldSuspend"])(defaultedOptions, result)) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOptimistic"])(defaultedOptions, observer, errorResetBoundary);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$errorBoundaryUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHasError"])({
        result,
        errorResetBoundary,
        throwOnError: defaultedOptions.throwOnError,
        query: client.getQueryCache().get(defaultedOptions.queryHash),
        suspense: defaultedOptions.suspense
    })) {
        throw result.error;
    }
    ;
    client.getDefaultOptions().queries?._experimental_afterQuery?.(defaultedOptions, result);
    if (defaultedOptions.experimental_prefetchInRender && !__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isServer"] && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["willFetch"])(result, isRestoring)) {
        const promise = isNewCacheEntry ? // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$suspense$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchOptimistic"])(defaultedOptions, observer, errorResetBoundary) : // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
        client.getQueryCache().get(defaultedOptions.queryHash)?.promise;
        promise?.catch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]).finally(()=>{
            observer.updateResult();
        });
    }
    return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
;
 //# sourceMappingURL=useBaseQuery.js.map
}}),
"[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useQuery": (()=>useQuery)
});
// src/useQuery.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js [app-client] (ecmascript)");
"use client";
;
;
function useQuery(options, queryClient) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useBaseQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseQuery"])(options, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryObserver"], queryClient);
}
;
 //# sourceMappingURL=useQuery.js.map
}}),
"[project]/node_modules/@better-fetch/fetch/dist/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BetterFetchError": (()=>BetterFetchError),
    "ValidationError": (()=>ValidationError),
    "applySchemaPlugin": (()=>applySchemaPlugin),
    "betterFetch": (()=>betterFetch),
    "bodyParser": (()=>bodyParser),
    "createFetch": (()=>createFetch),
    "createRetryStrategy": (()=>createRetryStrategy),
    "createSchema": (()=>createSchema),
    "detectContentType": (()=>detectContentType),
    "detectResponseType": (()=>detectResponseType),
    "getBody": (()=>getBody),
    "getFetch": (()=>getFetch),
    "getHeaders": (()=>getHeaders),
    "getMethod": (()=>getMethod),
    "getTimeout": (()=>getTimeout),
    "getURL": (()=>getURL),
    "initializePlugins": (()=>initializePlugins),
    "isFunction": (()=>isFunction),
    "isJSONParsable": (()=>isJSONParsable),
    "isJSONSerializable": (()=>isJSONSerializable),
    "isPayloadMethod": (()=>isPayloadMethod),
    "isRouteMethod": (()=>isRouteMethod),
    "jsonParse": (()=>jsonParse),
    "methods": (()=>methods),
    "parseStandardSchema": (()=>parseStandardSchema)
});
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
// src/error.ts
var BetterFetchError = class extends Error {
    constructor(status, statusText, error){
        super(statusText || status.toString(), {
            cause: error
        });
        this.status = status;
        this.statusText = statusText;
        this.error = error;
    }
};
// src/plugins.ts
var initializePlugins = async (url, options)=>{
    var _a, _b, _c, _d, _e, _f;
    let opts = options || {};
    const hooks = {
        onRequest: [
            options == null ? void 0 : options.onRequest
        ],
        onResponse: [
            options == null ? void 0 : options.onResponse
        ],
        onSuccess: [
            options == null ? void 0 : options.onSuccess
        ],
        onError: [
            options == null ? void 0 : options.onError
        ],
        onRetry: [
            options == null ? void 0 : options.onRetry
        ]
    };
    if (!options || !(options == null ? void 0 : options.plugins)) {
        return {
            url,
            options: opts,
            hooks
        };
    }
    for (const plugin of (options == null ? void 0 : options.plugins) || []){
        if (plugin.init) {
            const pluginRes = await ((_a = plugin.init) == null ? void 0 : _a.call(plugin, url.toString(), options));
            opts = pluginRes.options || opts;
            url = pluginRes.url;
        }
        hooks.onRequest.push((_b = plugin.hooks) == null ? void 0 : _b.onRequest);
        hooks.onResponse.push((_c = plugin.hooks) == null ? void 0 : _c.onResponse);
        hooks.onSuccess.push((_d = plugin.hooks) == null ? void 0 : _d.onSuccess);
        hooks.onError.push((_e = plugin.hooks) == null ? void 0 : _e.onError);
        hooks.onRetry.push((_f = plugin.hooks) == null ? void 0 : _f.onRetry);
    }
    return {
        url,
        options: opts,
        hooks
    };
};
// src/retry.ts
var LinearRetryStrategy = class {
    constructor(options){
        this.options = options;
    }
    shouldAttemptRetry(attempt, response) {
        if (this.options.shouldRetry) {
            return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
        }
        return Promise.resolve(attempt < this.options.attempts);
    }
    getDelay() {
        return this.options.delay;
    }
};
var ExponentialRetryStrategy = class {
    constructor(options){
        this.options = options;
    }
    shouldAttemptRetry(attempt, response) {
        if (this.options.shouldRetry) {
            return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
        }
        return Promise.resolve(attempt < this.options.attempts);
    }
    getDelay(attempt) {
        const delay = Math.min(this.options.maxDelay, this.options.baseDelay * 2 ** attempt);
        return delay;
    }
};
function createRetryStrategy(options) {
    if (typeof options === "number") {
        return new LinearRetryStrategy({
            type: "linear",
            attempts: options,
            delay: 1e3
        });
    }
    switch(options.type){
        case "linear":
            return new LinearRetryStrategy(options);
        case "exponential":
            return new ExponentialRetryStrategy(options);
        default:
            throw new Error("Invalid retry strategy");
    }
}
// src/auth.ts
var getAuthHeader = async (options)=>{
    const headers = {};
    const getValue = async (value)=>typeof value === "function" ? await value() : value;
    if (options == null ? void 0 : options.auth) {
        if (options.auth.type === "Bearer") {
            const token = await getValue(options.auth.token);
            if (!token) {
                return headers;
            }
            headers["authorization"] = `Bearer ${token}`;
        } else if (options.auth.type === "Basic") {
            const username = getValue(options.auth.username);
            const password = getValue(options.auth.password);
            if (!username || !password) {
                return headers;
            }
            headers["authorization"] = `Basic ${btoa(`${username}:${password}`)}`;
        } else if (options.auth.type === "Custom") {
            const value = getValue(options.auth.value);
            if (!value) {
                return headers;
            }
            headers["authorization"] = `${getValue(options.auth.prefix)} ${value}`;
        }
    }
    return headers;
};
// src/utils.ts
var JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(request) {
    const _contentType = request.headers.get("content-type");
    const textTypes = /* @__PURE__ */ new Set([
        "image/svg",
        "application/xml",
        "application/xhtml",
        "application/html"
    ]);
    if (!_contentType) {
        return "json";
    }
    const contentType = _contentType.split(";").shift() || "";
    if (JSON_RE.test(contentType)) {
        return "json";
    }
    if (textTypes.has(contentType) || contentType.startsWith("text/")) {
        return "text";
    }
    return "blob";
}
function isJSONParsable(value) {
    try {
        JSON.parse(value);
        return true;
    } catch (error) {
        return false;
    }
}
function isJSONSerializable(value) {
    if (value === void 0) {
        return false;
    }
    const t = typeof value;
    if (t === "string" || t === "number" || t === "boolean" || t === null) {
        return true;
    }
    if (t !== "object") {
        return false;
    }
    if (Array.isArray(value)) {
        return true;
    }
    if (value.buffer) {
        return false;
    }
    return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
function jsonParse(text) {
    try {
        return JSON.parse(text);
    } catch (error) {
        return text;
    }
}
function isFunction(value) {
    return typeof value === "function";
}
function getFetch(options) {
    if (options == null ? void 0 : options.customFetchImpl) {
        return options.customFetchImpl;
    }
    if (typeof globalThis !== "undefined" && isFunction(globalThis.fetch)) {
        return globalThis.fetch;
    }
    if (typeof window !== "undefined" && isFunction(window.fetch)) {
        return window.fetch;
    }
    throw new Error("No fetch implementation found");
}
function isPayloadMethod(method) {
    if (!method) {
        return false;
    }
    const payloadMethod = [
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];
    return payloadMethod.includes(method.toUpperCase());
}
function isRouteMethod(method) {
    const routeMethod = [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];
    if (!method) {
        return false;
    }
    return routeMethod.includes(method.toUpperCase());
}
async function getHeaders(opts) {
    const headers = new Headers(opts == null ? void 0 : opts.headers);
    const authHeader = await getAuthHeader(opts);
    for (const [key, value] of Object.entries(authHeader || {})){
        headers.set(key, value);
    }
    if (!headers.has("content-type")) {
        const t = detectContentType(opts == null ? void 0 : opts.body);
        if (t) {
            headers.set("content-type", t);
        }
    }
    return headers;
}
function getURL(url, options) {
    if (url.startsWith("@")) {
        const m = url.toString().split("@")[1].split("/")[0];
        if (methods.includes(m)) {
            url = url.replace(`@${m}/`, "/");
        }
    }
    let _url;
    try {
        if (url.startsWith("http")) {
            _url = url;
        } else {
            let baseURL = options == null ? void 0 : options.baseURL;
            if (baseURL && !(baseURL == null ? void 0 : baseURL.endsWith("/"))) {
                baseURL = baseURL + "/";
            }
            if (url.startsWith("/")) {
                _url = new URL(url.substring(1), baseURL);
            } else {
                _url = new URL(url, options == null ? void 0 : options.baseURL);
            }
        }
    } catch (e) {
        if (e instanceof TypeError) {
            if (!(options == null ? void 0 : options.baseURL)) {
                throw TypeError(`Invalid URL ${url}. Are you passing in a relative url but not setting the baseURL?`);
            }
            throw TypeError(`Invalid URL ${url}. Please validate that you are passing the correct input.`);
        }
        throw e;
    }
    if (options == null ? void 0 : options.params) {
        if (Array.isArray(options == null ? void 0 : options.params)) {
            const params = (options == null ? void 0 : options.params) ? Array.isArray(options.params) ? `/${options.params.join("/")}` : `/${Object.values(options.params).join("/")}` : "";
            _url = _url.toString().split("/:")[0];
            _url = `${_url.toString()}${params}`;
        } else {
            for (const [key, value] of Object.entries(options == null ? void 0 : options.params)){
                _url = _url.toString().replace(`:${key}`, String(value));
            }
        }
    }
    const __url = new URL(_url);
    const queryParams = options == null ? void 0 : options.query;
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)){
            __url.searchParams.append(key, String(value));
        }
    }
    return __url;
}
function detectContentType(body) {
    if (isJSONSerializable(body)) {
        return "application/json";
    }
    return null;
}
function getBody(options) {
    if (!(options == null ? void 0 : options.body)) {
        return null;
    }
    const headers = new Headers(options == null ? void 0 : options.headers);
    if (isJSONSerializable(options.body) && !headers.has("content-type")) {
        for (const [key, value] of Object.entries(options == null ? void 0 : options.body)){
            if (value instanceof Date) {
                options.body[key] = value.toISOString();
            }
        }
        return JSON.stringify(options.body);
    }
    return options.body;
}
function getMethod(url, options) {
    var _a;
    if (options == null ? void 0 : options.method) {
        return options.method.toUpperCase();
    }
    if (url.startsWith("@")) {
        const pMethod = (_a = url.split("@")[1]) == null ? void 0 : _a.split("/")[0];
        if (!methods.includes(pMethod)) {
            return (options == null ? void 0 : options.body) ? "POST" : "GET";
        }
        return pMethod.toUpperCase();
    }
    return (options == null ? void 0 : options.body) ? "POST" : "GET";
}
function getTimeout(options, controller) {
    let abortTimeout;
    if (!(options == null ? void 0 : options.signal) && (options == null ? void 0 : options.timeout)) {
        abortTimeout = setTimeout(()=>controller == null ? void 0 : controller.abort(), options == null ? void 0 : options.timeout);
    }
    return {
        abortTimeout,
        clearTimeout: ()=>{
            if (abortTimeout) {
                clearTimeout(abortTimeout);
            }
        }
    };
}
function bodyParser(data, responseType) {
    if (responseType === "json") {
        return JSON.parse(data);
    }
    return data;
}
var ValidationError = class _ValidationError extends Error {
    constructor(issues, message){
        super(message || JSON.stringify(issues, null, 2));
        this.issues = issues;
        Object.setPrototypeOf(this, _ValidationError.prototype);
    }
};
async function parseStandardSchema(schema, input) {
    let result = await schema["~standard"].validate(input);
    if (result.issues) {
        throw new ValidationError(result.issues);
    }
    return result.value;
}
// src/create-fetch/schema.ts
var methods = [
    "get",
    "post",
    "put",
    "patch",
    "delete"
];
var createSchema = (schema, config)=>{
    return {
        schema,
        config
    };
};
// src/create-fetch/index.ts
var applySchemaPlugin = (config)=>({
        id: "apply-schema",
        name: "Apply Schema",
        version: "1.0.0",
        async init (url, options) {
            var _a, _b, _c, _d;
            const schema = ((_b = (_a = config.plugins) == null ? void 0 : _a.find((plugin)=>{
                var _a2;
                return ((_a2 = plugin.schema) == null ? void 0 : _a2.config) ? url.startsWith(plugin.schema.config.baseURL || "") || url.startsWith(plugin.schema.config.prefix || "") : false;
            })) == null ? void 0 : _b.schema) || config.schema;
            if (schema) {
                let urlKey = url;
                if ((_c = schema.config) == null ? void 0 : _c.prefix) {
                    if (urlKey.startsWith(schema.config.prefix)) {
                        urlKey = urlKey.replace(schema.config.prefix, "");
                        if (schema.config.baseURL) {
                            url = url.replace(schema.config.prefix, schema.config.baseURL);
                        }
                    }
                }
                if ((_d = schema.config) == null ? void 0 : _d.baseURL) {
                    if (urlKey.startsWith(schema.config.baseURL)) {
                        urlKey = urlKey.replace(schema.config.baseURL, "");
                    }
                }
                const keySchema = schema.schema[urlKey];
                if (keySchema) {
                    let opts = __spreadProps(__spreadValues({}, options), {
                        method: keySchema.method,
                        output: keySchema.output
                    });
                    if (!(options == null ? void 0 : options.disableValidation)) {
                        opts = __spreadProps(__spreadValues({}, opts), {
                            body: keySchema.input ? await parseStandardSchema(keySchema.input, options == null ? void 0 : options.body) : options == null ? void 0 : options.body,
                            params: keySchema.params ? await parseStandardSchema(keySchema.params, options == null ? void 0 : options.params) : options == null ? void 0 : options.params,
                            query: keySchema.query ? await parseStandardSchema(keySchema.query, options == null ? void 0 : options.query) : options == null ? void 0 : options.query
                        });
                    }
                    return {
                        url,
                        options: opts
                    };
                }
            }
            return {
                url,
                options
            };
        }
    });
var createFetch = (config)=>{
    async function $fetch(url, options) {
        const opts = __spreadProps(__spreadValues(__spreadValues({}, config), options), {
            plugins: [
                ...(config == null ? void 0 : config.plugins) || [],
                applySchemaPlugin(config || {})
            ]
        });
        if (config == null ? void 0 : config.catchAllError) {
            try {
                return await betterFetch(url, opts);
            } catch (error) {
                return {
                    data: null,
                    error: {
                        status: 500,
                        statusText: "Fetch Error",
                        message: "Fetch related error. Captured by catchAllError option. See error property for more details.",
                        error
                    }
                };
            }
        }
        return await betterFetch(url, opts);
    }
    return $fetch;
};
// src/url.ts
function getURL2(url, option) {
    let { baseURL, params, query } = option || {
        query: {},
        params: {},
        baseURL: ""
    };
    let basePath = url.startsWith("http") ? url.split("/").slice(0, 3).join("/") : baseURL || "";
    if (url.startsWith("@")) {
        const m = url.toString().split("@")[1].split("/")[0];
        if (methods.includes(m)) {
            url = url.replace(`@${m}/`, "/");
        }
    }
    if (!basePath.endsWith("/")) basePath += "/";
    let [path, urlQuery] = url.replace(basePath, "").split("?");
    const queryParams = new URLSearchParams(urlQuery);
    for (const [key, value] of Object.entries(query || {})){
        if (value == null) continue;
        queryParams.set(key, String(value));
    }
    if (params) {
        if (Array.isArray(params)) {
            const paramPaths = path.split("/").filter((p)=>p.startsWith(":"));
            for (const [index, key] of paramPaths.entries()){
                const value = params[index];
                path = path.replace(key, value);
            }
        } else {
            for (const [key, value] of Object.entries(params)){
                path = path.replace(`:${key}`, String(value));
            }
        }
    }
    path = path.split("/").map(encodeURIComponent).join("/");
    if (path.startsWith("/")) path = path.slice(1);
    let queryParamString = queryParams.toString();
    queryParamString = queryParamString.length > 0 ? `?${queryParamString}`.replace(/\+/g, "%20") : "";
    if (!basePath.startsWith("http")) {
        return `${basePath}${path}${queryParamString}`;
    }
    const _url = new URL(`${path}${queryParamString}`, basePath);
    return _url;
}
// src/fetch.ts
var betterFetch = async (url, options)=>{
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { hooks, url: __url, options: opts } = await initializePlugins(url, options);
    const fetch = getFetch(opts);
    const controller = new AbortController();
    const signal = (_a = opts.signal) != null ? _a : controller.signal;
    const _url = getURL2(__url, opts);
    const body = getBody(opts);
    const headers = await getHeaders(opts);
    const method = getMethod(__url, opts);
    let context = __spreadProps(__spreadValues({}, opts), {
        url: _url,
        headers,
        body,
        method,
        signal
    });
    for (const onRequest of hooks.onRequest){
        if (onRequest) {
            const res = await onRequest(context);
            if (res instanceof Object) {
                context = res;
            }
        }
    }
    if ("pipeTo" in context && typeof context.pipeTo === "function" || typeof ((_b = options == null ? void 0 : options.body) == null ? void 0 : _b.pipe) === "function") {
        if (!("duplex" in context)) {
            context.duplex = "half";
        }
    }
    const { clearTimeout: clearTimeout2 } = getTimeout(opts, controller);
    let response = await fetch(context.url, context);
    clearTimeout2();
    const responseContext = {
        response,
        request: context
    };
    for (const onResponse of hooks.onResponse){
        if (onResponse) {
            const r = await onResponse(__spreadProps(__spreadValues({}, responseContext), {
                response: ((_c = options == null ? void 0 : options.hookOptions) == null ? void 0 : _c.cloneResponse) ? response.clone() : response
            }));
            if (r instanceof Response) {
                response = r;
            } else if (r instanceof Object) {
                response = r.response;
            }
        }
    }
    if (response.ok) {
        const hasBody = context.method !== "HEAD";
        if (!hasBody) {
            return {
                data: "",
                error: null
            };
        }
        const responseType = detectResponseType(response);
        const successContext = {
            data: "",
            response,
            request: context
        };
        if (responseType === "json" || responseType === "text") {
            const text = await response.text();
            const parser2 = (_d = context.jsonParser) != null ? _d : jsonParse;
            const data = await parser2(text);
            successContext.data = data;
        } else {
            successContext.data = await response[responseType]();
        }
        if (context == null ? void 0 : context.output) {
            if (context.output && !context.disableValidation) {
                successContext.data = await parseStandardSchema(context.output, successContext.data);
            }
        }
        for (const onSuccess of hooks.onSuccess){
            if (onSuccess) {
                await onSuccess(__spreadProps(__spreadValues({}, successContext), {
                    response: ((_e = options == null ? void 0 : options.hookOptions) == null ? void 0 : _e.cloneResponse) ? response.clone() : response
                }));
            }
        }
        if (options == null ? void 0 : options.throw) {
            return successContext.data;
        }
        return {
            data: successContext.data,
            error: null
        };
    }
    const parser = (_f = options == null ? void 0 : options.jsonParser) != null ? _f : jsonParse;
    const responseText = await response.text();
    const isJSONResponse = isJSONParsable(responseText);
    const errorObject = isJSONResponse ? await parser(responseText) : null;
    const errorContext = {
        response,
        responseText,
        request: context,
        error: __spreadProps(__spreadValues({}, errorObject), {
            status: response.status,
            statusText: response.statusText
        })
    };
    for (const onError of hooks.onError){
        if (onError) {
            await onError(__spreadProps(__spreadValues({}, errorContext), {
                response: ((_g = options == null ? void 0 : options.hookOptions) == null ? void 0 : _g.cloneResponse) ? response.clone() : response
            }));
        }
    }
    if (options == null ? void 0 : options.retry) {
        const retryStrategy = createRetryStrategy(options.retry);
        const _retryAttempt = (_h = options.retryAttempt) != null ? _h : 0;
        if (await retryStrategy.shouldAttemptRetry(_retryAttempt, response)) {
            for (const onRetry of hooks.onRetry){
                if (onRetry) {
                    await onRetry(responseContext);
                }
            }
            const delay = retryStrategy.getDelay(_retryAttempt);
            await new Promise((resolve)=>setTimeout(resolve, delay));
            return await betterFetch(url, __spreadProps(__spreadValues({}, options), {
                retryAttempt: _retryAttempt + 1
            }));
        }
    }
    if (options == null ? void 0 : options.throw) {
        throw new BetterFetchError(response.status, response.statusText, isJSONResponse ? errorObject : responseText);
    }
    return {
        data: null,
        error: __spreadProps(__spreadValues({}, errorObject), {
            status: response.status,
            statusText: response.statusText
        })
    };
};
;
 //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "a": (()=>isProduction),
    "b": (()=>isDevelopment),
    "e": (()=>env),
    "i": (()=>isTest)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const _envShim = /* @__PURE__ */ Object.create(null);
const _getEnv = (useShim)=>globalThis.process?.env || //@ts-expect-error
    globalThis.Deno?.env.toObject() || //@ts-expect-error
    globalThis.__env__ || (useShim ? _envShim : globalThis);
const env = new Proxy(_envShim, {
    get (_, prop) {
        const env2 = _getEnv();
        return env2[prop] ?? _envShim[prop];
    },
    has (_, prop) {
        const env2 = _getEnv();
        return prop in env2 || prop in _envShim;
    },
    set (_, prop, value) {
        const env2 = _getEnv(true);
        env2[prop] = value;
        return true;
    },
    deleteProperty (_, prop) {
        if (!prop) {
            return false;
        }
        const env2 = _getEnv(true);
        delete env2[prop];
        return true;
    },
    ownKeys () {
        const env2 = _getEnv(true);
        return Object.keys(env2);
    }
});
function toBoolean(val) {
    return val ? val !== "false" : false;
}
const nodeENV = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env && ("TURBOPACK compile-time value", "development") || "";
const isProduction = nodeENV === "production";
const isDevelopment = nodeENV === "dev" || nodeENV === "development";
const isTest = nodeENV === "test" || toBoolean(env.TEST);
;
}}),
"[project]/node_modules/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "B": (()=>BetterAuthError),
    "M": (()=>MissingDependencyError)
});
class BetterAuthError extends Error {
    constructor(message, cause){
        super(message);
        this.name = "BetterAuthError";
        this.message = message;
        this.cause = cause;
        this.stack = "";
    }
}
class MissingDependencyError extends BetterAuthError {
    constructor(pkgName){
        super(`The package "${pkgName}" is required. Make sure it is installed.`, pkgName);
    }
}
;
}}),
"[project]/node_modules/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "a": (()=>getBaseURL),
    "b": (()=>getHost),
    "c": (()=>getProtocol),
    "g": (()=>getOrigin)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-client] (ecmascript)");
;
;
function checkHasPath(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.pathname !== "/";
    } catch (error) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["B"](`Invalid base URL: ${url}. Please provide a valid base URL.`);
    }
}
function withPath(url, path = "/api/auth") {
    const hasPath = checkHasPath(url);
    if (hasPath) {
        return url;
    }
    path = path.startsWith("/") ? path : `/${path}`;
    return `${url.replace(/\/+$/, "")}${path}`;
}
function getBaseURL(url, path, request) {
    if (url) {
        return withPath(url, path);
    }
    const fromEnv = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["e"].BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["e"].NEXT_PUBLIC_BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["e"].PUBLIC_BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["e"].NUXT_PUBLIC_BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["e"].NUXT_PUBLIC_AUTH_URL || (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["e"].BASE_URL !== "/" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["e"].BASE_URL : void 0);
    if (fromEnv) {
        return withPath(fromEnv, path);
    }
    const fromRequest = request?.headers.get("x-forwarded-host");
    const fromRequestProto = request?.headers.get("x-forwarded-proto");
    if (fromRequest && fromRequestProto) {
        return withPath(`${fromRequestProto}://${fromRequest}`, path);
    }
    if (request) {
        const url2 = getOrigin(request.url);
        if (!url2) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["B"]("Could not get origin from request. Please provide a valid base URL.");
        }
        return withPath(url2, path);
    }
    if (typeof window !== "undefined" && window.location) {
        return withPath(window.location.origin, path);
    }
    return void 0;
}
function getOrigin(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.origin;
    } catch (error) {
        return null;
    }
}
function getProtocol(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.protocol;
    } catch (error) {
        return null;
    }
}
function getHost(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.host;
    } catch (error) {
        return url;
    }
}
;
}}),
"[project]/node_modules/nanostores/task/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "allTasks": (()=>allTasks),
    "cleanTasks": (()=>cleanTasks),
    "startTask": (()=>startTask),
    "task": (()=>task)
});
let tasks = 0;
let resolves = [];
function startTask() {
    tasks += 1;
    return ()=>{
        tasks -= 1;
        if (tasks === 0) {
            let prevResolves = resolves;
            resolves = [];
            for (let i of prevResolves)i();
        }
    };
}
function task(cb) {
    let endTask = startTask();
    let promise = cb().finally(endTask);
    promise.t = true;
    return promise;
}
function allTasks() {
    if (tasks === 0) {
        return Promise.resolve();
    } else {
        return new Promise((resolve)=>{
            resolves.push(resolve);
        });
    }
}
function cleanTasks() {
    tasks = 0;
}
}}),
"[project]/node_modules/nanostores/clean-stores/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "clean": (()=>clean),
    "cleanStores": (()=>cleanStores)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$task$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/task/index.js [app-client] (ecmascript)");
;
let clean = Symbol('clean');
let cleanStores = (...stores)=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$task$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cleanTasks"])();
    for (let $store of stores){
        if ($store) {
            if ($store.mocked) delete $store.mocked;
            if ($store[clean]) $store[clean]();
        }
    }
};
}}),
"[project]/node_modules/nanostores/atom/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "atom": (()=>atom),
    "epoch": (()=>epoch)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$clean$2d$stores$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/clean-stores/index.js [app-client] (ecmascript)");
;
let listenerQueue = [];
let lqIndex = 0;
const QUEUE_ITEMS_PER_LISTENER = 4;
let epoch = 0;
let atom = (initialValue)=>{
    let listeners = [];
    let $atom = {
        get () {
            if (!$atom.lc) {
                $atom.listen(()=>{})();
            }
            return $atom.value;
        },
        lc: 0,
        listen (listener) {
            $atom.lc = listeners.push(listener);
            return ()=>{
                for(let i = lqIndex + QUEUE_ITEMS_PER_LISTENER; i < listenerQueue.length;){
                    if (listenerQueue[i] === listener) {
                        listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
                    } else {
                        i += QUEUE_ITEMS_PER_LISTENER;
                    }
                }
                let index = listeners.indexOf(listener);
                if (~index) {
                    listeners.splice(index, 1);
                    if (!--$atom.lc) $atom.off();
                }
            };
        },
        notify (oldValue, changedKey) {
            epoch++;
            let runListenerQueue = !listenerQueue.length;
            for (let listener of listeners){
                listenerQueue.push(listener, $atom.value, oldValue, changedKey);
            }
            if (runListenerQueue) {
                for(lqIndex = 0; lqIndex < listenerQueue.length; lqIndex += QUEUE_ITEMS_PER_LISTENER){
                    listenerQueue[lqIndex](listenerQueue[lqIndex + 1], listenerQueue[lqIndex + 2], listenerQueue[lqIndex + 3]);
                }
                listenerQueue.length = 0;
            }
        },
        /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */ off () {},
        set (newValue) {
            let oldValue = $atom.value;
            if (oldValue !== newValue) {
                $atom.value = newValue;
                $atom.notify(oldValue);
            }
        },
        subscribe (listener) {
            let unbind = $atom.listen(listener);
            listener($atom.value);
            return unbind;
        },
        value: initialValue
    };
    if ("TURBOPACK compile-time truthy", 1) {
        $atom[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$clean$2d$stores$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"]] = ()=>{
            listeners = [];
            $atom.lc = 0;
            $atom.off();
        };
    }
    return $atom;
};
}}),
"[project]/node_modules/nanostores/lifecycle/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "STORE_UNMOUNT_DELAY": (()=>STORE_UNMOUNT_DELAY),
    "on": (()=>on),
    "onMount": (()=>onMount),
    "onNotify": (()=>onNotify),
    "onSet": (()=>onSet),
    "onStart": (()=>onStart),
    "onStop": (()=>onStop)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$clean$2d$stores$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/clean-stores/index.js [app-client] (ecmascript)");
;
const START = 0;
const STOP = 1;
const SET = 2;
const NOTIFY = 3;
const MOUNT = 5;
const UNMOUNT = 6;
const REVERT_MUTATION = 10;
let on = (object, listener, eventKey, mutateStore)=>{
    object.events = object.events || {};
    if (!object.events[eventKey + REVERT_MUTATION]) {
        object.events[eventKey + REVERT_MUTATION] = mutateStore((eventProps)=>{
            // eslint-disable-next-line no-sequences
            object.events[eventKey].reduceRight((event, l)=>(l(event), event), {
                shared: {},
                ...eventProps
            });
        });
    }
    object.events[eventKey] = object.events[eventKey] || [];
    object.events[eventKey].push(listener);
    return ()=>{
        let currentListeners = object.events[eventKey];
        let index = currentListeners.indexOf(listener);
        currentListeners.splice(index, 1);
        if (!currentListeners.length) {
            delete object.events[eventKey];
            object.events[eventKey + REVERT_MUTATION]();
            delete object.events[eventKey + REVERT_MUTATION];
        }
    };
};
let onStart = ($store, listener)=>on($store, listener, START, (runListeners)=>{
        let originListen = $store.listen;
        $store.listen = (arg)=>{
            if (!$store.lc && !$store.starting) {
                $store.starting = true;
                runListeners();
                delete $store.starting;
            }
            return originListen(arg);
        };
        return ()=>{
            $store.listen = originListen;
        };
    });
let onStop = ($store, listener)=>on($store, listener, STOP, (runListeners)=>{
        let originOff = $store.off;
        $store.off = ()=>{
            runListeners();
            originOff();
        };
        return ()=>{
            $store.off = originOff;
        };
    });
let onSet = ($store, listener)=>on($store, listener, SET, (runListeners)=>{
        let originSet = $store.set;
        let originSetKey = $store.setKey;
        if ($store.setKey) {
            $store.setKey = (changed, changedValue)=>{
                let isAborted;
                let abort = ()=>{
                    isAborted = true;
                };
                runListeners({
                    abort,
                    changed,
                    newValue: {
                        ...$store.value,
                        [changed]: changedValue
                    }
                });
                if (!isAborted) return originSetKey(changed, changedValue);
            };
        }
        $store.set = (newValue)=>{
            let isAborted;
            let abort = ()=>{
                isAborted = true;
            };
            runListeners({
                abort,
                newValue
            });
            if (!isAborted) return originSet(newValue);
        };
        return ()=>{
            $store.set = originSet;
            $store.setKey = originSetKey;
        };
    });
let onNotify = ($store, listener)=>on($store, listener, NOTIFY, (runListeners)=>{
        let originNotify = $store.notify;
        $store.notify = (oldValue, changed)=>{
            let isAborted;
            let abort = ()=>{
                isAborted = true;
            };
            runListeners({
                abort,
                changed,
                oldValue
            });
            if (!isAborted) return originNotify(oldValue, changed);
        };
        return ()=>{
            $store.notify = originNotify;
        };
    });
let STORE_UNMOUNT_DELAY = 1000;
let onMount = ($store, initialize)=>{
    let listener = (payload)=>{
        let destroy = initialize(payload);
        if (destroy) $store.events[UNMOUNT].push(destroy);
    };
    return on($store, listener, MOUNT, (runListeners)=>{
        let originListen = $store.listen;
        $store.listen = (...args)=>{
            if (!$store.lc && !$store.active) {
                $store.active = true;
                runListeners();
            }
            return originListen(...args);
        };
        let originOff = $store.off;
        $store.events[UNMOUNT] = [];
        $store.off = ()=>{
            originOff();
            setTimeout(()=>{
                if ($store.active && !$store.lc) {
                    $store.active = false;
                    for (let destroy of $store.events[UNMOUNT])destroy();
                    $store.events[UNMOUNT] = [];
                }
            }, STORE_UNMOUNT_DELAY);
        };
        if ("TURBOPACK compile-time truthy", 1) {
            let originClean = $store[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$clean$2d$stores$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"]];
            $store[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$clean$2d$stores$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"]] = ()=>{
                for (let destroy of $store.events[UNMOUNT])destroy();
                $store.events[UNMOUNT] = [];
                $store.active = false;
                originClean();
            };
        }
        return ()=>{
            $store.listen = originListen;
            $store.off = originOff;
        };
    });
};
}}),
"[project]/node_modules/better-auth/dist/shared/better-auth.Buni1mmI.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "u": (()=>useAuthQuery)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/atom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$lifecycle$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/lifecycle/index.js [app-client] (ecmascript)");
;
const isServer = typeof window === "undefined";
const useAuthQuery = (initializedAtom, path, $fetch, options)=>{
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atom"])({
        data: null,
        error: null,
        isPending: true,
        isRefetching: false,
        refetch: ()=>{
            return fn();
        }
    });
    const fn = ()=>{
        const opts = typeof options === "function" ? options({
            data: value.get().data,
            error: value.get().error,
            isPending: value.get().isPending
        }) : options;
        return $fetch(path, {
            ...opts,
            async onSuccess (context) {
                value.set({
                    data: context.data,
                    error: null,
                    isPending: false,
                    isRefetching: false,
                    refetch: value.value.refetch
                });
                await opts?.onSuccess?.(context);
            },
            async onError (context) {
                const { request } = context;
                const retryAttempts = typeof request.retry === "number" ? request.retry : request.retry?.attempts;
                const retryAttempt = request.retryAttempt || 0;
                if (retryAttempts && retryAttempt < retryAttempts) return;
                value.set({
                    error: context.error,
                    data: null,
                    isPending: false,
                    isRefetching: false,
                    refetch: value.value.refetch
                });
                await opts?.onError?.(context);
            },
            async onRequest (context) {
                const currentValue = value.get();
                value.set({
                    isPending: currentValue.data === null,
                    data: currentValue.data,
                    error: null,
                    isRefetching: true,
                    refetch: value.value.refetch
                });
                await opts?.onRequest?.(context);
            }
        });
    };
    initializedAtom = Array.isArray(initializedAtom) ? initializedAtom : [
        initializedAtom
    ];
    let isMounted = false;
    for (const initAtom of initializedAtom){
        initAtom.subscribe(()=>{
            if (isServer) {
                return;
            }
            if (isMounted) {
                fn();
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$lifecycle$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onMount"])(value, ()=>{
                    setTimeout(()=>{
                        fn();
                    }, 0);
                    isMounted = true;
                    return ()=>{
                        value.off();
                        initAtom.off();
                    };
                });
            }
        });
    }
    return value;
};
;
}}),
"[project]/node_modules/better-auth/dist/shared/better-auth.ffWeg50w.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "p": (()=>parseJSON)
});
const PROTO_POLLUTION_PATTERNS = {
    proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
    constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
    protoShort: /"__proto__"\s*:/,
    constructorShort: /"constructor"\s*:/
};
const JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
const SPECIAL_VALUES = {
    true: true,
    false: false,
    null: null,
    undefined: void 0,
    nan: Number.NaN,
    infinity: Number.POSITIVE_INFINITY,
    "-infinity": Number.NEGATIVE_INFINITY
};
const ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
    const match = ISO_DATE_REGEX.exec(value);
    if (!match) return null;
    const [, year, month, day, hour, minute, second, ms, offsetSign, offsetHour, offsetMinute] = match;
    let date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms ? parseInt(ms.padEnd(3, "0"), 10) : 0));
    if (offsetSign) {
        const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
        date.setUTCMinutes(date.getUTCMinutes() + offset);
    }
    return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
    const { strict = false, warnings = false, reviver, parseDates = true } = options;
    if (typeof value !== "string") {
        return value;
    }
    const trimmed = value.trim();
    if (trimmed[0] === '"' && trimmed.endsWith('"') && !trimmed.slice(1, -1).includes('"')) {
        return trimmed.slice(1, -1);
    }
    const lowerValue = trimmed.toLowerCase();
    if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) {
        return SPECIAL_VALUES[lowerValue];
    }
    if (!JSON_SIGNATURE.test(trimmed)) {
        if (strict) {
            throw new SyntaxError("[better-json] Invalid JSON");
        }
        return value;
    }
    const hasProtoPattern = Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern])=>{
        const matches = pattern.test(trimmed);
        if (matches && warnings) {
            console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
        }
        return matches;
    });
    if (hasProtoPattern && strict) {
        throw new Error("[better-json] Potential prototype pollution attempt detected");
    }
    try {
        const secureReviver = (key, value2)=>{
            if (key === "__proto__" || key === "constructor" && value2 && typeof value2 === "object" && "prototype" in value2) {
                if (warnings) {
                    console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
                }
                return void 0;
            }
            if (parseDates && typeof value2 === "string") {
                const date = parseISODate(value2);
                if (date) {
                    return date;
                }
            }
            return reviver ? reviver(key, value2) : value2;
        };
        return JSON.parse(trimmed, secureReviver);
    } catch (error) {
        if (strict) {
            throw error;
        }
        return value;
    }
}
function parseJSON(value, options = {
    strict: true
}) {
    return betterJSONParse(value, options);
}
;
}}),
"[project]/node_modules/better-auth/dist/shared/better-auth.Dw8i6Dcb.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "c": (()=>createDynamicPathProxy),
    "g": (()=>getClientConfig)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/atom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Buni1mmI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/shared/better-auth.Buni1mmI.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ffWeg50w$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/shared/better-auth.ffWeg50w.mjs [app-client] (ecmascript)");
;
;
;
;
;
const redirectPlugin = {
    id: "redirect",
    name: "Redirect",
    hooks: {
        onSuccess (context) {
            if (context.data?.url && context.data?.redirect) {
                if (typeof window !== "undefined" && window.location) {
                    if (window.location) {
                        try {
                            window.location.href = context.data.url;
                        } catch  {}
                    }
                }
            }
        }
    }
};
function getSessionAtom($fetch) {
    const $signal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atom"])(false);
    const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Buni1mmI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u"])($signal, "/get-session", $fetch, {
        method: "GET"
    });
    return {
        session,
        $sessionSignal: $signal
    };
}
const getClientConfig = (options)=>{
    const isCredentialsSupported = "credentials" in Request.prototype;
    const baseURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])(options?.baseURL, options?.basePath);
    const pluginsFetchPlugins = options?.plugins?.flatMap((plugin)=>plugin.fetchPlugins).filter((pl)=>pl !== void 0) || [];
    const $fetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createFetch"])({
        baseURL,
        ...isCredentialsSupported ? {
            credentials: "include"
        } : {},
        method: "GET",
        jsonParser (text) {
            if (!text) {
                return null;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ffWeg50w$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["p"])(text, {
                strict: false
            });
        },
        customFetchImpl: async (input, init)=>{
            try {
                return await fetch(input, init);
            } catch (error) {
                return Response.error();
            }
        },
        ...options?.fetchOptions,
        plugins: options?.disableDefaultFetchPlugins ? [
            ...options?.fetchOptions?.plugins || [],
            ...pluginsFetchPlugins
        ] : [
            redirectPlugin,
            ...options?.fetchOptions?.plugins || [],
            ...pluginsFetchPlugins
        ]
    });
    const { $sessionSignal, session } = getSessionAtom($fetch);
    const plugins = options?.plugins || [];
    let pluginsActions = {};
    let pluginsAtoms = {
        $sessionSignal,
        session
    };
    let pluginPathMethods = {
        "/sign-out": "POST",
        "/revoke-sessions": "POST",
        "/revoke-other-sessions": "POST",
        "/delete-user": "POST"
    };
    const atomListeners = [
        {
            signal: "$sessionSignal",
            matcher (path) {
                return path === "/sign-out" || path === "/update-user" || path.startsWith("/sign-in") || path.startsWith("/sign-up") || path === "/delete-user" || path === "/verify-email";
            }
        }
    ];
    for (const plugin of plugins){
        if (plugin.getAtoms) {
            Object.assign(pluginsAtoms, plugin.getAtoms?.($fetch));
        }
        if (plugin.pathMethods) {
            Object.assign(pluginPathMethods, plugin.pathMethods);
        }
        if (plugin.atomListeners) {
            atomListeners.push(...plugin.atomListeners);
        }
    }
    const $store = {
        notify: (signal)=>{
            pluginsAtoms[signal].set(!pluginsAtoms[signal].get());
        },
        listen: (signal, listener)=>{
            pluginsAtoms[signal].subscribe(listener);
        },
        atoms: pluginsAtoms
    };
    for (const plugin of plugins){
        if (plugin.getActions) {
            Object.assign(pluginsActions, plugin.getActions?.($fetch, $store, options));
        }
    }
    return {
        pluginsActions,
        pluginsAtoms,
        pluginPathMethods,
        atomListeners,
        $fetch,
        $store
    };
};
function getMethod(path, knownPathMethods, args) {
    const method = knownPathMethods[path];
    const { fetchOptions, query, ...body } = args || {};
    if (method) {
        return method;
    }
    if (fetchOptions?.method) {
        return fetchOptions.method;
    }
    if (body && Object.keys(body).length > 0) {
        return "POST";
    }
    return "GET";
}
function createDynamicPathProxy(routes, client, knownPathMethods, atoms, atomListeners) {
    function createProxy(path = []) {
        return new Proxy(function() {}, {
            get (target, prop) {
                const fullPath = [
                    ...path,
                    prop
                ];
                let current = routes;
                for (const segment of fullPath){
                    if (current && typeof current === "object" && segment in current) {
                        current = current[segment];
                    } else {
                        current = void 0;
                        break;
                    }
                }
                if (typeof current === "function") {
                    return current;
                }
                return createProxy(fullPath);
            },
            apply: async (_, __, args)=>{
                const routePath = "/" + path.map((segment)=>segment.replace(/[A-Z]/g, (letter)=>`-${letter.toLowerCase()}`)).join("/");
                const arg = args[0] || {};
                const fetchOptions = args[1] || {};
                const { query, fetchOptions: argFetchOptions, ...body } = arg;
                const options = {
                    ...fetchOptions,
                    ...argFetchOptions
                };
                const method = getMethod(routePath, knownPathMethods, arg);
                return await client(routePath, {
                    ...options,
                    body: method === "GET" ? void 0 : {
                        ...body,
                        ...options?.body || {}
                    },
                    query: query || options?.query,
                    method,
                    async onSuccess (context) {
                        await options?.onSuccess?.(context);
                        const matches = atomListeners?.find((s)=>s.matcher(routePath));
                        if (!matches) return;
                        const signal = atoms[matches.signal];
                        if (!signal) return;
                        const val = signal.get();
                        setTimeout(()=>{
                            signal.set(!val);
                        }, 10);
                    }
                });
            }
        });
    }
    return createProxy();
}
;
}}),
"[project]/node_modules/nanostores/listen-keys/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "listenKeys": (()=>listenKeys),
    "subscribeKeys": (()=>subscribeKeys)
});
function listenKeys($store, keys, listener) {
    let keysSet = new Set(keys).add(undefined);
    return $store.listen((value, oldValue, changed)=>{
        if (keysSet.has(changed)) {
            listener(value, oldValue, changed);
        }
    });
}
function subscribeKeys($store, keys, listener) {
    let unbind = listenKeys($store, keys, listener);
    listener($store.value);
    return unbind;
}
}}),
"[project]/node_modules/better-auth/dist/client/react/index.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "capitalizeFirstLetter": (()=>capitalizeFirstLetter),
    "createAuthClient": (()=>createAuthClient),
    "useStore": (()=>useStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Dw8i6Dcb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/shared/better-auth.Dw8i6Dcb.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$listen$2d$keys$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/listen-keys/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Buni1mmI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/shared/better-auth.Buni1mmI.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ffWeg50w$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/shared/better-auth.ffWeg50w.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
function useStore(store, options = {}) {
    let snapshotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(store.get());
    const { keys, deps = [
        store,
        keys
    ] } = options;
    let subscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useStore.useCallback[subscribe]": (onChange)=>{
            const emitChange = {
                "useStore.useCallback[subscribe].emitChange": (value)=>{
                    if (snapshotRef.current === value) return;
                    snapshotRef.current = value;
                    onChange();
                }
            }["useStore.useCallback[subscribe].emitChange"];
            emitChange(store.value);
            if (keys?.length) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$listen$2d$keys$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listenKeys"])(store, keys, emitChange);
            }
            return store.listen(emitChange);
        }
    }["useStore.useCallback[subscribe]"], deps);
    let get = ()=>snapshotRef.current;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, get, get);
}
function getAtomKey(str) {
    return `use${capitalizeFirstLetter(str)}`;
}
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function createAuthClient(options) {
    const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, $store, atomListeners } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Dw8i6Dcb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["g"])(options);
    let resolvedHooks = {};
    for (const [key, value] of Object.entries(pluginsAtoms)){
        resolvedHooks[getAtomKey(key)] = ()=>useStore(value);
    }
    const routes = {
        ...pluginsActions,
        ...resolvedHooks,
        $fetch,
        $store
    };
    const proxy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Dw8i6Dcb$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(routes, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
    return proxy;
}
;
}}),
}]);

//# sourceMappingURL=_12059f04._.js.map