const { User } = require('../models');

const userController = {
    //GET ALL USERS
    getAllUsers(req, res) {
        User.find({})
        //populate user thoughts
        .populate({ path: 'thoughts', select: '-__v'})
        //populate user friends
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    //GET USER BY ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .then(dbUserData => {
            //if no user with id found
            if (!dbUserData) {
                res.status(404).json({ message: 'No Pizza found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //CREATE USER
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //UPDATE USER BY ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runvalidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User Found!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err))
    },

    //DELETE USER
    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User Found!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = userController;