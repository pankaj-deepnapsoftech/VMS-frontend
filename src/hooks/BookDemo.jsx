import  { useState } from 'react'

const useBookDemo = () => {
   const [isOpen, setIsOpen] = useState(false);
   console.log("this is only for testing",isOpen)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openModal,
    closeModal,
  };
}

export default useBookDemo