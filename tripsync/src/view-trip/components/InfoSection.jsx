import React, { useEffect, useState } from 'react';
import { Calendar, DollarSign, Users, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { GetPlaceDetails } from '@/service/GlobalApi';


const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY

const InfoSection = ({ trip }) => {
    const { location, noOfDays, budget, traveler, manualLocation } = trip?.userSelection || {};

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async () => {

        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.place[0].photo[3].name)
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.place[0].photo[3].name)
            setPhotoUrl(PhotoUrl);
        })
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl p-6"
        >
            <div className="relative">
                <img
                    src={photoUrl ? "" : "https://picsum.photos/520/330"}
                    alt='Location'
                    className='h-[340px] w-full object-cover rounded-xl transition-transform duration-300 ease-in-out'
                />
                <div className="absolute bottom-4 left-4 bg-purple-900 bg-opacity-70 text-white p-2 rounded-md">
                    <MapPin className="inline-block w-5 h-5 mr-2" />
                    {location?.label || 'Location'}
                </div>
            </div>

            <div className='my-6 flex flex-col gap-3'>
                <h2 className='font-bold text-3xl text-purple-900'>{manualLocation || location?.label || 'Trip Location'}</h2>
                <div className='flex flex-wrap gap-4'>
                    <motion.div
                        className='flex items-center p-2 px-4 bg-gray-200 bg-opacity-20 rounded-full text-gray-900 text-sm'
                        whileHover={{ scale: 1.05 }}
                    >
                        <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                        {noOfDays || 'N/A'} Days
                    </motion.div>
                    <motion.div
                        className='flex items-center p-2 px-4 bg-gray-200 bg-opacity-20 rounded-full text-gray-900 text-sm'
                        whileHover={{ scale: 1.05 }}
                    >
                        <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                        {budget || 'N/A'} Budget
                    </motion.div>
                    <motion.div
                        className='flex items-center p-2 px-4 bg-gray-200 bg-opacity-20 rounded-full text-gray-900 text-sm'
                        whileHover={{ scale: 1.05 }}
                    >
                        <Users className="w-4 h-4 mr-2 text-purple-600" />
                        {traveler || 'N/A'} Traveler{traveler > 1 ? 's' : ''}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default InfoSection;
