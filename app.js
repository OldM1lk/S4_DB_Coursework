const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Настройка EJS
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Подключение моделей
require('./models/sportsFacilities');
require('./models/athletes');
require('./models/competitions');
require('./models/participations');

function getAllFields(schema, prefix = '') {
    const paths = [];
    schema.eachPath((path, type) => {
        const fullPath = prefix ? `${prefix}.${path}` : path;

        if (type.instance === 'Embedded' && type.schema) {
            // Рекурсивно получить поля вложенной схемы
            paths.push(...getAllFields(type.schema, fullPath));
        } else {
            paths.push(fullPath);
        }
    });
    return paths;
}

async function startServer() {
    try {
        await mongoose.connect('mongodb://localhost:27017/SportsBase');
        console.log('MongoDB connected');

        // Главная страница со списком коллекций
        app.get('/', async (req, res) => {
            try {
                const collections = await mongoose.connection.db.listCollections().toArray();
                res.render('collections', {
                    collections: collections.map(c => c.name)
                });
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        // Просмотр всех документов коллекции
        app.get('/:collection', async (req, res) => {
            try {
                const collection = req.params.collection;
                const Model = mongoose.model(collection);
                const data = await Model.find();
                res.render('documents', {
                    collection,
                    fields: getAllFields(Model.schema).filter(f => f !== '__v'),
                    data
                });
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        // Форма добавления нового документа
        app.get('/:collection/add', async (req, res) => {
            try {
                const collection = req.params.collection;
                const Model = mongoose.model(collection);
                const fields = Object.keys(Model.schema.paths)

                res.render('add', {
                    collection,
                    fields
                });
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        // Обработка добавления нового документа
        app.post('/:collection/add', async (req, res) => {
            try {
                const collection = req.params.collection;
                const Model = mongoose.model(collection);
                await Model.create(req.body);
                res.redirect(`/${collection}`);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        // Форма редактирования документа
        app.get('/:collection/edit/:id', async (req, res) => {
            try {
                const { collection, id } = req.params;
                const Model = mongoose.model(collection);
                const doc = await Model.findById(id);
                res.render('edit', {
                    collection,
                    doc
                });
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        // Сохранение изменений документа
        app.post('/:collection/edit/:id', async (req, res) => {
            try {
                const { collection, id } = req.params;
                const Model = mongoose.model(collection);
                await Model.findByIdAndUpdate(id, req.body);
                res.redirect(`/${collection}`);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        // Удаление документа
        app.post('/:collection/delete/:id', async (req, res) => {
            try {
                const { collection, id } = req.params;
                const Model = mongoose.model(collection);
                await Model.findByIdAndDelete(id);
                res.redirect(`/${collection}`);
            } catch (err) {
                res.status(500).send(err.message);
            }
        });

        const PORT = 3000;
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));

    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

startServer();