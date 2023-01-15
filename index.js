require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('./logger')
const foodsRouter = require('./routes/foods-routes')
const categoryRouter = require('./routes/category-routes')
const userRouter = require('./routes/users-routes')
const profilesRouter = require('./routes/profile-routes')
const auth = require('./middleware/auth')
const port = process.env.PORT || 3001
const cors = require('cors');
const reommendationRouter = require('./routes/recommendation-routes')
const reminderRoutes = require('./routes/reminder-routes');

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => console.log(err)) 

const app = express()




app.use((req, res, next) => {
    logger.log(`${req.method}\t${req.headers.origin}\t${req.path}`)
    console.log(`${req.method} ${req.path}`)
    next()
})
// To accept form data
app.use(express.urlencoded({ extended: false }))
// To accept json data
app.use(express.json())
// To serve static files
app.use(express.static(path.join(__dirname, 'public')))


//Home Page
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})



  
// Router level Middleware
app.use('/users', userRouter)
app.use(auth.verifyUser)
app.use('/profiles',auth.verifyUser, profilesRouter)
app.use('/foods', foodsRouter)
app.use('/categories', categoryRouter)
app.use('/recommendation',reommendationRouter)
app.use('/reminders', reminderRoutes);

app.use(cors())



// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack)
    if (res.statusCode == 200) res.status(500)
    res.json({ msg: err.message })
    next
})

mongoose.connection.once('open', () => {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`)
    })
})
