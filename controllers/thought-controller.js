const { Thought, User } = require('../model');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => {
                console.log(thoughtData)
                res.json(thoughtData)})
            .catch(err => res.status(400).json(err));
    },
    getThoughtById({ params }, res) {
        Thought.findById({ _id: params.thoughtId })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with this id was found!' })
                }
                res.json(thoughtData)
            })
            .catch(err => res.status(400).json(err));
    },
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with that id exists!' });
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body)
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought with this id was found!' })
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought with this id was found!' })
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with this id was found!' })
                }
                res.json(thoughtData)
            })
            .catch(err => res.status(400).json(err));
    },
    deleteReaction({ params }, res) {
        Thought.findByIdAndUpdate( params.thoughtId, {$pull: { reactions: params.reactionsId } }, { new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with this id was found!' })
                }
                res.json(thoughtData)
            })
            .catch(err => res.status(400).json(err));
    }

}

module.exports = thoughtController;