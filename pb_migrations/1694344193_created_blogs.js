/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jgf5jzyofx4a55h",
    "created": "2023-09-10 11:09:53.719Z",
    "updated": "2023-09-10 11:09:53.719Z",
    "name": "blogs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ep6nkv3s",
        "name": "content",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
        "system": false,
        "id": "p7ly2hbm",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jgf5jzyofx4a55h");

  return dao.deleteCollection(collection);
})
