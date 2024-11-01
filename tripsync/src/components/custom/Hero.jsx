import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Compass } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative bg-cover bg-center h-screen flex items-center justify-center text-white overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-teal-900 animate-gradient-x"
                style={{
                    backgroundSize: '400% 400%',
                    animation: 'gradient 15s ease infinite',
                }}
            />
            <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                    <path d="M0,1000 C200,800 400,800 500,1000 C600,800 800,800 1000,1000" fill="none" stroke="white" strokeWidth="4" />
                    <circle cx="500" cy="500" r="200" fill="none" stroke="white" strokeWidth="4" />
                    <path d="M300,300 Q500,0 700,300 T1000,500" fill="none" stroke="white" strokeWidth="4" />
                </svg>
            </div>
            <div className="relative z-10 text-center max-w-4xl px-4 animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                    Discover Your Next Adventure with AI
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-10 text-blue-100">
                    Plan unforgettable trips effortlessly with our AI-powered recommendations tailored just for you.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <Link to="/create-trip">
                        <Button className="group flex items-center justify-center px-8 py-4 text-lg bg-white text-blue-900 font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-100 w-full md:w-auto">
                            AI Generated
                            <Globe className="ml-2 w-5 h-5 transition-transform group-hover:rotate-90" />
                        </Button>
                    </Link>
                    <Link to="/manual-trip">
                        <Button className="group flex items-center justify-center px-8 py-4 text-lg bg-transparent border-2 border-white text-white font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-white hover:text-blue-900 w-full md:w-auto">
                            Manual Trip
                            <Compass className="ml-2 w-5 h-5 transition-transform group-hover:rotate-90" />
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent opacity-75" />
        </div>
    );
};

export default Hero;