import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame } from 'framer-motion'

const ParallaxText = ({ children, baseVelocity = 100 }) => {
    const baseX = useRef(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    })

    const x = useTransform(baseX.current, (v) => `${wrap(-20, -45, v)}%`)

    const directionFactor = useRef(1)
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get()
        baseX.current += moveBy
    })

    return (
        <div className="parallax overflow-hidden">
            <motion.div
                className="scroller flex whitespace-nowrap"
                style={{ x }}
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="inline-block px-2">
                        {children}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

const wrap = (min, max, v) => {
    const rangeSize = max - min
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export default ParallaxText