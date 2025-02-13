import { db } from '../service/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import UserTripCardItem from './components/UserTripCardItem'

export default function MyTrips() {
    const navigate = useNavigate()
    const [userTrips, setUserTrips] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUserTrips()
    }, [])

    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) {
            navigate('/')
            return
        }

        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email))
        const querySnapshot = await getDocs(q)

        const trips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setUserTrips(trips)
        setLoading(false)
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
                    <p className="text-xl mb-4">You haven&apos;t planned any trips yet.</p>

                    <Link to={'/create-trip'}>
                        <button
                            onClick={() => navigate('/plan-trip')}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
                        >
                            Plan a Trip
                        </button>
                    </Link>
                </motion.div>
            )}
        </div>
    )
}