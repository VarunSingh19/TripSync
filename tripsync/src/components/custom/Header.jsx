import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Brain } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const ProfileAvatar = ({ userName, avatarUrl, onError }) => {
    const getInitials = (name) => {
        return name
            ?.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || '??';
    };

    const generateAvatarFallback = (name) => {
        const colors = [
            'from-purple-500 to-indigo-500',
            'from-blue-500 to-teal-500',
            'from-green-500 to-emerald-500',
            'from-yellow-500 to-orange-500',
            'from-red-500 to-pink-500',
        ];
        const colorIndex = name?.length % colors.length || 0;
        return {
            background: colors[colorIndex],
            initials: getInitials(name),
        };
    };

    const fallback = generateAvatarFallback(userName);

    return (
        <div className="h-10 w-10 rounded-full overflow-hidden">
            {avatarUrl ? (
                <div className="h-full w-full bg-gradient-to-br from-purple-600 to-teal-600 p-0.5">
                    <img
                        src={avatarUrl}
                        alt={`${userName}'s profile`}
                        className="h-full w-full rounded-full object-cover bg-white"
                        onError={onError}
                    />
                </div>
            ) : (
                <div className={`h-full w-full bg-gradient-to-br ${fallback.background} flex items-center justify-center`}>
                    <span className="text-white text-sm font-medium">
                        {fallback.initials}
                    </span>
                </div>
            )}
        </div>
    );
};

function Header() {
    const [user, setUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profileError, setProfileError] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");

    const getUserProfile = async (tokenInfo) => {
        setLoading(true);
        setProfileError(false);

        try {
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenInfo?.access_token}`,
                        Accept: "application/json",
                    },
                }
            );

            const userData = response.data;

            // Create avatar URL with a timestamp to prevent caching
            const timestamp = new Date().getTime();
            const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random&color=fff&size=96&t=${timestamp}`;

            const userDataToStore = {
                ...userData,
                picture: fallbackAvatar,
            };

            localStorage.setItem("user", JSON.stringify(userDataToStore));
            setUser(userDataToStore);
            setAvatarUrl(fallbackAvatar);
            setOpenDialog(false);
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            setProfileError(true);
        } finally {
            setLoading(false);
        }
    };

    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp),
        onError: (error) => {
            console.log(error);
            setProfileError(true);
        },
    });

    useEffect(() => {
        try {
            const userData = localStorage.getItem("user");
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setAvatarUrl(parsedUser.picture);
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem("user");
        }
    }, []);

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem("user");
        setUser(null);
        setAvatarUrl("");
    };

    const handleAvatarError = () => {
        // Generate a new avatar URL with timestamp on error
        if (user?.name) {
            const timestamp = new Date().getTime();
            const newAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=96&t=${timestamp}`;
            setAvatarUrl(newAvatarUrl);
        } else {
            setAvatarUrl("");
        }
    };

    return (
        <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-teal-900 p-3 shadow-lg">
            <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
                <a href="/" className="hover:opacity-80 transition-opacity">
                    <div className="flex items-center space-x-2">
                        <img src="/logo.svg" alt="TripSync Logo" width={32} height={32} className="filter brightness-0 invert" />
                        <span className="font-bold text-xl text-white">TripSync</span>
                    </div>
                </a>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-2">
                            <a href="/create-trip">
                                <Button
                                    variant="secondary"
                                    className="bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                                >
                                    Create Trip
                                </Button>
                            </a>
                            <a href="/my-trips">
                                <Button
                                    variant="secondary"
                                    className="bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                                >
                                    My Trips
                                </Button>
                            </a>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative group p-0 hover:bg-transparent focus:ring-2 focus:ring-white/20 rounded-full"
                                    >
                                        <ProfileAvatar
                                            userName={user.name}
                                            avatarUrl={avatarUrl}
                                            onError={handleAvatarError}
                                        />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 p-0 bg-white rounded-lg shadow-lg">
                                    <div className="p-4">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <ProfileAvatar
                                                userName={user.name}
                                                avatarUrl={avatarUrl}
                                                onError={handleAvatarError}
                                            />
                                            <div>
                                                <p className="font-medium text-lg text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={handleLogout}
                                            variant="ghost"
                                            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900"
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    ) : (
                        <Button
                            onClick={() => setOpenDialog(true)}
                            className="bg-white text-purple-900 hover:bg-teal-50 transition-all duration-300 font-medium flex items-center space-x-2"
                        >
                            <LogIn className="h-4 w-4" />
                            <span>Sign In</span>
                        </Button>
                    )}
                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
                            {profileError && (
                                <p className="text-red-300 mb-4">Failed to load profile. Please try again.</p>
                            )}
                            <Button
                                disabled={loading}
                                onClick={() => {
                                    setProfileError(false);
                                    login();
                                }}
                                className="w-full py-4 bg-white hover:bg-gray-100 text-purple-900 text-lg font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-3"
                            >
                                <FcGoogle className="h-7 w-7" />
                                <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </header>
    );
}

export default Header;