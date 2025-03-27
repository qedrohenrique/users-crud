"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

export const AuthenticationMotion = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {!isRegistering ? (
          <motion.div
            className="w-1/2"
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <LoginForm onBackToRegister={() => setIsRegistering(true)} />
          </motion.div>
        ) : (
          <motion.div
            className="w-1/2"
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <RegisterForm
              onBackToLogin={() => setIsRegistering(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

