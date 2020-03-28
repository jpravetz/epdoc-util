# epdoc-util

Typescript utilities, mostly for type checking, with type-guards.

```ts
import { isBoolean } from 'epdoc-util';

if (isBoolean(value)) {
  doTask();
}
```

```ts
import { object as test } from 'epdoc-util';

let obj = { a: { b: 3 } };
test(obj)
  .property('a.b')
  .value(); // returns 3

u.path('a.c').setValue({}, 4); // results in { a: { c: 4 }}

test(obj)
  .property('a.b')
  .isInteger(); // returns true
```

## Build

```bash
npm run clean
npm run build
npm run test
```
