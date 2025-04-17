const Room = require('../models/RoomModel');

const createRoom = async (req, res) => {
    try {
        const { name, width, height, depth, description } = req.body;

        if (!name || !width || !height || !depth) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (width <= 0 || height <= 0 || depth <= 0) {
            return res.status(400).json({ message: 'Dimensions must be positive numbers' });
        }

        const newRoom = new Room({
            name,
            width,
            height,
            depth,
            description: description || '',
            owner: req.user._id,
        });

        await newRoom.save();

        return res.status(201).json(newRoom);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while creating the room' });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ owner: req.user._id });
        return res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching rooms' });
    }
};

const getARoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        return res.status(200).json(room);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching the room' });
    }
};

const updateRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        room.name = req.body.name || room.name;
        room.width = req.body.width || room.width;
        room.height = req.body.height || room.height;
        room.depth = req.body.depth || room.depth;
        room.description = req.body.description || room.description;
        await room.save();
        return res.status(200).json(room);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating the room' });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        await room.remove();
        return res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while deleting the room' });
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    getARoom,
    updateRoom,
    deleteRoom
};
