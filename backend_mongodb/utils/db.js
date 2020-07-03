const mongoose = require('mongoose');

const dbConnect = mongoose.connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // useCreateIndex: true,

    // useNewUrlParser: true,
	// 	useUnifiedTopology: true,
    //     useFindAndModify: false,
        
        useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
}).then(() => {
    console.log('DB connected successfully');
}).catch((err) => {
    console.log('DB connected fail');
})

module.exports = dbConnect;