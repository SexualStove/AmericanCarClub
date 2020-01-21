const Joi = require('joi');

module.exports = {
    createGallery (req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        };
        const {error, value} = Joi.validate(req.body, schema);
        if (error) {
            switch (error.details[0].context.key) {
                case 'email' :
                    res.status(400).send({
                        error: "invalid email"
                    });
                    break;
                case 'password':
                    res.status(400).send({
                        error: "invalid email"
                    });
                    break;
                default:
                    res.status(400).send({
                        email: "pog"
                    })

            }
        } else {
            next()
        }
    }
};