import {Router} from 'express'
const router = Router();

import {sigIp, sigUp} from '../controllers/user.controller'

router.post('/sigUp', sigUp)
router.post('/sigIn', sigIp)

export default router;
