---
title: "Useful TypeScript Snippets"
date: "2026-05-28"
category: "snippets"
excerpt: "A collection of TypeScript patterns I keep reaching for over and over."
---

## TypeScript Snippets I Love

### Type-Safe Object Keys

```typescript
type Keys<T> = keyof T;

const config = { host: "localhost", port: 3000 };
type ConfigKey = Keys<typeof config>; // "host" | "port"
```

### Non-Nullable Utility

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

function assertDefined<T>(val: T): NonNullable<T> {
  if (val === null || val === undefined) {
    throw new Error("Value is null or undefined");
  }
  return val as NonNullable<T>;
}
```

### Exhaustive Switch

```typescript
function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

type Shape = "circle" | "square" | "triangle";

function describe(shape: Shape): string {
  switch (shape) {
    case "circle": return "A round shape";
    case "square": return "A four-sided shape";
    case "triangle": return "A three-sided shape";
    default: return assertNever(shape); // compile error if Shape grows
  }
}
```

### Partial Deep Update

```typescript
function deepMerge<T>(target: T, patch: Partial<T>): T {
  return { ...target, ...patch };
}
```

### Key Takeaways

- Use `keyof` to stay in sync with your data shapes
- Exhaustive switches catch bugs at compile time, not runtime
