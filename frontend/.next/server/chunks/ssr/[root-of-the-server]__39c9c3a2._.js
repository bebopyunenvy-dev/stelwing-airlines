module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/fullcalendar/test01/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$daygrid$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fullcalendar/daygrid/index.js [app-ssr] (ecmascript)"); // a plugin!
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fullcalendar/list/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fullcalendar/react/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$timegrid$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@fullcalendar/timegrid/index.js [app-ssr] (ecmascript)"); // a plugin!
'use client';
;
;
;
;
;
function App() {
    const events12 = [
        // 🛫 12/22 出發日（含跨時段活動）
        {
            title: '桃園 > 成田',
            start: '2025-12-22T08:30:00',
            end: '2025-12-22T13:00:00'
        },
        {
            title: '抵達飯店 Check-in',
            start: '2025-12-22T14:00:00',
            end: '2025-12-22T15:00:00'
        },
        {
            title: '澀谷散步',
            start: '2025-12-22T16:00:00',
            end: '2025-12-22T17:30:00',
            color: '#DCBB87'
        },
        {
            title: '晚餐：燒肉 Like',
            start: '2025-12-22T18:30:00',
            end: '2025-12-22T20:00:00',
            color: '#A87B47'
        },
        {
            title: '藥妝店採購',
            start: '2025-12-22T20:30:00',
            end: '2025-12-22T21:30:00',
            color: '#1F2E3C'
        },
        // 🏙️ 12/23 東京一日遊（多筆）
        {
            title: '淺草寺參拜',
            start: '2025-12-23T09:00:00',
            end: '2025-12-23T10:00:00'
        },
        {
            title: '晴空塔展望台',
            start: '2025-12-23T10:30:00',
            end: '2025-12-23T12:00:00'
        },
        {
            title: '午餐：築地壽司',
            start: '2025-12-23T12:30:00',
            end: '2025-12-23T13:30:00',
            color: '#B35E2E'
        },
        {
            title: '銀座逛街',
            start: '2025-12-23T14:00:00',
            end: '2025-12-23T17:30:00',
            color: '#6E6658'
        },
        {
            title: '歌舞伎町夜拍',
            start: '2025-12-23T20:00:00',
            end: '2025-12-23T22:00:00',
            color: '#1F2E3C'
        },
        // 🎄 12/24–25：聖誕跨夜活動（跨日事件）
        // {
        //   title: '聖誕燈節夜拍',
        //   start: '2025-12-24T19:00:00',
        //   end: '2025-12-25T01:00:00',
        //   color: '#DCBB87',
        // },
        // 🎅 12/24 當日滿滿行程（觸發 +more）
        {
            title: '原宿表參道',
            start: '2025-12-24T10:00:00',
            end: '2025-12-24T11:00:00'
        },
        {
            title: '代代木公園散步',
            start: '2025-12-24T11:00:00',
            end: '2025-12-24T12:00:00'
        },
        {
            title: '午餐：Bills 鬆餅',
            start: '2025-12-24T12:30:00',
            end: '2025-12-24T13:30:00'
        },
        {
            title: '澀谷十字路口拍照',
            start: '2025-12-24T14:00:00',
            end: '2025-12-24T14:30:00'
        },
        {
            title: '涉谷 Parco 逛街',
            start: '2025-12-24T15:00:00',
            end: '2025-12-24T17:00:00'
        },
        {
            title: '回飯店小睡',
            start: '2025-12-24T17:00:00',
            end: '2025-12-24T18:00:00'
        },
        {
            title: '六本木夜景',
            start: '2025-12-24T19:00:00',
            end: '2025-12-24T20:00:00',
            color: '#1F2E3C'
        },
        {
            title: '聖誕晚餐',
            start: '2025-12-24T20:00:00',
            end: '2025-12-24T21:30:00',
            color: '#DCBB87'
        },
        // 🎁 12/25 聖誕節
        {
            title: '新宿早餐',
            start: '2025-12-25T09:00:00',
            end: '2025-12-25T10:00:00'
        },
        {
            title: '明治神宮',
            start: '2025-12-25T10:30:00',
            end: '2025-12-25T12:00:00'
        },
        {
            title: '午餐：烏龍麵',
            start: '2025-12-25T12:30:00',
            end: '2025-12-25T13:30:00'
        },
        {
            title: '涉谷 109',
            start: '2025-12-25T14:00:00',
            end: '2025-12-25T16:00:00'
        },
        {
            title: '甜點咖啡廳',
            start: '2025-12-25T20:00:00',
            end: '2025-12-25T21:30:00',
            color: '#DCBB87'
        },
        {
            title: '回飯店休息',
            start: '2025-12-25T22:00:00',
            end: '2025-12-25T23:30:00'
        },
        // 🛬 12/26 回程
        {
            title: '早餐 Buffet',
            start: '2025-12-26T08:00:00',
            end: '2025-12-26T09:00:00'
        },
        {
            title: 'Check-out',
            start: '2025-12-26T10:00:00',
            end: '2025-12-26T11:00:00'
        },
        {
            title: '羽田 > 桃園',
            start: '2025-12-26T13:00:00',
            end: '2025-12-26T17:00:00'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-screen flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "w-full h-[82px] bg-[#1F2E3C] flex items-center px-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-white text-xl",
                            children: "我的 Header"
                        }, void 0, false, {
                            fileName: "[project]/app/fullcalendar/test01/page.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/fullcalendar/test01/page.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-4 flex justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-1/2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                plugins: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$daygrid$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$timegrid$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$fullcalendar$2f$list$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                                ],
                                initialView: "dayGridMonth",
                                initialDate: "2025-12-22",
                                selectable: true,
                                selectMirror: true,
                                unselectAuto: true,
                                height: "100%",
                                stickyHeaderDates: true,
                                headerToolbar: {
                                    start: 'title',
                                    center: 'prev,next today',
                                    end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                                },
                                buttonText: {
                                    today: '今天',
                                    month: '月曆',
                                    week: '週曆',
                                    day: '日曆',
                                    list: '列表'
                                },
                                events: events12,
                                eventColor: "#DCBB87",
                                eventClick: (info)=>{
                                    // 阻止預設的導向行為（例如連到網址）
                                    info.jsEvent.preventDefault();
                                    // 這裡可以取到被點擊的事件資料
                                    console.log(info.event.title);
                                    console.log(info.event.start);
                                    console.log(info.event.end);
                                    // 你可以這樣開啟彈窗或導頁
                                    alert(`行程：${info.event.title}\n日期：${info.event.start?.toLocaleDateString()}`);
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/fullcalendar/test01/page.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/fullcalendar/test01/page.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/fullcalendar/test01/page.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/fullcalendar/test01/page.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "h-[589px] bg-[#1F2E3C]"
            }, void 0, false, {
                fileName: "[project]/app/fullcalendar/test01/page.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__39c9c3a2._.js.map