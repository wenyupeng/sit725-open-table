const express = require("express");
const router = express.Router();
const MenuController = require("../../controllers/MenuController");

/**
 * @swagger
 * /api/menu:
 *   get:
 *     tags:
 *      - Menus
 *     description: Returns all menus
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns all menus
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Menu'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/", MenuController.queryPagenation);

/**
 * @swagger
 * /api/menu/{menuId}:
 *   delete:
 *     tags:
 *      - Menus
 *     description: Deletes a menu by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: menuId
 *         in: path
 *         description: Menu id to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Menu deleted successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:menuId", MenuController.delete);

/**
 * @swagger
 * /api/menu:
 *   post:
 *     tags:
 *      - Menus
 *     description: Creates a new menu
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: menu
 *         in: body
 *         description: Menu object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Menu'
 *     responses:
 *       200:
 *         description: Menu created successfully
 *         schema:
 *           $ref: '#/definitions/Menu'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post("/", MenuController.add);
/**
 * @swagger
 * /api/menu/{menuId}:
 *   put:
 *     tags:
 *      - Menus
 *     description: Updates a menu by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: menuId
 *         in: path
 *         description: Menu id to update
 *         required: true
 *         type: string
 *       - name: menu
 *         in: body
 *         description: Menu object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Menu'
 *     responses:
 *       200:
 *         description: Menu updated successfully
 *         schema:
 *           $ref: '#/definitions/Menu'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:menuId", MenuController.updateById);

module.exports = router;
