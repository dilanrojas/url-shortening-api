import { useState, useRef } from "react";
import "./styles.css"

const Hambuguer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const hamButton = useRef(null)
  
  const handleMenu = () => {
    hamButton.current.classList.toggle('no-scroll')
    document.querySelector('.primary-nav-wrapper').classList.toggle('expanded')
    setIsOpen(true)
  }

  return (
    <button className="hamburguer-menu" ref={hamButton} onClick={handleMenu} aria-hidden={!isOpen}>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </button>
  )
}

export default Hambuguer