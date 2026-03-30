# CategoriasApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAllCategorias**](CategoriasApi.md#getallcategorias) | **GET** /categoria | Obtener categorias |
| [**getCategoriasResumen**](CategoriasApi.md#getcategoriasresumen) | **GET** /categoria/resumen | Obtener categorias con número de preguntas |
| [**getOneCategoriaById**](CategoriasApi.md#getonecategoriabyid) | **GET** /categoria/{id} | Obtener una categoria por id |



## getAllCategorias

> Array&lt;Categoria&gt; getAllCategorias()

Obtener categorias

### Example

```ts
import {
  Configuration,
  CategoriasApi,
} from '';
import type { GetAllCategoriasRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CategoriasApi();

  try {
    const data = await api.getAllCategorias();
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

[**Array&lt;Categoria&gt;**](Categoria.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de categorias |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCategoriasResumen

> Array&lt;CategoriaResumen&gt; getCategoriasResumen(tipo)

Obtener categorias con número de preguntas

### Example

```ts
import {
  Configuration,
  CategoriasApi,
} from '';
import type { GetCategoriasResumenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CategoriasApi();

  const body = {
    // string | Tipo de Cateogiras que queremos (Cuestionarios / No Cuestionarios) (optional)
    tipo: tipo_example,
  } satisfies GetCategoriasResumenRequest;

  try {
    const data = await api.getCategoriasResumen(body);
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
| **tipo** | `string` | Tipo de Cateogiras que queremos (Cuestionarios / No Cuestionarios) | [Optional] [Defaults to `&#39;CUESTIONARIOS&#39;`] |

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
| **200** | Lista de categorias con número de preguntas |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getOneCategoriaById

> Categoria getOneCategoriaById(id)

Obtener una categoria por id

### Example

```ts
import {
  Configuration,
  CategoriasApi,
} from '';
import type { GetOneCategoriaByIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CategoriasApi();

  const body = {
    // string | el identificador de la categoria
    id: id_example,
  } satisfies GetOneCategoriaByIdRequest;

  try {
    const data = await api.getOneCategoriaById(body);
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

[**Categoria**](Categoria.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Categoria por ID |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

