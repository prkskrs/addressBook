import express from "express"
const router = express.Router()

// import controllers
import {addBulkContact, addContact, updateContactById,updateAddressByUserId, deleteContactById,fetchContactbyId,fetchPhaseMatching} from "../controllers/userController.js"
import { paginatedResults } from "../middlewares/paginatedResults.js"

router.route("/addContact").post(addContact)
router.route("/addBulkContact").post(addBulkContact)
router.route("/updateContactById/:id").put(updateContactById)
router.route("/updateAddressByUserId/:id").put(updateAddressByUserId)
router.route("/deleteContactById/:id").delete(deleteContactById)
router.route("/fetchContactbyId/:id").get(fetchContactbyId)
router.route("/fetchPhaseMatching").get(fetchPhaseMatching)
router.route("/contacts/paginate").get(paginatedResults,)


export default router;