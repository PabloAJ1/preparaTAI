# ExamenesApi

All URIs are relative to */api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAllExamenes**](ExamenesApi.md#getallexamenes) | **GET** /examenes | Obtener un listado de los Examenes |



## getAllExamenes

> Array&lt;Examen&gt; getAllExamenes()

Obtener un listado de los Examenes

### Example

```ts
import {
  Configuration,
  ExamenesApi,
} from '';
import type { GetAllExamenesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ExamenesApi();

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

