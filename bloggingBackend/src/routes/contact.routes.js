import express from 'express'
import { userQuery } from '../controllers/contact.controller.js';
const routes = express.Router()

routes.route('/query',).post(userQuery);

export default routes