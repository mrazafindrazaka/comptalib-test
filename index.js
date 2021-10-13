const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const {Sequelize, DataTypes} = require('sequelize')

// Config server
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Config sequelize
const sequelize = new Sequelize('comptalib', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
}).catch((error) => {
    console.error('Unable to connect to the database:', error)
})

// Config models
const Society = sequelize.define('Society', {
    name: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false
})

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false
})

const UserSociety = sequelize.define('UserSociety')

User.belongsToMany(Society, {through: 'UserSociety'})
Society.belongsToMany(User, {through: 'UserSociety'})

sequelize.sync({alter: true}).then(() => {
    console.log('All models were synchronized successfully.')
}).catch((error) => {
    console.log(error)
})

// CRUD society
app.get('/society', async (req, res) => {
    const societies = await Society.findAll({include: User})
    res.status(200).send(societies)
});

app.post('/society', async (req, res) => {
    await Society.create(req.body)
    res.status(200).send("Society created")
});

app.put('/society/:id', async (req, res) => {
    await Society.update(req.body, {where: {id: req.params.id}})
    res.status(200).send("Society updated")
});

app.delete('/society/:id', async (req, res) => {
    await Society.destroy({
        where: {id: req.params.id}
    })
    res.status(200).send("Society deleted")
});

// CRUD user
app.get('/user', async (req, res) => {
    const societies = await User.findAll({include: Society})
    res.status(200).send(societies)
});

app.post('/user', async (req, res) => {
    await User.create(req.body)
    res.status(200).send("User created")
});

app.put('/user/:id', async (req, res) => {
    await User.update(req.body, {where: {id: req.params.id}})
    res.status(200).send("User updated")
});

app.delete('/user/:id', async (req, res) => {
    await User.destroy({
        where: {id: req.params.id}
    })
    res.status(200).send("User deleted")
});

// Association User and society
app.post('/usersociety', async (req, res) => {
    await UserSociety.create(req.body)
    res.status(200).send("UserSociety created")
});

// First endpoint
app.get('/', (req, res) => {
    res.status(200).send('')
})

// Server begin
app.listen(port, () => {
    console.log('app listening in port ' + port)
})
