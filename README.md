# epdoc-util

Typescript utilities, mostly for type checking, with type-guards.

```ts
import { isBoolean } from 'epdoc-util';

if (isBoolean(value)) {
  doTask();
}
```

```ts
import { util as u } from 'epdoc-util';

let obj = { a: { b: 3 } };
u.path('a.b').value(obj); // returns 3

u.path('a.c').setValue({}, 4); // results in { a: { c: 4 }}

u.path('a.b').isInteger(obj); // returns true
```
