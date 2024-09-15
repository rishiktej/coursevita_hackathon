const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const adminactivity = require('./routes/activity_log');
const connectToMongo = require('./db');
const bodyParser = require('body-parser');
// const scholarshipRequestRoutes = require('./routes/scholarshipRequests');
// const renewalRequestRoutes = require('./routes/renewalRequest');
const express = require('express')
const dotenv = require('dotenv');
// const notifications = require('./routes/notifications');
const path = require('path');
// const auth = require('./routes/auth')
// const notes = require('./routes/notes')
var cors = require('cors')
connectToMongo();
dotenv.config();


const app = express()
app.use(cors())
app.use(bodyParser.json());
const port = 8000

app.use(express.json())
app.use('/user', userRoutes);
app.use('/admin', taskRoutes);
app.use('/admins/', adminactivity);
// app.use('/api/scholarshipRequests', scholarshipRequestRoutes);
// app.use('/api/renewal', renewalRequestRoutes);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/notifications', notifications);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})