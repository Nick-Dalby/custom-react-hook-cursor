import { useEffect, useState } from 'react'

const isMobile = () => {
  const ua = navigator.userAgent;
  return /Android|Mobi/i.test(ua);
};

const Cursor = () => {
  if (typeof navigator !== "undefined" && isMobile()) return null;

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    addEventListeners()
    handleLinkHover()
    return () => removeEventListeners()
  }, [])

  const handleLinkHover = () => {
    document.querySelectorAll('a').forEach((el) => {
      el.addEventListener('mouseover', () => setLinkHovered(true))
      el.addEventListener('mouseout', () => setLinkHovered(false))
    })
  }

  const addEventListeners = () => {
    document.addEventListener('mousemove', onMouseMove)
    document.documentElement.addEventListener('mouseenter', onMouseEnter) // firefox needs 'documentElement' ??
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('mouseup', onMouseUp)
  }

  const removeEventListeners = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.documentElement.removeEventListener('mouseenter', onMouseEnter)
    document.documentElement.removeEventListener('mouseleave', onMouseLeave)
    document.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mouseup', onMouseUp)
  }

  const onPointerDown = (e) => {
    setClicked(true)
  }

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  const onMouseEnter = () => {
    setHidden(false)
  }

  const onMouseLeave = (e) => {
    setHidden(true)
  }

  const onMouseDown = () => {
    setClicked(true)
  }

  const onMouseUp = () => {
    // use a delay for taps to show the change
    setTimeout(() => {
      setClicked(false)
    }, 100)
  }

  return (
    <div
      className={`cursor ${hidden ? 'hidden' : ''} ${
        clicked ? 'clicked' : ''
      } ${linkHovered ? 'link-hover' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    ></div>
  )
}
export default Cursor
