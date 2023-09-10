/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jgf5jzyofx4a55h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qe9rc32h",
    "name": "tags",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jgf5jzyofx4a55h")

  // remove
  collection.schema.removeField("qe9rc32h")

  return dao.saveCollection(collection)
})
