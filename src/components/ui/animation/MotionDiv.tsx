import { motion } from "framer-motion";
import React from "react";


type Animations = "fadeIn"

export default function MotionDiv({
        children, 
        animation, 
        className
    }: { 
        children: React.ReactNode, 
        animation: Animations, 
        className?: string 
    }) {

    return (
        <motion.div {...animations[animation]} className={className}>
            {children}
        </motion.div>
    )

}

const animations = {

    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 } ,
        transition: { duration: 1 },
    }

}