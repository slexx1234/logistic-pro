module.exports = () => {
    const faker = require('faker');

    faker.locale = 'ru';

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

    const data = {
        login: {
            access_token: 'JWT-Token',
        },
        user: {
            avatar: '/avatar.png',
            email: faker.internet.email(),
            name: faker.name.findName()
        },
        parcels: [],
    };

    for (let i = 0; i < 1000; i++) {
        data.parcels.push({
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

    return data;
};
