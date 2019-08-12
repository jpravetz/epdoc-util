# epdoc-util

Typescript utilities.

```ts
let v = u.isBoolean(value);

u.path('a.b').value({ a: { b: 3 } }); // returns 3

u.path('a.c').setValue({}, 4); // results in { a: { c: 4 }}
```
