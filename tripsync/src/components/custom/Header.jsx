import React from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    SignInButton,
    SignOutButton,
    UserButton,
    useUser,
    useClerk
} from "@clerk/clerk-react";

const ProfileAvatar = ({ userName, imageUrl }) => {
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
            {imageUrl ? (
                <div className="h-full w-full bg-gradient-to-br from-purple-600 to-teal-600 p-0.5">
                    <img
                        src={imageUrl}
                        alt={`${userName}'s profile`}
                        className="h-full w-full rounded-full object-cover bg-white"
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
    const { isSignedIn, user } = useUser();
    const { signOut } = useClerk();

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
                    {isSignedIn ? (
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
                                        <UserButton />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 p-0 bg-white rounded-lg shadow-lg">
                                    <div className="p-4">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <ProfileAvatar
                                                userName={user.fullName}
                                                imageUrl={user.imageUrl}
                                            />
                                            <div>
                                                <p className="font-medium text-lg text-gray-900">{user.fullName}</p>
                                                <p className="text-sm text-gray-500">{user.primaryEmailAddress.emailAddress}</p>
                                            </div>
                                        </div>
                                        <SignOutButton>
                                            <Button
                                                variant="ghost"
                                                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900"
                                            >
                                                Logout
                                            </Button>
                                        </SignOutButton>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    ) : (
                        <SignInButton mode="modal">
                            <Button className="bg-white text-purple-900 hover:bg-teal-50 transition-all duration-300 font-medium">
                                Sign In
                            </Button>
                        </SignInButton>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;