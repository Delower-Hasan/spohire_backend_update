
const Contact = require('../../modules/contact/contact.model');

exports.createMessage = async (req, res) => {
    try {
        const { fullName, emailAddress, message } = req.body;

        const newMessage = new Contact({
            fullName,
            emailAddress,
            message
        });

        await newMessage.save();

        res.status(201).json({ message: 'Message created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
