import { db } from '@/service/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import InfoSection from '../components/InfoSection'
import Hotels from '../components/Hotels'
import PlacesToVisit from '../components/PlacesToVisit'

const ViewTrip = () => {
    const { tripId } = useParams(); // Get tripId from URL parameters
    const [trip, setTrip] = useState(null); // Initialize trip state correctly

    // Fetch trip data when tripId changes
    useEffect(() => {
        console.log('Trip ID:', tripId); // Ensure tripId is correct
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    useEffect(() => {
        console.log('Trip ID:', tripId); // Ensure tripId is correct
        if (trip) {
            console.log('Trip data structure:', trip); // Inspect the entire trip object
        }
    }, [trip]);


    // Fetch the trip data from Firestore
    // Fetch the trip data from Firestore
    const GetTripData = async () => {
        try {
            const docRef = doc(db, 'AITrips', tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());

                // Parse tripData from string to object
                const data = docSnap.data();
                if (data.tripData) {
                    data.tripData = JSON.parse(data.tripData); // Parse the tripData JSON string
                }

                setTrip(data); // Set trip data in state
            } else {
                console.log("No such document!");
                toast.error("No Trip Found..."); // Display error toast
            }
        } catch (error) {
            console.error("Error fetching trip data:", error);
            toast.error("Error fetching trip data.");
        }
    };


    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Only render InfoSection and Hotels if trip data exists */}
            {trip ? (
                <>
                    {/* Information Section */}
                    <InfoSection trip={trip} />
                    {/* Recommended Hotels */}
                    <Hotels trip={trip} />
                    {/* Daily Plan */}
                    <PlacesToVisit trip={trip} />
                </>
            ) : (
                <p>Loading trip data...</p>
            )}
        </div>
    );
}

export default ViewTrip;
