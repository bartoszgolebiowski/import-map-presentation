---
theme: default
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
transition: slide-left
title: Import maps.  How to control the behavior of JavaScript imports?
---

# Import maps. How to control the behavior of JavaScript imports?

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
theme: default
background: https://source.unsplash.com/collection/94734566/1920x1080
highlighter: shiki
transition: slide-left
---

# Without import map

Importing __lodash__ this way does not work 

```html {6-9} 
<html>
  <head>

  </head>
  <body>
    <script type="module">
      import _ from "lodash";
      console.log(_.VERSION);
    </script>
  </body>
</html>
```

Console:
```console
Uncaught TypeError: Failed to resolve module specifier "lodash".  
Relative references must start with either "/", "./", or "../".
```

---
theme: default
background: https://source.unsplash.com/collection/94734566/1920x1080
highlighter: shiki
transition: slide-left
---

# With import map

- importmap is a script tag with **type="importmap"**
- importmap is a json object with imports key and value, where **key is a specifier** and **value is a url**
- script is a module script with **type="module"** and "lodash" is imported as a **module**

<div class="grid grid-cols-2 gap-4 h-80">
<div>

What we see


```html {4-8,12-16} 
<html>
  <head>
    <script type="importmap">
      {
        "imports": {
          "lodash": "https://cdn.skypack.dev/lodash"
        }
      }
    </script>
  </head>
  <body>
    <script type="module">
      import _ from "lodash";

      console.log(_.VERSION);
    </script>
  </body>
</html>
```

</div>
<div>

What browser sees
```html {4-8,12-16} 
<html>
  <head>
    <script type="importmap">
      {
        "imports": {
          "lodash": "https://cdn.skypack.dev/lodash"
        }
      }
    </script>
  </head>
  <body>
    <script type="module">
      import _ from "https://cdn.skypack.dev/lodash";

      console.log(_.VERSION);
    </script>
  </body>
</html>
```

</div>
</div>

---
theme: default
background: https://source.unsplash.com/collection/94734566/1920x1080
highlighter: shiki
transition: slide-left
---

# Import map scopes

<div class="grid grid-cols-2 gap-4 h-80">
<div>

```json
{
  "imports": {
    "a": "/a-1.mjs",
    "b": "/b-1.mjs",
    "c": "/c-1.mjs"
  },
  "scopes": {
    "/scope2/": {
      "a": "/a-2.mjs"
    },
    "/scope2/scope3/": {
      "b": "/b-3.mjs"
    }
  }
}
```
</div>
<div>
<table class="table-auto">
   <thead>
      <tr>
         <th>Specifier</th>
         <th>Referrer</th>
         <th>Resulting URL</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>a</td>
         <td>/scope2/scope3/foo.mjs</td>
         <td>/a-2.mjs</td>
      </tr>
      <tr>
         <td>b</td>
         <td>/scope2/scope3/foo.mjs</td>
         <td>/b-3.mjs</td>
      </tr>
      <tr>
         <td>c</td>
         <td>/scope2/scope3/foo.mjs</td>
         <td>/c-1.mjs</td>
      </tr>
   </tbody>
</table>
</div>
</div>
---
theme: default
background: https://source.unsplash.com/collection/94734566/1920x1080
highlighter: shiki
transition: slide-left
---

# Actual usage imports

<div class="grid grid-cols-2 gap-4 h-80">
<div>

Develop environment
```html {3-9,11-15} 
<html>
  <script type="importmap">
    {
      "imports": {
        "@/dashboard": "https://cdn.com/9/dashboard.mjs",
        "@/navbar": "https://cdn.com/3/navbar.mjs",
        "@/cart": "https://cdn.com/8/cart.mjs"
      }
    }
  </script>
  <script type="module">
    import dashboard from "@/dashboard";
    import navbar from "@/navbar";
    import cart from "@/cart";
    
    dashboard.init();
    navbar.init();
    cart.init();
 </script>
</html>
```

</div>
<div>

Production environment
```html {3-9,11-15} 
<html>
  <script type="importmap">
    {
      "imports": {
        "@/dashboard": "https://cdn.com/8/dashboard.mjs",
        "@/navbar": "https://cdn.com/2/navbar.mjs",
        "@/cart": "https://cdn.com/4/cart.mjs"
      }
    }
  </script>
  <script type="module">
    import dashboard from "@/dashboard";
    import navbar from "@/navbar";
    import cart from "@/cart";

    dashboard.init();
    navbar.init();
    cart.init();
  </script>
</html>
```

</div>
</div>

---

# Actual usage scopes

```html {3-13,16-18} 
<html>
  <script type="importmap">
    {
      "imports": {
        "lodash": "https://cdn.skypack.dev/lodash@4.17.16",
        "@/experimental/feature": "https://cdn.com/experimental/feature.mjs"
      },
      "scopes": {
        "/experimental/": {
          "lodash": "https://cdn.skypack.dev/lodash"
        }
      }
    }
  </script>
  <script type="module">
    import old from "lodash";
    import next from "@/experimental/feature";

    console.log(old.VERSION) // 4.17.16
    console.log(new.VERSION) // 4.17.21
 </script>
</html>
```

---
theme: default
highlighter: shiki
transition: slide-left
---

# Can I use?

Global	84.92%

![Local Image](/caniuse.jpg)

---

# Polyfill

Total size of polyfill is **6.9kB over network.**
Import map can use **UMD**, **SystemJS**. 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script type="systemjs-importmap">
      {
        "imports": {
          "react": "https://cdn.net/umd/react.js", <!--UMD-->
          "react-dom": "https://cdn.net/umd/react-dom.js", <!--UMD-->
          "@company/appshell": "https://cdn.com/10/appshell" <!--SystemJS-->
        }
      }
    </script>
    <script src="https://cdn.net/system.min.js"></script> <!--5.5kB over network-->
    <script src="https://cdn.net/amd.min.js"></script> <!--1.4kB over network-->
    <title>Import map polyfill</title>
  </head>
  <script>
    System.import("@company/appshell").then((appshell) => {
      appshell.init();
    });
  </script>
</html>
```
---

# Why import maps? File size

- With correct usage of import maps we can reduce the size of our build assets
  - We don't have to include the same dependencies in build assets, we can share them
    - We can use CDN to serve shared dependencies
  - Reducing the size of output files allows for downloading less of the assets
  - Assets used in import map are ofen cached by browser via **Cache-Control** headers
    - public, max-age=31536000, immutable

---

# Why import maps? File size, example

Infographic from **Micro Frontends in Action** _Michael Geers_

![Local Image](/resize-share-deps.png)

---

# Why import maps? Dependency management

- Import maps allow us to manage dependencies in a single place
  - We can easily update dependencies
    - Upgrade of the shared dependency will affect all applications
    - Still have possibility to iterative migration of dependencies 
  - We can easily release new versions of applications
    - Just update import map on CDN
    - In case of regression revert import map to previous version
    - For development purposes we can override import map in runtime (security risk, but useful for development)

---

# Why import maps? Dependency management, externals example

Without externals

<div class="flex">
<span>

<iframe src="http://localhost:5500/demo/externals/module" height="150" width="150"></iframe>
</span>
<iframe src="http://localhost:5500/demo/externals/module" height="150" width="150"></iframe>
<iframe src="http://localhost:5500/demo/externals/module" height="150" width="150"></iframe>
<iframe src="http://localhost:5500/demo/externals/module" height="150" width="150"></iframe>
<iframe src="http://localhost:5500/demo/externals/module" height="150" width="150"></iframe>
</div>
---

# Why import maps? Dependency management, example

```html{4}
<html>
  <head>
    <title>Inject import map</title>
    <script type="importmap" id="importmap"></script>
  </head>
  ...
</html>
```

```js
class Handler {
  constructor(importMap) { this.importMap = importMap }
  element(element) { element.setInnerContent(this.importMap) }
}

export default {
  async fetch(request) {
    let resImport = fetch('https://cdn.com/import-map.json').then(res => res.text())
    let resHTML = fetch('https://cdn.com/index.html');
    const [map, html] = await Promise.all([resImport,resHTML])

    return new HTMLRewriter().on('#importmap', new Handler(map)).transform(html);
  }
}
```

---

# Why import maps? Dependency management, example

Process of releasing new version of application

![Local Image](/release.png)

---

# Why import maps? Dependency overrides

With **import-map-overrides** we are able to override import maps in runtime

![Local Image](/import-map-override.gif)	

---