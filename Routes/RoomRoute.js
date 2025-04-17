const express = require('express');
const router = express.Router();

const {
    createRoom,
    getAllRooms,
    getARoom,
    updateRoom,
    deleteRoom
} = require('../controllers/RoomController');

const  protect  = require('../Middleware/authMiddleware');

console.log(typeof protect);

router.post('/create', protect, createRoom);
router.get('/', protect, getAllRooms);
router.route('/:id')
    .get(protect, getARoom)
    .put(protect, updateRoom)
    .delete(protect, deleteRoom);

module.exports = router;
