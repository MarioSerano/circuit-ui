# ISP Documentation for packages/circuit-ui/util/id.ts, function uniqueId

## Input Domain Model

| Characteristics                       | b1          | b2          | b3          | b4           | b5              | b6          | b7        | b8           | b9          | b10       | b11           |
| ------------------------------------- | ----------- | ----------- | ----------- | ------------ | --------------- | ----------- | --------- | ------------ | ----------- | --------- | ------------- |
| Check whether X is an Array Data Type | Is a String | Is a Number | Is a Bigint | Is a Boolean | Is an Undefined | Is a Symbol | Is a Null | Is an Object | Is an Array | Is a Date | Is a Function |

The domain model that I've constructed is based on the 8 data types in Javascript. Everything is disjointed to one another,
with an exception of Array and Object. Since in Javascript, an Array is an Object, thus this differentiation need to be
mentioned in the blocks.

## IDM Relabeling Table

| Characteristics | b1  | b2  | b3  | b4  | b5  | b6  | b7  | b8  | b9  | b10 | b11 |
| --------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A               | A1  | A2  | A3  | A4  | A5  | A6  | A7  | A8  | A9  | A10 | A11 |

## Constraints

- b8 is True iff b9 is False and b10 is false
- b9 is True iff b8 is False
- b10 is True iff b8 is False

This is due to Javascript identifying an Array as an Object data type in using `typeof` operator, thus need a constraint
of which an Array cannot be an Object as well. This is also the case for the `Date` object since it is a class, represented
by `object` in the `typeof` operator.

## Test Values and Example I/O

Criteria Used: Check whether X is an Array

| Test Value | Example Input        | Expected Output |
| ---------- | -------------------- | --------------- |
| A1         | `"This is a String"` | `false`         |
| A2         | `12546`              | `false`         |
| A3         | `BigInt(1)`          | `false`         |
| A4         | `false`              | `false`         |
| A5         | `undefined`          | `false`         |
| A6         | `Symbol(123456)`     | `false`         |
| A7         | `null`               | `false`         |
| A8         | `{foo: 'bar'}`       | `false`         |
| A9         | `['foo','bar']`      | `true`          |
| A10        | `new Date()`         | `false`         |
| A11        | `jest.fn()`          | `false`         |

## Existing Test

This is the existing test but there are 6 more data type that I need to make the test for, such as:

- `"This is a string"`
- `123456`
- `BigInt(1)`
- `false`
- `new Date()`
- `Symbol(123456)`

With the existing test cases such as:

- `[]`
- `{ foo: 'bar' }`
- `jest.fn()`
- `null`
- `undefined`
