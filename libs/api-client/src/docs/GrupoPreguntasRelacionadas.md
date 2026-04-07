
# GrupoPreguntasRelacionadas


## Properties

Name | Type
------------ | -------------
`id` | string
`idGrupoPregunta` | string
`textoPre` | string
`textoPos` | string
`codigo` | string
`lenguaje` | string
`preguntas` | [Array&lt;Pregunta&gt;](Pregunta.md)

## Example

```typescript
import type { GrupoPreguntasRelacionadas } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "idGrupoPregunta": null,
  "textoPre": null,
  "textoPos": null,
  "codigo": null,
  "lenguaje": null,
  "preguntas": null,
} satisfies GrupoPreguntasRelacionadas

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GrupoPreguntasRelacionadas
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


