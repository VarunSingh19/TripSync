import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const PlaceCardItem = ({ place }) => {

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])

    const GetPlacePhoto = async () => {

        const data = {
            textQuery: place?.placeName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.place[0].photo[3].name)
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.place[0].photo[3].name)
            setPhotoUrl(PhotoUrl);
        })
    }
    return (

        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName}>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img src={photoUrl ? "" : 'https://picsum.photos/538/350'}
                    className='w-[130px] h-[130px] rounded-xl'
                />
                <div>
                    <h2 className='font-bold text-lg'>{place.placeName}</h2>
                    <h2 className='text-sm text-gray-500'>{place.placeDetails}</h2>
                    <h2 className='mt-2'>{place.timeToTravel}</h2>
                    <Button size='sm'><FaMapLocationDot /></Button>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem
