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


<div class="grid grid-cols-2 gap-4 h-80">
<div>

What we see
```html {3-8,12-16} 
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
```html {3-8,12-16} 
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
```html {3-9,12-15} 
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
```html {3-9,12-15} 
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

# Can I use?

Global	84.92%

![Local Image](/caniuse.jpg)

---
theme: default
background: https://source.unsplash.com/collection/94734566/1920x1080
highlighter: shiki
transition: slide-left
---

# Polyfill

