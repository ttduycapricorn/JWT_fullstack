import userService from '../service/userService';

const handleHelloWorld = (req, res) => {
    return res.render('home.ejs');
};

const handleUserPage = (req, res) => {
    return res.render('user.ejs');
};

const handleCreatedUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.CreateNewUser(email, password, username);
    userService.getListUser();

    return res.send('created User!');
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
    handleUserPage: handleUserPage,
    handleCreatedUser: handleCreatedUser,
};
