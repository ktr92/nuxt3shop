import { deleteMenu } from "~~/server/data/menu/megamenu"


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

  const removedmenu = await deleteMenu(body.id)

  return {
    removedmenu
  }
})

