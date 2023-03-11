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
app.get('/todos/:todoid', async (req, res) => {
    let todos = await db.queryById(req.params.todoid);
    console.log(todos)
    res.send(todos);
});
app.delete('/todos/:todoid', async (req, res) => {
    let todos = await db.delete(req.params.todoid);
    console.log(todos)
    res.send(todos);
});
app.post('/todos', async (req,res) => {
    console.log(req.body);
    let todos = await db.insert(req.body);
    res.send(todos)    
});
app.put('/todos/:todoid', async (req, res) =>{
    console.log(req.body);
    const id = req.params.todoid;
    let todos = await db.update(id, req.body);
    res.send(todos)
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

