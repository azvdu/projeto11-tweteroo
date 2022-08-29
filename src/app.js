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
    for(let i = 0; i < users.length; i++){
        if(user.username === users[i].username){
            return res.sendStatus(409)
        }
    }
    users.push(user)
    return res.sendStatus(200)
})

app.post('/tweets', (req, res) => {
    const tweet = req.body
    for(let i = 0; i < users.length; i++){
        if(tweet.username === users[i].username){
            tweets.push({...tweet, avatar: users[i].avatar})
            console.log(tweets)
            return res.sendStatus(200)

        }
    }
    if(!tweet.username || !tweet.tweet){
        return res.sendStatus(400)
    }
    return res.sendStatus(400)
})

app.get('/tweets', (req, res) => {
    const lastTweets = []
    if(tweets.length < 10){
        return res.send(tweets)
    }
    for(let i = tweets.length -1 ; i > tweets.length - 11; i --){
        lastTweets.push(tweets[i])
    }
    const result = lastTweets.reverse()
    return res.send(result)
})


const PORT = 5000
app.listen(PORT, () => {
    console.log(`server open in:(http://localhost:${PORT})`)
})