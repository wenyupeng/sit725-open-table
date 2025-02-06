const express = require("express");
const router = express.Router();
const merchantService = require("../../services/merchant.service");

/**
 * @swagger
 * /api/merchant:
 *   get:
 *     tags:
 *      - Merchant
 *     summary: Returns Merchant list
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: successful operation
 */
router.get("/", merchantService.queryPagenation);

router.post("/register", merchantService.register);
/**
 * @swagger
 * /api/merchant/login:
 *   post:
 *     tags:
 *      - Merchant
 *     summary: Login a Merchant
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: body
 *        in: body
 *        description: Merchant object that needs to be added
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Merchant'
 *     responses:
 *       200:
 *         description: successful operation
*/
router.post("/login", merchantService.login);

router.delete("/test", merchantService.deleteByName);
/**
 * @swagger
 * /api/merchant/:merchantId:
 *   delete:
 *     tags:
 *      - Merchant
 *     summary: Deletes a Merchant
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: merchantId
 *        in: path
 *        description: ID of the Merchant to delete
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: successful operation
 */
router.delete("/:merchantId", merchantService.delete);


router.post("/update-open-hours", merchantService.updateOpenHours);

module.exports = router;
