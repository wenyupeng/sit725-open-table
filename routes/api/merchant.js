const express = require("express");
const router = express.Router();
const MerchantController = require("../../controllers/MerchantController");

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
router.get("/", MerchantController.queryPagenation);

router.post("/register", MerchantController.register);
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
router.post("/login", MerchantController.login);

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
router.delete("/:merchantId", MerchantController.delete);

module.exports = router;
