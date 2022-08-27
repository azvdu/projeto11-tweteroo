import express from "express";
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

let users = []
let tweets = []

app.post('/sign-up', (req, res) => {
    const user = req.body
    if(!user.avatar || !user.username){
        return res.sendStatus(400)
    }
    users.push(user)
    return res.sendStatus(200)
})

app.post('/tweets', (req, res) => {
    const tweet = req.body
    if(!tweet.username || !tweet.tweet){
        return res.sendStatus(400)
    }

    tweets.push(tweet)
    return res.sendStatus(200)
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`server open in:(http://localhost:${PORT})`)
})