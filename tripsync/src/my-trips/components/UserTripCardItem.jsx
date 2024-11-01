import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, DollarSign, MapPin } from 'lucide-react'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'

export default function UserTripCardItem({ trip, index }) {
    const [photoUrl, setPhotoUrl] = useState('')

    useEffect(() => {
        if (trip) getPlacePhoto()
    }, [trip])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        try {
            const resp = await GetPlaceDetails(data)
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.place[0].photo[3].name)
            setPhotoUrl(photoUrl)
        } catch (error) {
            console.error('Error fetching place photo:', error)
            setPhotoUrl('https://picsum.photos/536/354') // Fallback image
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link to={`/view-trip/${trip?.id}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative h-48 w-full">
                        <img
                            src={photoUrl || 'https://picsum.photos/536/354'}
                            alt={trip?.userSelection?.location?.label}
                            className="w-full h-full object-cover rounded-t-xl"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                            <h2 className="text-white text-xl font-bold p-4">
                                {trip?.userSelection?.location?.label}
                            </h2>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center text-gray-600 mb-2">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{trip?.userSelection.noOfDays} Days</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                            <DollarSign className="w-4 h-4 mr-2" />
                            <span>{trip?.userSelection?.budget} Budget</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="truncate">{trip?.userSelection?.location?.label ? '' : trip?.userSelection?.manualLocation}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}