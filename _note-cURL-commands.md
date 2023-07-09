### Check if the server is running:

```bash
curl http://localhost:8001
```

### Return all items:

```bash
curl http://localhost:8001/items

curl http://localhost:8001/item
```

API interactions with a single item can use the ":id" parameter from the API path, or an "id" query string parameter.

### Return a single item by "id":

```bash
curl localhost:8001/item/9c18e314-d5d0-4484-bd76-74d4c020ed8e

curl localhost:8001/item?id="9c18e314-d5d0-4484-bd76-74d4c020ed8e"
```

### Create a new item:

```bash
curl --header "Content-Type: application/json"\
--request POST\
--data '{"name":"foo","username":"abc","password":"xyz"}'\
http://localhost:8001/item
```

### Update an item (previously set properties are not removed, can only update existing properties, if you need to remove properties, directly update the `DATA.json` file):

```bash
curl -X PUT http://localhost:8001/item/9c18e314-d5d0-4484-bd76-74d4c020ed8e \
-H "Content-Type: application/json" \
-d '{"name": "Item 1", "price": 100}'
```

### Delete an item:

```bash
curl --X DELETE http://localhost:8001/item/90e1b628-3060-4077-adce-2b492b96f3f5
```
