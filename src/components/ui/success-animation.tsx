import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
  className?: string;
  onComplete?: () => void;
}

export const SuccessAnimation = ({ show, message, className, onComplete }: SuccessAnimationProps) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        duration: 0.6
      }}
      onAnimationComplete={onComplete}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, times: [0, 0.6, 1] }}
        className="bg-white rounded-full p-8 shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <CheckCircle className="h-16 w-16 text-green-500" />
        </motion.div>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="text-center mt-4 font-medium text-gray-900"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};