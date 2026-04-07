# GruposDePreguntasRelacionadasApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAllGruposDePreguntasRelacionadas**](GruposDePreguntasRelacionadasApi.md#getallgruposdepreguntasrelacionadas) | **GET** /gruposDePreguntasRelacionadas | Obtener Grupos de Preguntas GrupoPreguntasRelacionadas |
| [**getAllGruposPreguntasByCategoria**](GruposDePreguntasRelacionadasApi.md#getallgrupospreguntasbycategoria) | **GET** /gruposDePreguntasRelacionadas/porCategoria/{id} | Obtener Grupos de Preguntas GrupoPreguntasRelacionadas por Categoria |



## getAllGruposDePreguntasRelacionadas

> Array&lt;GrupoPreguntasRelacionadas&gt; getAllGruposDePreguntasRelacionadas()

Obtener Grupos de Preguntas GrupoPreguntasRelacionadas

### Example

```ts
import {
  Configuration,
  GruposDePreguntasRelacionadasApi,
} from '';
import type { GetAllGruposDePreguntasRelacionadasRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GruposDePreguntasRelacionadasApi();

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


## getAllGruposPreguntasByCategoria

> Array&lt;GrupoPreguntasRelacionadas&gt; getAllGruposPreguntasByCategoria(id)

Obtener Grupos de Preguntas GrupoPreguntasRelacionadas por Categoria

### Example

```ts
import {
  Configuration,
  GruposDePreguntasRelacionadasApi,
} from '';
import type { GetAllGruposPreguntasByCategoriaRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new GruposDePreguntasRelacionadasApi();

  const body = {
    // string | el identificador de la categoria
    id: id_example,
  } satisfies GetAllGruposPreguntasByCategoriaRequest;

  try {
    const data = await api.getAllGruposPreguntasByCategoria(body);
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
| **id** | `string` | el identificador de la categoria | [Defaults to `undefined`] |

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
| **200** | Listado de preguntas GrupoPreguntasRelacionadas por categproa |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

