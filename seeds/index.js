const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

/*
    IP address updated from localhost to 127.0.0.1 and connect options
    omitted per current mongoose docs
*/
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64970a8baef2781c452e1799',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dpyywr5n0/image/upload/v1687651602/YelpCamp/octcff3ruxpyq1eafdd8.jpg',
                  filename: 'YelpCamp/octcff3ruxpyq1eafdd8'
                },
                {
                  url: 'https://res.cloudinary.com/dpyywr5n0/image/upload/v1687651602/YelpCamp/iksptsqvnw4saao4ensw.jpg',
                  filename: 'YelpCamp/iksptsqvnw4saao4ensw'
                },
                {
                  url: 'https://res.cloudinary.com/dpyywr5n0/image/upload/v1687651602/YelpCamp/sitrulu2hvvrqiyojv8n.jpg',
                  filename: 'YelpCamp/sitrulu2hvvrqiyojv8n'
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos mollitia aliquam reiciendis magni, eos ipsa obcaecati commodi libero id atque saepe, facere suscipit dolor! Unde fugit ea vero. Neque, commodi.',
            price
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})