const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  const token = authHeader.split(' ')[1] // remove the "Bearer" part

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Token is not valid' })
  }
}

module.exports = auth
