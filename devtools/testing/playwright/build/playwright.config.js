var s=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames,n=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var c=(t,e,r)=>e in t?s(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,p=(t,e)=>{for(var r in e||(e={}))m.call(e,r)&&c(t,r,e[r]);if(n)for(var r of n(e))f.call(e,r)&&c(t,r,e[r]);return t};var h=(t,e)=>{for(var r in e)s(t,r,{get:e[r],enumerable:!0})},v=(t,e,r,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of u(e))!m.call(t,o)&&o!==r&&s(t,o,{get:()=>e[o],enumerable:!(i=l(e,o))||i.enumerable});return t};var d=t=>v(s({},"__esModule",{value:!0}),t);var C={};h(C,{default:()=>y});module.exports=d(C);var a=require("@playwright/test"),g={testDir:"../../../../src",testMatch:/.*\.e2e\.ts/,fullyParallel:!0,timeout:30*1e3,expect:{timeout:5e3},forbidOnly:!!process.env.CI,retries:process.env.CI?2:0,workers:process.env.CI?1:void 0,reporter:"html",use:{actionTimeout:0,baseURL:"http://localhost:3000",trace:"on-first-retry",video:"retain-on-failure"},projects:[{name:"chromium",use:p({},a.devices["Desktop Chrome"])}],webServer:{command:"npm run dev:for-testing",port:3e3,timeout:120*1e3,reuseExistingServer:!process.env.CI}},y=g;0&&(module.exports={});
