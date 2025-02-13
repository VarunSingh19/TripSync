import { db } from '../service/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import UserTripCardItem from './components/UserTripCardItem'
import { useUser } from '@clerk/clerk-react'

export default function MyTrips() {
    const navigate = useNavigate();
    const { isLoaded, isSignedIn, user } = useUser();
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Wait until Clerk has loaded the user info
        if (!isLoaded) return;
        // If not signed in, redirect
        if (!isSignedIn) {
            navigate('/');
            return;
        }
        // Fetch trips if the user exists
        if (user) {
            getUserTrips();
        }
    }, [isLoaded, isSignedIn, user, navigate]);

    const getUserTrips = async () => {
        if (!user) return;

        const email =
            user.emailAddresses && user.emailAddresses.length > 0
                ? user.emailAddresses[0].emailAddress
                : null;
        if (!email) {
            console.error('User email not found');
            return;
        }
        try {
            const q = query(collection(db, 'AITrips'), where('userEmail', '==', email));
            const querySnapshot = await getDocs(q);
            const trips = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUserTrips(trips);
        } catch (error) {
            console.error('Error fetching trips:', error);
        } finally {
            setLoading(false);
        }
    };

    // If Clerk hasn't finished loading, show a loader
    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            </div>
        );
    }

    // If user is not signed in (shouldn't happen because of the useEffect redirect), render nothing
    if (!isSignedIn) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10 lg:p-16">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-indigo-800">My Trips</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                </div>
            ) : userTrips.length > 0 ? (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {userTrips.map((trip, index) => (
                        <UserTripCardItem key={trip.id} trip={trip} index={index} />
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    className="text-center text-gray-600 mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-xl mb-4">You haven't planned any trips yet.</p>
                    <Link to="/create-trip">
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors">
                            Plan a Trip
                        </button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
