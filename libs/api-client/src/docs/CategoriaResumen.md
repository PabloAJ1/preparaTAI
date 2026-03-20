
# CategoriaResumen


## Properties

Name | Type
------------ | -------------
`id` | string
`nombre` | string
`numeroPreguntas` | number

## Example

```typescript
import type { CategoriaResumen } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 0000-00000-0000000-0000,
  "nombre": Java,
  "numeroPreguntas": 35,
} satisfies CategoriaResumen

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CategoriaResumen
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


