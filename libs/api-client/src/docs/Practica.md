
# Practica


## Properties

Name | Type
------------ | -------------
`idPractica` | string
`nombrePractica` | string
`preguntas` | [Array&lt;Pregunta&gt;](Pregunta.md)

## Example

```typescript
import type { Practica } from ''

// TODO: Update the object below with actual values
const example = {
  "idPractica": null,
  "nombrePractica": null,
  "preguntas": null,
} satisfies Practica

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Practica
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


