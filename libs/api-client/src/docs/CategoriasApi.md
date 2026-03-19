# CategoriasApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAllCategorias**](CategoriasApi.md#getallcategorias) | **GET** /categoria | Obtener categorias |



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

