import React from 'react';
import { motion } from 'framer-motion';
import HotelCardItem from './HotelCardItem';

const Hotels = ({ trip }) => {
    console.log('Hotels component trip data:', trip);

    const hotels = trip?.tripData?.hotels;

    if (!Array.isArray(hotels) || hotels.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-10 text-gray-500"
            >
                No hotel recommendations available.
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl mt-10"
        >
            <h2 className='font-bold text-3xl mb-8 text-purple-900 border-b-2 border-purple-900 pb-4'>Hotel Recommendations</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {hotels.map((hotel, index) => (
                    <HotelCardItem key={index} hotel={hotel} />
                ))}
            </div>
        </motion.div>
    );
};

export default Hotels;
