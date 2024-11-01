'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, Compass, Star, ChevronDown, Brain, Zap, Sparkles } from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import { useTheme } from 'next-themes'
import { Link } from 'react-router-dom'

const AnimatedBackground = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute inset-0 ${isDark ? 'bg-blue-950' : 'bg-blue-100'} opacity-50`}></div>
            <motion.div
                className="absolute inset-0"
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.12'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '200% 200%',
                }}
            />
        </div>
    )
}

const FadeInWhenVisible = ({ children }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.div>
    )
}

const ParallaxText = ({ children, baseVelocity = 100 }) => {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    })

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

    const directionFactor = useRef(1)
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1
        }
        moveBy += directionFactor.current * moveBy * velocityFactor.get()
        baseX.set(baseX.get() + moveBy)
    })

    return (
        <div className="parallax">
            <motion.div className="scroller" style={{ x }}>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
            </motion.div>
        </div>
    )
}

const wrap = (min, max, v) => {
    const rangeSize = max - min
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const NeuralNetworkBackground = () => {
    const canvasRef = useRef(null)
    const [nodes, setNodes] = useState([])
    const [connections, setConnections] = useState([])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const createNodes = () => {
            const newNodes = []
            for (let i = 0; i < 50; i++) {
                newNodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    vx: Math.random() * 2 - 1,
                    vy: Math.random() * 2 - 1,
                })
            }
            setNodes(newNodes)
        }

        const createConnections = () => {
            const newConnections = []
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    if (Math.random() > 0.98) {
                        newConnections.push([i, j])
                    }
                }
            }
            setConnections(newConnections)
        }

        createNodes()
        createConnections()

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update and draw nodes
            nodes.forEach((node, index) => {
                node.x += node.vx
                node.y += node.vy

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1

                ctx.beginPath()
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(100, 200, 255, 0.5)'
                ctx.fill()
            })

            // Draw connections
            connections.forEach(([i, j]) => {
                ctx.beginPath()
                ctx.moveTo(nodes[i].x, nodes[i].y)
                ctx.lineTo(nodes[j].x, nodes[j].y)
                ctx.strokeStyle = 'rgba(100, 200, 255, 0.1)'
                ctx.stroke()
            })

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

const AIFeatureCard = ({ icon: Icon, title, description }) => (
    <Tilt className="h-full">
        <motion.div
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg h-full transform transition-all duration-300 hover:scale-105 border border-blue-300/20"
            whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0, 0, 255, 0.3)' }}
        >
            <Icon className="w-12 h-12 mb-4 text-blue-400" />
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <p>{description}</p>
        </motion.div>
    </Tilt>
)

const FloatingParticles = () => {
    const particlesRef = useRef([])
    const [particles, setParticles] = useState([])

    useEffect(() => {
        const createParticles = () => {
            const newParticles = []
            for (let i = 0; i < 20; i++) {
                newParticles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 5 + 1,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 - 1,
                })
            }
            setParticles(newParticles)
        }

        createParticles()
        const interval = setInterval(() => {
            setParticles(prevParticles =>
                prevParticles.map(particle => ({
                    ...particle,
                    x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
                    y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight,
                }))
            )
        }, 50)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {particles.map((particle, index) => (
                <motion.div
                    key={index}
                    className="absolute rounded-full bg-blue-400 opacity-50"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        x: particle.x,
                        y: particle.y,
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </>
    )
}

const Hero = () => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-blue-900  via-indigo-900 to-purple-900 text-white overflow-hidden">
            <NeuralNetworkBackground />
            <FloatingParticles />
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-blue-400 transform origin-left"
                style={{ scaleX }}
            />

            <main className="relative z-10">
                <section className="min-h-screen flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.h1
                            className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            AI-Powered Travel Experiences
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl mb-10 text-blue-200"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Embark on journeys crafted by advanced AI, tailored to your unique preferences and dreams.
                        </motion.p>
                        <motion.div
                            className="flex flex-col md:flex-row items-center justify-center gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Link href="/create-trip">
                                <Button className="group flex items-center justify-center px-8 py-4 text-lg bg-blue-600 text-white font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-700 w-full md:w-auto">
                                    AI Trip Planner
                                    <Brain className="ml-2 w-5 h-5 transition-transform group-hover:rotate-90" />
                                </Button>
                            </Link>
                            <Link href="/virtual-tour">
                                <Button variant="outline" className="group flex items-center justify-center px-8 py-4 text-lg bg-transparent border-2 border-blue-400 text-blue-400 font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-400 hover:text-white w-full md:w-auto">
                                    Virtual Tour
                                    <Zap className="ml-2 w-5 h-5 transition-transform group-hover:rotate-90" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                    <motion.div
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ChevronDown className="w-8 h-8 text-blue-400 opacity-75" />
                    </motion.div>
                </section>

                <ParallaxText baseVelocity={-5}>AI-Driven Travel Innovation</ParallaxText>

                <section id="features" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-12 text-center">AI-Powered Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <AIFeatureCard
                                icon={Brain}
                                title="Neural Itinerary Planning"
                                description="Our advanced neural networks analyze millions of travel data points to create the perfect itinerary for you."
                            />
                            <AIFeatureCard
                                icon={Sparkles}
                                title="Sentiment-Aware Recommendations"
                                description="AI-powered sentiment analysis ensures every recommendation aligns with your emotional preferences and travel style."
                            />
                            <AIFeatureCard
                                icon={Globe}
                                title="Predictive Travel Trends"
                                description="Stay ahead of the curve with AI-predicted travel trends and hidden gems before they become mainstream."
                            />
                        </div>
                    </div>
                </section>

                <ParallaxText baseVelocity={5}> Choose Your Perfect Plan</ParallaxText>

                <section id="pricing" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-12 text-center">Pricing Plans</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: 'Basic', price: '₹99.99', features: ['30 AI-generated trips/month', 'Basic recommendations', 'Email support'] },
                                { name: 'Pro', price: '₹999.99', features: ['Unlimited AI-generated trips', 'Advanced recommendations', '24/7 support'] },
                                { name: 'Enterprise', price: 'Custom', features: ['Custom AI solutions', 'Dedicated account manager', 'API access'] },
                            ].map((plan, index) => (
                                <FadeInWhenVisible key={index}>
                                    <Tilt className="h-full">
                                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg flex flex-col h-full transform transition-all duration-300 hover:scale-105">
                                            <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
                                            <p className="text-3xl font-bold mb-6">{plan.price}</p>
                                            <ul className="mb-8 flex-grow">
                                                {plan.features.map((feature, i) => (
                                                    <li key={i} className="mb-2 flex items-center">
                                                        <Star className="w-5 h-5 mr-2 text-yellow-400" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Button className="w-full">Choose Plan</Button>
                                        </div>
                                    </Tilt>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </div>
                </section>

                <ParallaxText baseVelocity={-5}>Revolutionizing Travel Planning</ParallaxText>

                <section id="about" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-12 text-center">About TripSync AI</h2>
                        <FadeInWhenVisible>
                            <div className="max-w-3xl mx-auto text-center">
                                <p className="text-lg mb-8">
                                    TripSync AI is revolutionizing travel planning with cutting-edge AI technology. Our mission is to make every journey unforgettable by providing personalized, intelligent travel recommendations tailored to your unique preferences and interests.
                                </p>
                                <Button variant="outline" className="mx-auto">Learn More</Button>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </section>

                <ParallaxText baseVelocity={5}>What Our Users Say</ParallaxText>

                <section id="testimonials" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-12 text-center">What Our Users Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { name: 'Sarah L.', text: 'TripSync AI made planning my Europe trip a breeze. The AI recommendations were spot-on!' },
                                { name: 'Mike R.', text: 'I was skeptical about AI travel planning, but TripSync AI exceeded my expectations. Highly recommended!' },
                                { name: 'Emily T.', text: 'The personalized itineraries saved me hours of research. TripSync AI is a game-changer for travel enthusiasts.' },
                            ].map((testimonial, index) => (
                                <FadeInWhenVisible key={index}>
                                    <Tilt className="h-full">
                                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg h-full transform transition-all duration-300 hover:scale-105">
                                            <p className="mb-4 italic">"{testimonial.text}"</p>
                                            <p className="font-semibold">- {testimonial.name}</p>
                                        </div>
                                    </Tilt>
                                </FadeInWhenVisible>
                            ))}
                        </div>
                    </div>
                </section>

                <ParallaxText baseVelocity={-5}>Get in Touch</ParallaxText>

                <section id="contact" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-12 text-center">Contact Us</h2>
                        <FadeInWhenVisible>
                            <div className="max-w-md mx-auto">
                                <form className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2">Name</label>
                                        <input type="text" id="name" className="w-full px-4 py-2 rounded bg-white/10 backdrop-blur-md text-white border border-blue-300/20" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2">Email</label>
                                        <input type="email" id="email" className="w-full px-4 py-2 rounded bg-white/10 backdrop-blur-md text-white border border-blue-300/20" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block mb-2">Message</label>
                                        <textarea id="message" rows={4} className="w-full px-4 py-2 rounded bg-white/10 backdrop-blur-md text-white border border-blue-300/20"></textarea>
                                    </div>
                                    <Button type="submit" className="w-full">Send Message</Button>
                                </form>
                            </div>
                        </FadeInWhenVisible>
                    </div>
                </section>
            </main>

            <footer className="bg-blue-900/50 backdrop-blur-md py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="w-full md:w-auto mb-4 md:mb-0">
                            <Link href="/" className="text-2xl font-bold">TripSync AI</Link>
                        </div>
                        <nav className="w-full md:w-auto">
                            <ul className="flex flex-wrap justify-center md:justify-end space-x-6">
                                {['Home', 'Features', 'AI Demo', 'About', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <Link href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="mt-8 text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} TripSync AI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Hero