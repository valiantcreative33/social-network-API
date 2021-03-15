const { User } = require('../model');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
                })
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with that id was found.' });
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err))
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with that id was found.' });
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with that userId was found.' });
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    addFriend({ params }, res) {
        User.findByIdAndUpdate({ _id: params.userId }, { $push: { friends:params.friendId } }, { new: true } )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user with that id was found.' });
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    deleteFriend({ params }, res) {
        User.findByIdAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true } )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with that id was found.' });
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
}

module.exports = userController;