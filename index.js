const express = require("express");
const path = require('path');
const urlRoute = require('./routes/url.js');
const staticRoute = require('./routes/staticRouter.js');
const userRoute = require('./routes/user.js');
const connectToMongoDB = require('./connection.js');
const URL = require('./models/url.js');

const app = express();
const PORT = 6700;

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));



app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=> console.log('mongodb connect'))

app.get('/test', async(req, res) =>{
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
      });
});

// app.get('/test', async(req, res) =>{
//     const allUrls = await URL.find({});
//     return res.end(`
//     <html>
//     <head></head>
//     <body>
//     <ol>
//     ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join('')}`)
// })

app.use("/url", urlRoute);
app.use("/", staticRoute);
app.use('/Signup', userRoute)

app.get('/:shortId',async  (req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    if (entry) {
        res.redirect(entry.redirectURL);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`);
})
