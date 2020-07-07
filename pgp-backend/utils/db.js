// const mongoose = require('mongoose');

// var url = "mongodb+srv://infymt:infymt@cluster0.yye39.azure.mongodb.net/internet_banking?retryWrites=true&w=majority";
// var url1 = "";
// if(!process.env.MONGODB_URI){
//     url1 = url;
// }else{
//     url1 = process.env.MONGODB_URI;
// }

// const dbConnect = mongoose.connect(url1, {
//     // useNewUrlParser: true,
//     // useCreateIndex: true,

//     // useNewUrlParser: true,
// 	// 	useUnifiedTopology: true,
//     //     useFindAndModify: false,
        
//         useCreateIndex: true,
//             useFindAndModify: false,
//             useNewUrlParser: true,
//             useUnifiedTopology: true
// }).then(() => {
//     console.log('DB connected successfully');
// }).catch((err) => {
//     console.log('DB connected fail');
// })

// module.exports = dbConnect;

const mongoose = require('mongoose');

const connectDB = async (connectStr) => {
    try {
        const db = await mongoose.connect(connectStr, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return db;
    } catch (error) {
        // logger.info(error);
        console.log(`failed: ${error}`)
        return null;
    }

};

module.exports = {
    connectDB
};