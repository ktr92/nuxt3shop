import { createMenu } from "~~/server/data/menu/megamenu"


/* {
  "id": 99,
  "module_id": 1,
  "parent_id": 1,
  "rang": 1,
  "icon": "",
  "name": "Травы и ягоды",
  "link": null,
  "description": null,
  "new_window": 0,
  "status": 1,
  "display_on_mobile": 1,
  "position": 0,
  "submenu_width": null,
  "submenu_type": 0,
  "submenu_background": null,
  "submenu_background_position": null,
  "submenu_background_repeat": null,
  "content_width": 4,
  "content_type": 0,
  "content": null
} */

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const newmenu = await createMenu(body)

  return {
    newmenu
  }
})

