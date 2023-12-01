/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_PREFIX } from "../../utils/localStorage-prefix";


export default function ExpandableCard({ title, children, cardClassName, titleClassName, id, icon }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_PREFIX + id);
    if (storedState !== null) {
      setIsOpen(storedState === "open");
    }
  }, [id]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem(LOCAL_STORAGE_PREFIX + id, newState ? "open" : "closed");
  };

  return (
    <motion.div layout transition={{ layout: { duration: 1, type: "spring" } }} className={cardClassName}>
      <motion.h2 layout="position" onClick={handleToggle} className={titleClassName}>
        {title}
        {icon}
      </motion.h2>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
