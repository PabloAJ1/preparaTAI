# AdminApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**inicializarDB**](AdminApi.md#inicializardb) | **GET** /shared/inicializarDB | Borrar la bd actual y la inicializa |



## inicializarDB

> inicializarDB()

Borrar la bd actual y la inicializa

### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { InicializarDBRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AdminApi();

  try {
    const data = await api.inicializarDB();
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
| **204** | Base de datos inicializada |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

