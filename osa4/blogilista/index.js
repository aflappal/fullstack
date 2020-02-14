const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

const PORT = config.PORT;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
});
