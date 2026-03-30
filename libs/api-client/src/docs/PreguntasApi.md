# PreguntasApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPregunta**](PreguntasApi.md#createpregunta) | **POST** /pregunta | Guardar una pregunta |
| [**deletePreguntaById**](PreguntasApi.md#deletepreguntabyid) | **DELETE** /pregunta/{id} | Eliminar una pregunta por id |
| [**enterrarPregunta**](PreguntasApi.md#enterrarpregunta) | **POST** /pregunta/{id}/enterrar | Entierra la pregunta para que no salga |
| [**getAllExamenes**](PreguntasApi.md#getallexamenes) | **GET** /examenes | Obtener un listado de los Examenes |
| [**getAllGruposDePreguntasRelacionadas**](PreguntasApi.md#getallgruposdepreguntasrelacionadas) | **GET** /gruposDePreguntasRelacionadas | Obtener Grupos de Preguntas GrupoPreguntasRelacionadas |
| [**getAllPreguntas**](PreguntasApi.md#getallpreguntas) | **GET** /pregunta | Obtener preguntas |
| [**getNumeroDePreguntas**](PreguntasApi.md#getnumerodepreguntas) | **GET** /pregunta/getNumeroDePreguntas | Obtener el numero de preguntas actuales en la base de datos |
| [**getOnePreguntasById**](PreguntasApi.md#getonepreguntasbyid) | **GET** /pregunta/{id} | Obtener una pregunta por id |
| [**getPreguntasPorCategoria**](PreguntasApi.md#getpreguntasporcategoria) | **GET** /pregunta/porCategoria/{id} | Obtener las preguntas que pertenecen a una categoria dada |
| [**registrarIntentoPregunta**](PreguntasApi.md#registrarintentopreguntaoperation) | **POST** /pregunta/{id}/intentos | Registrar intento de respuesta a una pregunta |
| [**reiniciarContadorDeEstadisticas**](PreguntasApi.md#reiniciarcontadordeestadisticas) | **GET** /pregunta/estadisticas/reiniciar | Reincia las estadisticas de las preguntas |
| [**updatePreguntaById**](PreguntasApi.md#updatepreguntabyid) | **PATCH** /pregunta/{id} | Actualizar una pregunta por id |



## createPregunta

> Array&lt;Pregunta&gt; createPregunta(pregunta)

Guardar una pregunta

### Example

```ts
import {
  Configuration,
  PreguntasApi,
} from '';
import type { CreatePreguntaRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PreguntasApi();

  const body = {
    // Pregunta
    pregunta: ...,
  } satisfies CreatePreguntaRequest;

  try {
    const data = await api.createPregunta(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **pregunta** | [Pregunta](Pregunta.md) |  | |

### Return type

[**Array&lt;Pregunta&gt;**](Pregunta.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Pregunta guardada con exito |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deletePreguntaById

> deletePreguntaById(id)

Eliminar una pregunta por id

### Example

```ts
import {
  Configuration,
  PreguntasApi,
} from '';
import type { DeletePreguntaByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PreguntasApi();

  const body = {
    // string | el identificador de la pregunta
    id: id_example,
  } satisfies DeletePreguntaByIdRequest;

  try {
    const data = await api.deletePreguntaById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | el identificador de la pregunta | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Pregunta eliminada por ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## enterrarPregunta

> enterrarPregunta(id)

Entierra la pregunta para que no salga

### Example

```ts
import {
  Configuration,
  PreguntasApi,
} from '';
import type { EnterrarPreguntaRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PreguntasApi();

  const body = {
    // string | Identificador de la pregunta
    id: id_example,
  } satisfies EnterrarPreguntaRequest;

  try {
    const data = await api.enterrarPregunta(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Identificador de la pregunta | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Intento registrado correctamente, sin contenido de respuesta |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAllExamenes

> Array&lt;Examen&gt; getAllExamenes()

Obtener un listado de los Examenes

### Example

```ts
import {
  Configuration,
  PreguntasApi,
} from '';
import type { GetAllExamenesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PreguntasApi();

  try {
    const data = await api.getAllExamenes();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;Examen&gt;**](Examen.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Listado de Examenes |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAllGruposDePreguntasRelacionadas

> Array&lt;GrupoPreguntasRelacionadas&gt; getAllGruposDePreguntasRelacionadas()

Obtener Grupos de Preguntas GrupoPreguntasRelacionadas

### Example

```ts
import {
  Configuration,
  PreguntasApi,
} from '';
import type { GetAllGruposDePreguntasRelacionadasRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PreguntasApi();

  try {
    const data = await api.getAllGruposDePreguntasRelacionadas();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;GrupoPreguntasRelacionadas&gt;**](GrupoPreguntasRelacionadas.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Listado de preguntas GrupoPreguntasRelacionadas |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAllPreguntas

> Array&lt;Pregunta&gt; getAllPreguntas()

Obtener preguntas

### Example

```ts
import {
  Configuration,
  PreguntasApi,
} from '';
import type { GetAllPreguntasRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PreguntasApi();

  try {
    const data = await api.getAllPreguntas();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;Pregunta&gt;**](Pregunta.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de preguntas |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getNumeroDePreguntas

> number getNumeroDePreguntas()

Obtener el numero de preguntas actuales en la base de datos

### Example

```ts
import {
  Configuration,
  PreguntasApi,
} from '';
import type { GetNumeroDePreguntasRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PreguntasApi();

  try {
    const data = await api.getNumeroDePreguntas();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

**number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Numero de preguntas en la abse de datos |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getOnePreguntasById

> Pregunta getOnePreguntasById(id)

Obtener una pregunta por id

### Example

```ts
import {
  Configuration,
  PreguntasApi,
} from '';
import type { GetOnePreguntasByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PreguntasApi();

  const body = {
    // string | el identificador de la pregunta
    id: id_example,
  } satisfies GetOnePreguntasByIdRequest;

  try {
    const data = await api.getOnePreguntasById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | el identificador de la pregunta | [Defaults to `undefined`] |

### Return type

[**Pregunta**](Pregunta.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Pregunta por ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getPreguntasPorCategoria

> Array&lt;Pregunta&gt; getPreguntasPorCategoria(id, page, limit, seed)

Obtener las preguntas que pertenecen a una categoria dada

### Example

```ts
import {
  Configuration,
  PreguntasApi,
} from '';
import type { GetPreguntasPorCategoriaRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PreguntasApi();

  const body = {
    // string | el identificador de la pregunta
    id: id_example,
    // number | Número de página (empieza en 1) (optional)
    page: 56,
    // number | Número de preguntas por página (optional)
    limit: 56,
    // number | Semilla para randomizar las preguntas (optional)
    seed: 56,
  } satisfies GetPreguntasPorCategoriaRequest;

  try {
    const data = await api.getPreguntasPorCategoria(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | el identificador de la pregunta | [Defaults to `undefined`] |
| **page** | `number` | Número de página (empieza en 1) | [Optional] [Defaults to `1`] |
| **limit** | `number` | Número de preguntas por página | [Optional] [Defaults to `20`] |
| **seed** | `number` | Semilla para randomizar las preguntas | [Optional] [Defaults to `0`] |

### Return type

[**Array&lt;Pregunta&gt;**](Pregunta.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Pregunta que pertenecen a una categoria |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## registrarIntentoPregunta

> registrarIntentoPregunta(id, registrarIntentoPreguntaRequest)

Registrar intento de respuesta a una pregunta

### Example

```ts
import {
  Configuration,
  PreguntasApi,
} from '';
import type { RegistrarIntentoPreguntaOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PreguntasApi();

  const body = {
    // string | Identificador de la pregunta
    id: id_example,
    // RegistrarIntentoPreguntaRequest
    registrarIntentoPreguntaRequest: ...,
  } satisfies RegistrarIntentoPreguntaOperationRequest;

  try {
    const data = await api.registrarIntentoPregunta(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Identificador de la pregunta | [Defaults to `undefined`] |
| **registrarIntentoPreguntaRequest** | [RegistrarIntentoPreguntaRequest](RegistrarIntentoPreguntaRequest.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Intento registrado correctamente, sin contenido de respuesta |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## reiniciarContadorDeEstadisticas

> reiniciarContadorDeEstadisticas()

Reincia las estadisticas de las preguntas

### Example

```ts
import {
  Configuration,
  PreguntasApi,
} from '';
import type { ReiniciarContadorDeEstadisticasRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PreguntasApi();

  try {
    const data = await api.reiniciarContadorDeEstadisticas();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Estadisticas reiniciadas |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updatePreguntaById

> Pregunta updatePreguntaById(id, preguntaUpdate)

Actualizar una pregunta por id

### Example

```ts
import {
  Configuration,
  PreguntasApi,
} from '';
import type { UpdatePreguntaByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PreguntasApi();

  const body = {
    // string | el identificador de la pregunta
    id: id_example,
    // PreguntaUpdate
    preguntaUpdate: ...,
  } satisfies UpdatePreguntaByIdRequest;

  try {
    const data = await api.updatePreguntaById(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | el identificador de la pregunta | [Defaults to `undefined`] |
| **preguntaUpdate** | [PreguntaUpdate](PreguntaUpdate.md) |  | |

### Return type

[**Pregunta**](Pregunta.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Pregunta actualizada por ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

