module.exports = () => ({
  jwtFromRequest(req) {
    let token = null;
    if (req && req.cookies) token = req.cookies.accessToken;

    return token;
  },
});
