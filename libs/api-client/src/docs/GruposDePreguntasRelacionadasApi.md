# GruposDePreguntasRelacionadasApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAllGruposDePreguntasRelacionadas**](GruposDePreguntasRelacionadasApi.md#getallgruposdepreguntasrelacionadas) | **GET** /gruposDePreguntasRelacionadas | Obtener Grupos de Preguntas GrupoPreguntasRelacionadas |



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

