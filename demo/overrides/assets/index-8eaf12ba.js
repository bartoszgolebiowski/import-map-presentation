System.register(["react", "react-dom"], function (w, L) {
  "use strict";
  var a, u, p;
  return {
    setters: [
      (n) => {
        (a = n.default), (u = n.useState);
      },
      (n) => {
        p = n.default;
      },
    ],
    execute: function () {
      var n = document.createElement("style");
      (n.textContent = `#root{max-width:1280px;margin:0 auto;padding:2rem;text-align:center}.logo{height:6em;padding:1.5em;will-change:filter;transition:filter .3s}.logo:hover{filter:drop-shadow(0 0 2em #646cffaa)}.logo.react:hover{filter:drop-shadow(0 0 2em #61dafbaa)}@keyframes logo-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@media (prefers-reduced-motion: no-preference){a:nth-of-type(2) .logo{animation:logo-spin infinite 20s linear}}.card{padding:2em}.read-the-docs{color:#888}:root{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}a{font-weight:500;color:#646cff;text-decoration:inherit}a:hover{color:#535bf2}body{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}button{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}@media (prefers-color-scheme: light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}}
`),
        document.head.appendChild(n);
      var h = { exports: {} },
        c = {};
      /**
       * @license React
       * react-jsx-runtime.production.min.js
       *
       * Copyright (c) Facebook, Inc. and its affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var x = a,
        y = Symbol.for("react.element"),
        v = Symbol.for("react.fragment"),
        k = Object.prototype.hasOwnProperty,
        b =
          x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
            .ReactCurrentOwner,
        _ = { key: !0, ref: !0, __self: !0, __source: !0 };
      function m(i, t, l) {
        var o,
          r = {},
          s = null,
          f = null;
        l !== void 0 && (s = "" + l),
          t.key !== void 0 && (s = "" + t.key),
          t.ref !== void 0 && (f = t.ref);
        for (o in t) k.call(t, o) && !_.hasOwnProperty(o) && (r[o] = t[o]);
        if (i && i.defaultProps)
          for (o in ((t = i.defaultProps), t)) r[o] === void 0 && (r[o] = t[o]);
        return {
          $$typeof: y,
          type: i,
          key: s,
          ref: f,
          props: r,
          _owner: b.current,
        };
      }
      (c.Fragment = v), (c.jsx = m), (c.jsxs = m), (h.exports = c);
      var e = h.exports,
        d = {},
        g = p;
      (d.createRoot = g.createRoot), (d.hydrateRoot = g.hydrateRoot);
      const O = "./assets/react-35ef61ed.svg",
        j = "./vite.svg",
        E = "";
      function R() {
        const [i, t] = u(0);
        return e.jsxs(e.Fragment, {
          children: [
            e.jsxs("div", {
              children: [
                e.jsx("a", {
                  href: "https://vitejs.dev",
                  target: "_blank",
                  children: e.jsx("img", {
                    src: j,
                    className: "logo",
                    alt: "Vite logo",
                  }),
                }),
                e.jsx("a", {
                  href: "https://react.dev",
                  target: "_blank",
                  children: e.jsx("img", {
                    src: O,
                    className: "logo react",
                    alt: "React logo",
                  }),
                }),
              ],
            }),
            e.jsx("h1", { children: "Vite + React" }),
            e.jsxs("div", {
              className: "card",
              children: [
                e.jsxs("button", {
                  onClick: () => t((l) => l + 1),
                  children: ["count is ", i],
                }),
                e.jsxs("p", {
                  children: [
                    "Edit ",
                    e.jsx("code", { children: "src/App.tsx" }),
                    " and save to test HMR",
                  ],
                }),
              ],
            }),
            e.jsx("p", {
              className: "read-the-docs",
              children: ["React version", a.version],
            }),
            e.jsx("p", {
              className: "read-the-docs",
              children: [
                "https://cdnjs.cloudflare.com/ajax/libs/react/18.0.0/umd/react.production.min.js",
              ],
            }),
            e.jsx("p", {
              className: "read-the-docs",
              children: [
                "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.0.0/umd/react-dom.production.min.js",
              ],
            }),
          ],
        });
      }
      const N = "";
      d.createRoot(document.getElementById("root")).render(
        e.jsx(a.StrictMode, { children: e.jsx(R, {}) })
      );
    },
  };
});
