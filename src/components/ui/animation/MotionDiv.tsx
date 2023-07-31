import { motion } from "framer-motion";
import React from "react";


type Animations = "fadeIn"

export default function MotionDiv({children, animation}: { children: React.ReactNode, animation: Animations}) {

    return (
        <motion.div {...animations[animation]}>
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