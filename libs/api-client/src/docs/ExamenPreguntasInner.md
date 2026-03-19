
# ExamenPreguntasInner


## Properties

Name | Type
------------ | -------------
`id` | string
`enunciado` | string
`respuestas` | [Array&lt;Respuesta&gt;](Respuesta.md)
`categorias` | [Array&lt;Categoria&gt;](Categoria.md)
`textoBase` | string
`preguntas` | [Array&lt;Pregunta&gt;](Pregunta.md)

## Example

```typescript
import type { ExamenPreguntasInner } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "enunciado": null,
  "respuestas": null,
  "categorias": null,
  "textoBase": null,
  "preguntas": null,
} satisfies ExamenPreguntasInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExamenPreguntasInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


