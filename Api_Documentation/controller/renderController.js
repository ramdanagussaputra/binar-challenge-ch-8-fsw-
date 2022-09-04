const axios = require('axios');
const catchAsync = require('../utils/catchAsync');

const getData = async (path, req) => {
    const response = await axios.get(`http://localhost:7000/${path}`, {
        headers: {
            Authorization: `Bearer ${req.cookies.jwt}`,
        },
    });

    return response.data.data.data;
};

exports.renderHomepage = async function (req, res) {
    res.render('index');
};

exports.renderRegister = function (req, res) {
    res.render('signup');
};

exports.renderGame = catchAsync(async function (req, res, next) {
    res.render('game', { userId: req.user.id });
});

exports.renderUserDashboard = catchAsync(async function (req, res, next) {
    const data = await getData('api/user-game', req);

    res.render('userDashboard', { users: data });
});

exports.renderBiodataDashboard = catchAsync(async function (req, res, next) {
    const data = await getData(`user-game-biodata/${req.query.id}`, req);

    res.render('biodataDashboard', { biodata: data });
});

exports.renderHistoryDashboard = catchAsync(async function (req, res, next) {
    const data = await getData(`user-game/${req.query.id}/history`, req);

    res.render('historyDashboard', { histories: data });
});
