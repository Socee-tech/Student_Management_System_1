import { motion as Motion } from "framer-motion";
import { X } from "lucide-react";



export default function CompIns({ component, onClose }) {
    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[101]"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="space-y-4"
            >
                <div className="justify-between flex">
                    <div className="font-semibold text-xl">Students</div>
                    <X onClick={onClose} className="cursor-pointer" size={30} />
                </div>
                {component}
            </div>
        </Motion.div>
    )
}