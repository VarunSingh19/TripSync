import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

const HotelCardItem = ({ hotel }) => {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {

        const data = {
            textQuery: hotel?.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.place[0].photo[3].name)
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.place[0].photo[3].name)
            setPhotoUrl(PhotoUrl);
        })
    }
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.hotelAddress} target='_blank'>
            <motion.div
                className='hotel-item bg-white bg-opacity-20 border border-purple-300 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform-gpu hover:scale-[1.05]'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="relative">
                    <img
                        src={photoUrl ? '' : 'https://picsum.photos/536/354'}
                        alt={hotel.hotelName || 'Hotel Image'}
                        className='w-full h-48 object-cover transition-all duration-300 ease-in-out'
                    />
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        {hotel.rating || '4.5'}
                    </div>
                </div>
                <div className='p-6 flex flex-col gap-3'>
                    <h2 className='font-bold text-xl text-purple-900 line-clamp-1 hover:text-purple-300 transition-colors duration-300'>{hotel.hotelName}</h2>
                    <p className='text-sm text-purple-900 flex items-center'>
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="line-clamp-1">{hotel.hotelAddress}</span>
                    </p>
                    <p className='text-lg font-bold text-green-400 flex items-center'>
                        <DollarSign className="w-5 h-5 mr-2" />
                        {hotel.price}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};

export default HotelCardItem;
