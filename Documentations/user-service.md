# User Microservice

## Description

This service is in charge of user management and functions

> ## Content

> ## User

- [Get Current User](#get-current-user)
- [Get All Users](#get-all-users)
- [Get User By ID](#get-user)
- [Update User](#update-user)
- [Update User Email](#update-user-email)
- [Delete User](#delete-user)

## Get Current User

> **GET** /api/v1/user/me

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

#### Sample Response

> Status : 200

```json
  {
    "id": "2323",
    "username": "someone",
    "email": "someone@gmail.com",
  },
```

#### Possible Error message

```json
{
  "message": "unauthorized"
}
```

---

## Get All Users

> **GET** /api/v1/user

| Query   |              | Description             |
| ------- | ------------ | ----------------------- |
| page    | **optional** | pagination number       |
| perPage | **optional** | amount to send per page |

#### Sample Response

> Status : 200

```json
[
  {
    "id": "23232",
    "username": "someoune",
    "email": "janesmith@gmail.com",
  },
  {
    "id": "232",
    "name": "luck smith",
    "email": "jackedrow@gmail.com",
  }
]
```

### Possible error message

```json
{
  "error": "Internal server error"
}
```

---

## Get User

> **GET** /api/v1/user/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| Param |              | Description |
| ----- | ------------ | ----------- |
| id    | **required** | user Id     |

#### Sample Response

> Status : 200

```json
{
  "id": "3232",
  "username": "halenJane",
  "email": "smothsd@gmail.com",
}
```

#### Possible Error message

```json
{
  "message": "User not found"
}
```

---

## Update User

> **PATCH** /api/v1/user

| Body     |                 | Description                    |
| ----     |  ------------   | --------------------------     |
| username |   **required**  | username of the user to update |

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

#### Sample Response

> Status : 200 Ok

```json
{
  "id": "23232",
  "username": "jackrodwell",
  "email": "jackhee@gmail.com"
}
```

#### Possible error message

```json
  {
    "message":"Internal server error",

  },
   {
    "message":"User not found",

  },
  {
    "message": "unauthorized"
  },
```

---


---

## Delete User

> **DELETE** /api/v1/user

| Body     |              | Description                    |
| -------- | ------------ | ------------------------------ |
| password | **required** | password of the user to delete |

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

#### Sample Response

> Status : 200 Ok

```json
{
    "message":"User deleted successfully",
}
```

#### Possible error message

```json
  {
    "message":"Internal server error",

  },
  {
    "message": "unauthorized"
  },
  {
    "message": "invalid password"
  },
```

---
