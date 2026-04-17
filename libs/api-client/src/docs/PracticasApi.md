# PracticasApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPractica**](PracticasApi.md#createpractica) | **POST** /practica/crearPractica | Guardar una practica |
| [**getAllPracticas**](PracticasApi.md#getallpracticas) | **GET** /practica | Obtener todas las practicas con estadisticas |
| [**getPracticaById**](PracticasApi.md#getpracticabyid) | **GET** /practica/{id} | Obtener una practica por id |
| [**getPracticaByIdInvertida**](PracticasApi.md#getpracticabyidinvertida) | **GET** /practica/{id}/invertida | Obtener una practica por id cambiando preguntas por respuestas |
| [**migracionPracticas**](PracticasApi.md#migracionpracticas) | **GET** /practica/migracion | Migra las preguntas a practicas |



## createPractica

> createPractica(practicaNueva)

Guardar una practica

### Example

```ts
import {
  Configuration,
  PracticasApi,
} from '';
import type { CreatePracticaRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PracticasApi();

  const body = {
    // PracticaNueva
    practicaNueva: ...,
  } satisfies CreatePracticaRequest;

  try {
    const data = await api.createPractica(body);
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
| **practicaNueva** | [PracticaNueva](PracticaNueva.md) |  | |

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
| **204** | Practica creada |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAllPracticas

> Array&lt;CategoriaResumen&gt; getAllPracticas()

Obtener todas las practicas con estadisticas

### Example

```ts
import {
  Configuration,
  PracticasApi,
} from '';
import type { GetAllPracticasRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PracticasApi();

  try {
    const data = await api.getAllPracticas();
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

[**Array&lt;CategoriaResumen&gt;**](CategoriaResumen.md)

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


## getPracticaById

> Practica getPracticaById(id, page, limit, seed)

Obtener una practica por id

### Example

```ts
import {
  Configuration,
  PracticasApi,
} from '';
import type { GetPracticaByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PracticasApi();

  const body = {
    // string | el identificador de la practica
    id: id_example,
    // number | Número de página (empieza en 1) (optional)
    page: 56,
    // number | Número de preguntas por página (optional)
    limit: 56,
    // number | Semilla para randomizar las preguntas (optional)
    seed: 56,
  } satisfies GetPracticaByIdRequest;

  try {
    const data = await api.getPracticaById(body);
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
| **id** | `string` | el identificador de la practica | [Defaults to `undefined`] |
| **page** | `number` | Número de página (empieza en 1) | [Optional] [Defaults to `1`] |
| **limit** | `number` | Número de preguntas por página | [Optional] [Defaults to `20`] |
| **seed** | `number` | Semilla para randomizar las preguntas | [Optional] [Defaults to `0`] |

### Return type

[**Practica**](Practica.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Listado de preguntas de la practica |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getPracticaByIdInvertida

> Practica getPracticaByIdInvertida(id, page, limit, seed)

Obtener una practica por id cambiando preguntas por respuestas

### Example

```ts
import {
  Configuration,
  PracticasApi,
} from '';
import type { GetPracticaByIdInvertidaRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PracticasApi();

  const body = {
    // string | el identificador de la practica
    id: id_example,
    // number | Número de página (empieza en 1) (optional)
    page: 56,
    // number | Número de preguntas por página (optional)
    limit: 56,
    // number | Semilla para randomizar las preguntas (optional)
    seed: 56,
  } satisfies GetPracticaByIdInvertidaRequest;

  try {
    const data = await api.getPracticaByIdInvertida(body);
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
| **id** | `string` | el identificador de la practica | [Defaults to `undefined`] |
| **page** | `number` | Número de página (empieza en 1) | [Optional] [Defaults to `1`] |
| **limit** | `number` | Número de preguntas por página | [Optional] [Defaults to `20`] |
| **seed** | `number` | Semilla para randomizar las preguntas | [Optional] [Defaults to `0`] |

### Return type

[**Practica**](Practica.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Listado de preguntas de la practica invertida |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## migracionPracticas

> migracionPracticas()

Migra las preguntas a practicas

### Example

```ts
import {
  Configuration,
  PracticasApi,
} from '';
import type { MigracionPracticasRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PracticasApi();

  try {
    const data = await api.migracionPracticas();
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
| **204** | Registros migrados |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

