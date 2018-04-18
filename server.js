const express = require('express');
const faker = require('faker');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

faker.locale = 'ru';

app.post('/login', (req, res) => res.send(JSON.stringify({
    data: {
        access_token: 'JWT-Token',
    }
})));

app.get('/user', (req, res) => res.send({
    data: {
        avatar: '/avatar.png',
        email: faker.internet.email(),
        name: faker.name.findName()
    }
}));

function chars() {
    let result = String.fromCharCode(faker.random.number({
        min: 65,
        max: 90,
    }));

    if (faker.random.boolean()) {
        result += String.fromCharCode(faker.random.number({
            min: 65,
            max: 90,
        }));
    }

    return result;
}

function city() {
    return faker.address.city() + ' ' + chars() + faker.random.number({
        min: 1,
        max: 300,
    });
}

let parcels = [];

for (let i = 0; i < 1000; i++) {
    parcels.push({
        key: i,
        code: chars() + faker.random.number({
            min: 10000,
            max: 99999,
        }) + '-' + chars(),
        from: city(),
        to: city(),
        location: city(),
        status: faker.random.arrayElement(['handed', 'send']),
        important: faker.random.arrayElement(['low', 'high']),
        sender: faker.name.findName()
    });
}

app.get('/parcels', (req, res) => {
    const page = Number(req.query.page);
    let result = {
        data: parcels.slice(page * 10 - 10, page * 10),
        meta: {
            pagination: {
                total: parcels.length,
                total_pages: Math.ceil(parcels.length / 10),
                current_page: page, // Не понятно нафик это надо, в url же передаётся
            }
        },
    };

    res.send(result);
});

app.get('/parcels/:parcel', (req, res) => {
    for(let parcel of parcels) {
        if (parcel.key == req.params.parcel) {
            res.send({
                data: parcel
            });
            break;
        }
    }
});

app.delete('/parcels/:parcel', (req, res) => {
    let i = 0;
    for(let parcel of parcels) {
        if (parcel.key == req.params.parcel) {
            parcels.splice(i, 1);
            break;
        }
        i++;
    }

    res.send({
        result: true,
    });
});

app.post('/parcels/:parcel', (req, res) => {
    let i = 0;
    for(let parcel of parcels) {
        if (parcel.key == req.params.parcel) {
            parcels[i].status = req.body.status;
            parcels[i].location = req.body.location;
            break;
        }
        i++;
    }

    res.send({
        result: true,
    });
});

app.listen(3333, () => console.log('Example app listening on port 3333!'));

