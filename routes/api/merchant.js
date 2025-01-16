const express = require('express');
const router = express.Router();
const MerchantController = require('../../controllers/MerchantController');

/**
 * @swagger
 * /api/merchants:
 *   get:
 *     tags:
 *      - Merchants
 *     summary: Returns Merchant list
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: successful operation
 */
router.get('/', MerchantController.queryPagenation);

/**
 * @swagger
 * /api/merchants/:merchantId:
 *   delete:
 *     tags:
 *      - Merchants
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
router.delete('/:merchantId', MerchantController.delete);

/**
 * @swagger
 * /api/merchants:
 *   post:
 *     tags:
 *      - Merchants
 *     summary: Add a Merchant
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
 * 
 */
router.post('/', MerchantController.add);

module.exports = router;