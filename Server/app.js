const express = require('express');
const cors = require('cors');
 require("dotenv").config();
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const profileRoutes = require('./routes/profileRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const mapRoutes = require('./routes/mapRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const dealRoutes = require('./routes/dealRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const conectTodb = require('./config/mongo');

const app = express();



app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    try {
        res.status(200).json({message:"this is a home route"})
    } catch (error) {
        console.log(err);
    }
})
app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);
app.use('/profile', profileRoutes);
app.use('/reviews', reviewRoutes);
app.use('/payments', paymentRoutes);
app.use('/maps', mapRoutes);
app.use('/notifications', notificationRoutes);
app.use('/deals', dealRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
const db_url = process.env.MONGO_URL;
app.listen(PORT, () => {
 try{
       conectTodb(db_url);
     console.log(`server is running at port ${PORT}`)
 }catch(err){
  console.log(err);
 }
  
});
