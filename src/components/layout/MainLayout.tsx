import React from "react";
import { motion } from "framer-motion";
import MotionDiv from "../ui/animation/MotionDiv";



export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <MotionDiv animation="fadeIn"
            className="flex flex-col h-screen">
            {children}
        </MotionDiv>
    )
}