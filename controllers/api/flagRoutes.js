const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:id', withAuth, async (req,res) => {
        try {
            const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id, 
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ]
         });
        res.status(200).json({message: "comment successfully created"});
    } catch (err) {
        res.status(400).json({ message: "error posting comment"})
    }
})

module.exports = router;