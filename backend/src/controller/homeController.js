import userService from '../service/userService';

const handleHelloWorld = (req, res) => {
    return res.render('home.ejs');
};

const handleUserPage = async (req, res) => {
    let userList = await userService.getListUser();
    return res.render('user.ejs', { userList });
};

const handleCreatedUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.CreateNewUser(email, password, username);
    userService.getListUser();

    return res.redirect('/user');
};

const handleUserList = async () => {
    let userList = await userService.getListUser();
    console.log('Check User List: ', userList);
};

const handleDeleteUser = async (req, res) => {
    const idUser = req.params.id;
    await userService.DeleteUser(idUser);
    return res.redirect('/user');
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
    handleUserPage: handleUserPage,
    handleCreatedUser: handleCreatedUser,
    handleDeleteUser: handleDeleteUser,
};
