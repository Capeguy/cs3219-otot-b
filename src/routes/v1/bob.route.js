const express = require('express');
const validate = require('../../middlewares/validate');
const bobValidation = require('../../validations/bob.validation');
const bobController = require('../../controllers/bob.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(bobValidation.createBob), bobController.createBob)
  .get(validate(bobValidation.getBob), bobController.getBobs);

router
  .route('/:id')
  .get(validate(bobValidation.getBob), bobController.getBob)
  .patch(validate(bobValidation.updateBob), bobController.updateBob)
  .delete(validate(bobValidation.deleteBob), bobController.deleteBob);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Bob
 *   description: Bob management and retrieval
 */

/**
 * @swagger
 * /bobs:
 *   post:
 *     summary: Create a Bob
 *     description: Anyone can create Bobs
 *     tags: [Bob]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                  type: string
 *                  enum: [Bob, admin]
 *             example:
 *               name: Name of Bob
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Bob'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *
 *   get:
 *     summary: Get all Bobs
 *     description: Only admins can retrieve all Bobs.
 *     tags: [Bob]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Bob name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of Bobs
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bob'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 */

/**
 * @swagger
 * /bobs/{id}:
 *   get:
 *     summary: Get a Bob
 *     description: Anyone get fetch any Bob
 *     tags: [Bob]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bob id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Bob'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Bob
 *     description: Anyone can update any Bob
 *     tags: [Bob]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bob id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Another Name of Bob
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Bob'
 *       "400":
 *         $ref: '#/components/responses/DuplicateName'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Bob
 *     description: Anyone can delete any Bob
 *     tags: [Bob]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bob id
 *     responses:
 *       "200":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
