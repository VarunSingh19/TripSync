/* eslint-disable no-unused-vars */
// 'use client'

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "@/constants/options"
// import { chatSession } from "@/service/AIModal"
// import GooglePlacesAutocomplete from "react-google-places-autocomplete"
// import { toast } from "sonner"
// import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
// import { FcGoogle } from "react-icons/fc"
// import { doc, setDoc } from "firebase/firestore"
// import { db } from "@/service/firebaseConfig"
// import { DollarSign, Users, MapPin, Calendar, Loader2, Sparkles, Brain } from 'lucide-react'
// import Confetti from 'react-confetti'
// import { useNavigate } from "react-router-dom"
// import { useUser } from "@clerk/nextjs"

// // Improved FloatingBalloon component
// const FloatingBalloon = ({ color }) => (
//   <motion.div
//     className={`absolute w-12 h-16 rounded-full bg-${color}-500 opacity-70`}
//     initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
//     animate={{
//       y: [null, -100],
//       x: [null, Math.random() * window.innerWidth],
//     }}
//     transition={{
//       duration: 15,
//       repeat: Infinity,
//       repeatType: "loop",
//     }}
//   />
// )

// // Enhanced CelebrationMessage component
// const CelebrationMessage = ({ onClose, tripId }) => {
//   const navigate = useNavigate()

//   const handleViewTrip = () => {
//     navigate(`/view-trip/${tripId}`)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -50 }}
//       className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 shadow-lg"
//     >
//       <div className="container mx-auto flex flex-col items-center justify-between">
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
//           className="text-center mb-6"
//         >
//           <h3 className="text-4xl font-bold mb-4">🎉 Your AI-Crafted Trip is Ready!</h3>
//           <p className="text-xl">Embark on your personalized adventure!</p>
//         </motion.div>
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <Button
//             onClick={handleViewTrip}
//             variant="outline"
//             className="text-slate-950 border-white hover:bg-white hover:text-purple-600 text-lg px-8 py-3"
//           >
//             View Your AI Trip
//           </Button>
//         </motion.div>
//       </div>
//     </motion.div>
//   )
// }

// function CreateTrip() {
//   const [place, selectPlace] = useState(null)
//   const [formData, setFormData] = useState({})
//   const [useManualLocation, setUseManualLocation] = useState(false)
//   const [openDialog, setOpenDialog] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [showCelebration, setShowCelebration] = useState(false)
//   const [generatedTripId, setGeneratedTripId] = useState(null)
//   const [showBalloons, setShowBalloons] = useState(false)
//   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
//   const { isSignedIn, user } = useUser()
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight })
//     }
//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   const handleInputChange = (name, value) => {
//     if (name === "noOfDays" && value > 5) {
//       toast.warning("Please enter Trip Days less than 5")
//     }
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   // const login = useGoogleLogin({
//   //   onSuccess: (codeResp) => getUserProfile(codeResp),
//   //   onError: (error) => console.log(error),
//   // })

//   // Function to trigger balloon and confetti animations
//   const triggerCelebration = () => {
//     setShowBalloons(true)
//     setShowCelebration(true)
//     setTimeout(() => {
//       setShowBalloons(false)
//       setShowCelebration(false)
//     }, 10000) // Remove celebrations after 10 seconds
//   }

//   // Enhanced OnGenerateTrip function
//   const OnGenerateTrip = async () => {
//     if (!isSignedIn) {
//       setOpenDialog(true)
//       return
//     }
//     if (
//       !formData?.noOfDays ||
//       formData?.noOfDays > 5 ||
//       (!formData?.location && !useManualLocation) ||
//       !formData?.budget ||
//       !formData?.traveler
//     ) {
//       toast.error("Please fill all the details")
//       return
//     }

//     const location = useManualLocation
//       ? formData?.manualLocation
//       : formData?.location?.label || "Unknown Location"

//     setLoading(true)

//     const FINAL_PROMPT = AI_PROMPT.replace("{location}", location)
//       .replaceAll("{totalDays}", formData?.noOfDays)
//       .replace("{traveler}", formData?.traveler)
//       .replace("{budget}", formData?.budget)

//     // Simulating AI processing with a delay
//     await new Promise(resolve => setTimeout(resolve, 3000))

//     try {
//       const result = await chatSession.sendMessage(FINAL_PROMPT)
//       await SaveAiTrip(result?.response?.text())
//       setLoading(false)
//       triggerCelebration() // Trigger celebration animations
//     } catch (error) {
//       console.error("Error generating trip:", error)
//       setLoading(false)
//       toast.error("Failed to generate the trip")
//     }
//   }

//   const SaveAiTrip = async (TripData) => {
//     setLoading(true)
//     const user = JSON.parse(localStorage.getItem('user'))
//     const docId = Date.now().toString()

//     await setDoc(doc(db, "AITrips", docId), {
//       userSelection: formData,
//       tripData: TripData,
//       userEmail: user?.email,
//       id: docId
//     })

//     setGeneratedTripId(docId)
//     setLoading(false)
//   }



//   return (
//     <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
//       {/* AI-themed background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute left-0 top-0 w-full h-full">
//           {[...Array(50)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute bg-white rounded-full opacity-10"
//               initial={{
//                 x: Math.random() * window.innerWidth,
//                 y: Math.random() * window.innerHeight,
//                 scale: Math.random() * 0.5 + 0.5,
//               }}
//               animate={{
//                 y: [null, Math.random() * window.innerHeight],
//               }}
//               transition={{
//                 duration: Math.random() * 10 + 10,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }}
//               style={{
//                 width: `${Math.random() * 4 + 1}px`,
//                 height: `${Math.random() * 4 + 1}px`,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {showCelebration && (
//         <Confetti
//           width={windowSize.width}
//           height={windowSize.height}
//           recycle={false}
//           numberOfPieces={5000}
//         />
//       )}

//       {showBalloons && (
//         <>
//           <FloatingBalloon color="red" />
//           <FloatingBalloon color="blue" />
//           <FloatingBalloon color="green" />
//           <FloatingBalloon color="yellow" />
//           <FloatingBalloon color="purple" />
//         </>
//       )}

//       {showCelebration && <CelebrationMessage onClose={() => setShowCelebration(false)} tripId={generatedTripId} />}

// <motion.div
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.8 }}
//   className="max-w-5xl mx-auto relative z-10"
// >
//   <motion.h2
//     className="font-bold text-5xl mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
//     initial={{ y: -20, opacity: 0 }}
//     animate={{ y: 0, opacity: 1 }}
//     transition={{ delay: 0.2, duration: 0.8 }}
//   >
//     AI-Powered Dream Journey Crafter ✨
//   </motion.h2>
//   <motion.p
//     className="text-2xl text-center text-purple-200 mb-16"
//     initial={{ y: -20, opacity: 0 }}
//     animate={{ y: 0, opacity: 1 }}
//     transition={{ delay: 0.4, duration: 0.8 }}
//   >
//     Let our advanced AI weave the perfect itinerary tailored just for you.
//   </motion.p>

//   <div className="space-y-12">
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-purple-500/30"
//     >
//       <h2 className="text-3xl font-semibold text-purple-300 mb-6 flex items-center">
//         <MapPin className="mr-3" /> AI Destination Analyzer
//       </h2>
//       {!useManualLocation ? (
//         <>
//           <GooglePlacesAutocomplete
//             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//             selectProps={{
//               place,
//               onChange: (v) => {
//                 selectPlace(v)
//                 handleInputChange("location", v)
//               },
//               placeholder: "Where shall our AI guide you?",
//               styles: {
//                 control: (provided) => ({
//                   ...provided,
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                   border: '2px solid rgba(255, 255, 255, 0.2)',
//                   borderRadius: '0.5rem',
//                   color: 'white',
//                   '&:hover': { borderColor: 'rgba(255, 255, 255, 0.4)' },
//                 }),
//                 input: (provided) => ({
//                   ...provided,
//                   color: 'white',
//                 }),
//                 option: (provided, state) => ({
//                   ...provided,
//                   backgroundColor: state.isFocused ? 'rgba(129, 140, 248, 0.2)' : 'transparent',
//                   color: 'black',
//                 }),
//               },
//             }}
//           />
//           <p className="mt-3 text-sm text-purple-300 cursor-pointer hover:text-purple-100 transition-colors" onClick={() => setUseManualLocation(true)}>
//             Destination not listed? Let our AI process your custom input
//           </p>
//         </>
//       ) : (
//         <>
//           <Input
//             placeholder="Describe your dream destination for AI analysis"
//             onChange={(e) => handleInputChange("manualLocation", e.target.value)}
//             className="bg-white bg-opacity-10 border-2 border-purple-300 focus:border-purple-400 text-white placeholder-purple-200"
//           />
//           <p className="mt-3 text-sm text-purple-300 cursor-pointer hover:text-purple-100 transition-colors" onClick={() => setUseManualLocation(false)}>
//             Switch to AI-powered location suggestions
//           </p>
//         </>
//       )}
//     </motion.div>

//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-purple-500/30"
//     >
//       <h2 className="text-3xl font-semibold text-purple-300 mb-6 flex items-center">
//         <Calendar className="mr-3" /> AI Time Optimizer
//       </h2>
//       <Input
//         placeholder="How many days for AI to optimize? (max 5)"
//         type="number"
//         onChange={(e) => handleInputChange("noOfDays", e.target.value)}
//         className="bg-white bg-opacity-10 border-2 border-purple-300 focus:border-purple-400 text-white placeholder-purple-200"
//         max="5"
//       />
//     </motion.div>

//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-purple-500/30"
//     >
//       <h2 className="text-3xl font-semibold text-purple-300 mb-6 flex items-center">
//         <DollarSign className="mr-3" /> AI Budget Allocator
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//         {SelectBudgetOptions.map((item, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => handleInputChange("budget", item.title)}
//             className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${formData?.budget === item.title
//               ? "border-purple-400 bg-purple-500 bg-opacity-20"
//               : "border-purple-300 bg-opacity-10"
//               }`}
//           >
//             <h2 className="text-4xl mb-3">{item.icon}</h2>
//             <h2 className="font-bold text-xl text-purple-200">{item.title}</h2>
//             <h2 className="text-sm text-purple-300">{item.desc}</h2>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>

//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-purple-500/30"
//     >
//       <h2 className="text-3xl font-semibold text-purple-300 mb-6 flex items-center">
//         <Users className="mr-3" /> AI Group Dynamics Analyzer
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//         {SelectTravelsList.map((item, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => handleInputChange("traveler", item.people)}
//             className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${formData?.traveler === item.people
//               ? "border-purple-400 bg-purple-500 bg-opacity-20"
//               : "border-purple-300 bg-opacity-10"
//               }`}
//           >
//             <h2 className="text-4xl mb-3">{item.icon}</h2>
//             <h2 className="font-bold text-xl text-purple-200">{item.title}</h2>
//             <h2 className="text-sm text-purple-300">{item.desc}</h2>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   </div>

//   <motion.div
//     className="mt-16 flex justify-center"
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//   >
//     <Button
//       onClick={OnGenerateTrip}
//       disabled={loading}
//       className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg transition-all flex items-center space-x-3"
//     >
//       {loading ? (
//         <>
//           <Loader2 className="h-6 w-6 animate-spin mr-3" />
//           <span>AI Crafting Your Adventure...</span>
//         </>
//       ) : (
//         <>
//           <Brain className="h-6 w-6 mr-3" />
//           <span>Generate Your AI Dream Trip</span>
//           <Sparkles className="h-5 w-5 ml-2" />
//         </>
//       )}
//     </Button>
//   </motion.div>
// </motion.div>

//       <Dialog open={openDialog}>
//         <DialogContent className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 text-white">
//           <DialogHeader>
//             <DialogDescription className="text-center">
//               <motion.div
//                 className="mx-auto mb-6 w-24 h-24 bg-white rounded-full flex items-center justify-center"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1, rotate: 360 }}
//                 transition={{ type: "spring", stiffness: 260, damping: 20 }}
//               >
//                 <Brain className="w-16 h-16 text-purple-600" />
//               </motion.div>
//               <h2 className="font-bold text-3xl text-purple-200 mb-3">Activate AI Trip Planner</h2>
//               <p className="text-purple-300 mb-8">Sign in to unlock personalized AI-powered travel experiences</p>
//               <Button
//                 disabled={loading}
//                 onClick={isSignedIn}
//                 className="w-full py-4 bg-white hover:bg-gray-100 text-purple-900 text-lg font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-3"
//               >
//                 <FcGoogle className="h-7 w-7" />
//                 <span>Continue with Google</span>
//               </Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// export default CreateTrip
'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "@/constants/options"
import { chatSession } from "@/service/AIModal"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/service/firebaseConfig"
import { DollarSign, Users, MapPin, Calendar, Loader2, Sparkles, Brain } from 'lucide-react'
import Confetti from 'react-confetti'
import { useNavigate } from "react-router-dom"
import { useUser, SignInButton } from "@clerk/clerk-react"

// Improved FloatingBalloon component
// eslint-disable-next-line react/prop-types
const FloatingBalloon = ({ color }) => (
  <motion.div
    className={`absolute w-12 h-16 rounded-full bg-${color}-500 opacity-70`}
    initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
    animate={{
      y: [null, -100],
      x: [null, Math.random() * window.innerWidth],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      repeatType: "loop",
    }}
  />
)

// Enhanced CelebrationMessage component
const CelebrationMessage = ({ onClose, tripId }) => {
  const navigate = useNavigate()

  const handleViewTrip = () => {
    navigate(`/view-trip/${tripId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 shadow-lg"
    >
      <div className="container mx-auto flex flex-col items-center justify-between">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          className="text-center mb-6"
        >
          <h3 className="text-4xl font-bold mb-4">🎉 Your AI-Crafted Trip is Ready!</h3>
          <p className="text-xl">Embark on your personalized adventure!</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleViewTrip}
            variant="outline"
            className="text-slate-950 border-white hover:bg-white hover:text-purple-600 text-lg px-8 py-3"
          >
            View Your AI Trip
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

function CreateTrip() {
  const [place, selectPlace] = useState(null)
  const [formData, setFormData] = useState({})
  const [useManualLocation, setUseManualLocation] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const navigate = useNavigate()
  const [generatedTripId, setGeneratedTripId] = useState(null)
  const [showBalloons, setShowBalloons] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 5) {
      toast.warning("Please enter Trip Days less than 5")
    }
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Function to trigger balloon and confetti animations
  const triggerCelebration = () => {
    setShowBalloons(true)
    setShowCelebration(true)
    setTimeout(() => {
      setShowBalloons(false)
      setShowCelebration(false)
    }, 10000) // Remove celebrations after 10 seconds
  }

  // Enhanced OnGenerateTrip function
  const OnGenerateTrip = async () => {
    if (!isSignedIn) {
      setOpenDialog(true)
      return
    }

    if (
      !formData?.noOfDays ||
      formData?.noOfDays > 5 ||
      (!formData?.location && !useManualLocation) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.error("Please fill all the details")
      return
    }

    const location = useManualLocation
      ? formData?.manualLocation
      : formData?.location?.label || "Unknown Location"

    setLoading(true)

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", location)
      .replaceAll("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)

    // Simulating AI processing with a delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT)
      await SaveAiTrip(result?.response?.text())
      setLoading(false)
      triggerCelebration() // Trigger celebration animations
    } catch (error) {
      console.error("Error generating trip:", error)
      setLoading(false)
      toast.error("Failed to generate the trip")
    }
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true)
    const docId = Date.now().toString()

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: TripData,
      userEmail: user.primaryEmailAddress.emailAddress,
      id: docId
    })

    setGeneratedTripId(docId)
    setLoading(false)
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
      {/* AI-themed background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-10"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
              }}
            />
          ))}
        </div>
      </div>

      {showCelebration && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={5000}
        />
      )}

      {showBalloons && (
        <>
          <FloatingBalloon color="red" />
          <FloatingBalloon color="blue" />
          <FloatingBalloon color="green" />
          <FloatingBalloon color="yellow" />
          <FloatingBalloon color="purple" />
        </>
      )}

      {showCelebration && <CelebrationMessage onClose={() => setShowCelebration(false)} tripId={generatedTripId} />}

      {/* Main content remains the same until the Dialog component */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <motion.h2
          className="font-bold text-5xl mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          AI-Powered Dream Journey Crafter ✨
        </motion.h2>
        <motion.p
          className="text-2xl text-center text-purple-200 mb-16"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Let our advanced AI weave the perfect itinerary tailored just for you.
        </motion.p>

        <div className="space-y-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-purple-500/30"
          >
            <h2 className="text-3xl font-semibold text-purple-300 mb-6 flex items-center">
              <MapPin className="mr-3" /> AI Destination Analyzer
            </h2>
            {!useManualLocation ? (
              <>
                <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                  selectProps={{
                    place,
                    onChange: (v) => {
                      selectPlace(v)
                      handleInputChange("location", v)
                    },
                    placeholder: "Where shall our AI guide you?",
                    styles: {
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.5rem',
                        color: 'white',
                        '&:hover': { borderColor: 'rgba(255, 255, 255, 0.4)' },
                      }),
                      input: (provided) => ({
                        ...provided,
                        color: 'white',
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused ? 'rgba(129, 140, 248, 0.2)' : 'transparent',
                        color: 'black',
                      }),
                    },
                  }}
                />
                <p className="mt-3 text-sm text-purple-300 cursor-pointer hover:text-purple-100 transition-colors" onClick={() => setUseManualLocation(true)}>
                  Destination not listed? Let our AI process your custom input
                </p>
              </>
            ) : (
              <>
                <Input
                  placeholder="Describe your dream destination for AI analysis"
                  onChange={(e) => handleInputChange("manualLocation", e.target.value)}
                  className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-purple-500/30"
                />
                <p className="mt-3 text-sm text-purple-300 cursor-pointer hover:text-purple-100 transition-colors" onClick={() => setUseManualLocation(false)}>
                  Switch to AI-powered location suggestions
                </p>
              </>
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-purple-500/30"
          >
            <h2 className="text-3xl font-semibold text-purple-300 mb-6 flex items-center">
              <Calendar className="mr-3" /> AI Time Optimizer
            </h2>
            <Input
              placeholder="How many days for AI to optimize? (max 5)"
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              className="bg-black bg-opacity-10 border-2 border-purple-300 focus:border-purple-400 text-white placeholder-purple-200"
              max="5"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-purple-500/30"
          >
            <h2 className="text-3xl font-semibold text-purple-300 mb-6 flex items-center">
              <DollarSign className="mr-3" /> AI Budget Allocator
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {SelectBudgetOptions.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${formData?.budget === item.title
                    ? "border-purple-400 bg-purple-500 bg-opacity-20"
                    : "border-purple-300 bg-opacity-10"
                    }`}
                >
                  <h2 className="text-4xl mb-3">{item.icon}</h2>
                  <h2 className="font-bold text-xl text-purple-200">{item.title}</h2>
                  <h2 className="text-sm text-purple-300">{item.desc}</h2>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-purple-500/30"
          >
            <h2 className="text-3xl font-semibold text-purple-300 mb-6 flex items-center">
              <Users className="mr-3" /> AI Group Dynamics Analyzer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {SelectTravelsList.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${formData?.traveler === item.people
                    ? "border-purple-400 bg-purple-500 bg-opacity-20"
                    : "border-purple-300 bg-opacity-10"
                    }`}
                >
                  <h2 className="text-4xl mb-3">{item.icon}</h2>
                  <h2 className="font-bold text-xl text-purple-200">{item.title}</h2>
                  <h2 className="text-sm text-purple-300">{item.desc}</h2>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={OnGenerateTrip}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg transition-all flex items-center space-x-3"
          >
            {loading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin mr-3" />
                <span>AI Crafting Your Adventure...</span>
              </>
            ) : (
              <>
                <Brain className="h-6 w-6 mr-3" />
                <span>Generate Your AI Dream Trip</span>
                <Sparkles className="h-5 w-5 ml-2" />
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>

      {/* ... (previous JSX remains identical) ... */}

      <Dialog open={openDialog}>
        <DialogContent className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 text-white">
          <DialogHeader>
            <DialogDescription className="text-center">
              <motion.div
                className="mx-auto mb-6 w-24 h-24 bg-white rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Brain className="w-16 h-16 text-purple-600" />
              </motion.div>
              <h2 className="font-bold text-3xl text-purple-200 mb-3">Activate AI Trip Planner</h2>
              <p className="text-purple-300 mb-8">Sign in to unlock personalized AI-powered travel experiences</p>
              <SignInButton mode="modal">
                <Button className="w-full py-4 bg-white hover:bg-gray-100 text-purple-900 text-lg font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-3">
                  Sign In to Continue
                </Button>
              </SignInButton>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip