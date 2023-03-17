import express from 'express';
import bodyParser from 'body-parser'
import DB from './db.js'


const PORT = process.env.PORT || 3000;

/** Zentrales Objekt für unsere Express-Applikation */
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/** global instance of our database */
let db = new DB();

/** Initialize database connection */
async function initDB() {
    await db.connect();
    console.log("Connected to database");
}

// implement API routes

/** Return all todos. 
 *  Be aware that the db methods return promises, so we need to use either `await` or `then` here! 
 */
app.get('/todos', async (req, res) => {
    let todos = await db.queryAll();
    res.send(todos);
});


app.get('/todos/:id', async(req,res)=>{
    let todo=await db.queryById(req.params.id)
    console.log(todo)
    res.send(todo)
})

app.put('/todos/:id', async(req,res)=>{
    console.log(req.body)
    let result=await db.update(req.params.id,req.body)
    res.send(result)
});

app.delete('/todos/:id', async(req,res)=>{
    let result=await db.delete(req.params.id)
    res.send(result)

});

app.post('/todos', async(req,res)=>{
    let result=await db.insert(req.body)
    res.send(result)

});
//
// YOUR CODE HERE
//
// Implement the following routes:
// GET /todos/:id
// POST /todos
// PUT /todos/:id
// DELETE /todos/:id


initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    })

