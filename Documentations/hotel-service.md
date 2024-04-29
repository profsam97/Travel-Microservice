# Booking Microservice

## Description

This service is in charge of hotel booking related functionality

> ## Content

> ## Booking

- [Get Single Booking](#get-single-booking)
- [Create Booking](#create-booking)
- [Get All Booking](#get-all-booking)
- [Delete Booking](#delete-booking)

## Get Single Booking

> **GET** api/v1/hotel/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| Param |              | Description |
| ----- | ------------ | ----------- |
| id    | **required** | booking Id  |

#### Sample Response

> Status : 200

```json
  {
    "_id": "658b558347e889a31e9ee85f",
    "customer_id": "23232",
    "createdAt": "2024-04-29T22:36:51Z",
    "updatedAt": "2024-04-29T09:52:40Z"
  },
```

#### Possible Error message

```json
{
  "message": "Booking ID and Customer ID are required"
}
{
  "message": "unauthorized"
},
{
  "message": "Booking not found or customer ID mismatch"
}
```

---

## Create Booking

> **POST** api/v1/hotel

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |


#### Sample Response

> Status : 200

```json
  {
    "_id": "658b558347e889a31e9ee85f",
    "customer_id": "232323",
    "createdAt": "2024-04-29T22:36:51Z",
    "updatedAt": "2024-04-30T09:52:40Z"
  },
```

#### Possible Error message

```json
{
  "message": "unauthorized"
},
{
  "message": "internal server error"
}
```
---

## Delete Booking

> **DELETE** api/v1/hotel/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| param |              | Description       |
| ----- | ------------ | ----------------- |
| id    | **required** | booking to delete |

#### Sample Response

> Status : 200

```json
  {
   "response": "booking deleted successfully"
  },
```

#### Possible Error message

```json
{
  "message": "Booking ID and Customer ID are required"
}
{
  "message": "unauthorized"
},
{
  "message": "token expired"
}
```

---

## Get All Booking

> **GET** api/v1/hotel/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |


#### Sample Response

> Status : 200

```json
  {
    "_id": "658b558347e889a31e9ee85f",
    "customer_id": "232323",
    "createdAt": "2024-04-29T22:36:51Z",
    "updatedAt": "2024-04-30T09:52:40Z"
  },
    {
    "_id": "658b558347e889a3134ee8e32",
    "customer_id": "232323",
    "createdAt": "2024-04-28T22:36:51Z",
    "updatedAt": "2024-04-29T09:52:40Z"
  },
    {
    "_id": "658b558347e889a31e9ee34d",
    "customer_id": "232323",
    "createdAt": "2024-04-27T22:36:51Z",
    "updatedAt": "2024-04-30T09:52:40Z"
  },
```

#### Possible Error message

```json
{
  "message": "unauthorized"
},
{
  "message": "Internal server error"
}
```

