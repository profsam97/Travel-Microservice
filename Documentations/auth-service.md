# Auth Microservice

## Description

This microservice is in charge of all Authentication and Authorization functions

> ## Content

> ## Auth

- [User Signup](#user-signup)
- [User Signin](#user-signin)
- [User Logout](#user-logout)
- [Change User Password](#change-user-password)

## User Signup

> **POST** /api/v1/auth/sign-up

| Body      |              | Description                                             |
| --------- | ------------ | ------------------------------------------------------- |
| username  | **required** | Username of the account to be created                   |
| email     | **required** | email address of the account to be created              |
| Password  | **required**  | password of the account to be created                    |

#### Sample Response

> Status : 201 Created

```json
{
  "message": "User Registration successful"
}
```

### Possible error message

```json
{
  "message": "User already exist or input validation error ",
  "errors": [
    {
      "name": "username is required"
    },
    {
      "Email": "Email is required",
      "Email" : "Provide a valid email"
    },
    {
      "Password": "must be at least 8 characters"
    }
  ]
}
```

---

## User Signin

> **POST** /api/v1/auth/sign-in

| Body     |              | Description                                |
| -------- | ------------ | ------------------------------------------ |
| email    | **required** | email address of the account be created |
| Password | **required** | password of the account be created      |

## Sample Response

> Status: 200 Ok

```json
{
  "user": {
    "id": "342",
    "username": "profsam",
    "email": "someone@gmail.com",
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImZhbnRhY29rZUBnbWFpbC5jb20iLCJGaXJzdF9uYW1lIjoiRmFudGEiLCJMYXN0X25hbWUiOiJDb2tlIiwiVWlkIjoiNjU4YjU1ODM0N2U4ODlhMzFlOWVlODVmIiwiVXNlcl90eXBlIjoiQURNSU4iLCJleHAiOjE3MDM3NTcxNjB9.L0HiRH399fEF1EssIUGrymV9lmeth3OJtbEu0QqIt-4"
}
```

### Possible error messages

```json
  {
    "message":"user does not exist"}
   "error" :[
    {
      "email":"Invalid email address",
    },
    {
      "Password":"Invalid password"
    }
   ]

```
---

## User Logout

> **POST** /api/v1/auth/logout

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

## Sample Response

> Status: 200 Ok

```json
{
  "message": "Logout successful"
}
```

### Possible error messages

```json
  {
    "message":"Unauthorized"
  },
  {
    "message":"internal server error"
  }

```

---

## Change User Password

> **PATCH** /api/v1/auth/update-password

| Body            |              | Description                    |
| --------        | ------------ | --------------------------     |
| currentPassword | **required** | Current Password of user       |
| NewPassword     | **required** | new password of user to update |
| email           | **required** | email of user to update        |


| request |              | Description    |
| ------- | ------------ | -------------- |
| origin  | **optional** | request origin |

## Sample Response

> Status: 200 Ok

```json
{
  "message": "Password changed successfully"

}
```

### Possible error messages

```json
  {
    "message":"invalid current password"
  },
  {
    "message":"user not found"
  },
  {
    "message":"internal server error"
  }

```

---
