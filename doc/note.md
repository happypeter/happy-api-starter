### 关于 `_id` 和 `id` 的问题。

原则是，服务器端内部肯定用 `_id` ，客户端用 `id`

- 返回给客户端的数据中用 `_id`
- 客户端发送过来的数据中都用 `id` ，不用 `userId` 也不用发 `_id`


### 使用 Postman 调试 API

```
POST localhost:3008/user/signup
```

Headers 一项设置为：`Content-Type application/json`

Body 一项选 raw 然后

```
{
    "username": "happypeter",
    "password": "111111"
}
```

点发送即可。
