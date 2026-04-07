
# ExamenPreguntasInner


## Properties

Name | Type
------------ | -------------
`id` | string
`enunciado` | string
`estado` | string
`descartada` | boolean
`respuestas` | [Array&lt;Respuesta&gt;](Respuesta.md)
`categorias` | [Array&lt;Categoria&gt;](Categoria.md)
`estadisticas` | [Estadistica](Estadistica.md)
`idGrupoPregunta` | string
`textoPre` | string
`textoPos` | string
`codigo` | string
`lenguaje` | string
`preguntas` | [Array&lt;Pregunta&gt;](Pregunta.md)

## Example

```typescript
import type { ExamenPreguntasInner } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "enunciado": null,
  "estado": null,
  "descartada": null,
  "respuestas": null,
  "categorias": null,
  "estadisticas": null,
  "idGrupoPregunta": null,
  "textoPre": null,
  "textoPos": null,
  "codigo": null,
  "lenguaje": null,
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


