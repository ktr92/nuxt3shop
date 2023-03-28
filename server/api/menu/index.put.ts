import { updateMenu } from "~~/server/data/menu/megamenu"


/* 
  {
    "id": 43,
    "content": {
      "parent_id": 1
    }

  }
*/

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const newmenu = await updateMenu(body.id, body.content)

  return {
    newmenu
  }
})

