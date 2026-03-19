
# Examen


## Properties

Name | Type
------------ | -------------
`id` | string
`nombre` | string
`anio` | number
`grupo` | string
`subgrupo` | string
`preguntas` | [Array&lt;ExamenPreguntasInner&gt;](ExamenPreguntasInner.md)

## Example

```typescript
import type { Examen } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "nombre": null,
  "anio": null,
  "grupo": null,
  "subgrupo": null,
  "preguntas": null,
} satisfies Examen

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Examen
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


