const express = require('express')
const path = require('path')
const mongoose=require('mongoose')
const exphbs = require('express-handlebars')
const Handlebars=require('handlebars')

const {allowInsecurePrototypeAccess}=require('@handlebars/allow-prototype-access')
const homeRoutes=require('./routes/home')
const favRoutes = require('./routes/fav')
const addRoutes = require('./routes/add')
const autosRoutes=require('./routes/autos')
const app = express()

const hbs = exphbs.create({
    defaultLayout:'main',
    extname:'hbs',
    handlebars:allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs',hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')


app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({
    extended: true
}))

app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/autos',autosRoutes)
app.use('/fav',favRoutes)

const PORT = process.env.PORT || 3000

async function start(){
    try{
        const url = 'mongodb+srv://smeker:smeker@cluster0.9gxy5k3.mongodb.net/autoshop'

        await mongoose.connect(url,{
            useNewUrlParser:true
        })
        app.listen(PORT,()=>{
            console.log(`Server is Running on port ${PORT}`)
        })
    }catch(e){
        console.log(e)
    }
}

start()