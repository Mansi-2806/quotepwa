// @ts-nocheck
import { useEffect } from 'react'

interface ARSceneProps {
  quoteText: string;
}

function ARScene({ quoteText }: ARSceneProps) {
  useEffect(() => {
    // Ensure A-Frame is loaded before rendering
    if (typeof window !== 'undefined' && !(window as any).AFRAME) {
      import('aframe')
    }
  }, [])

  // Format the text to wrap lines loosely
  const formattedText = quoteText.match(/.{1,35}(\s|$)/g)?.join('\\n') || quoteText

  return (
    <a-scene webxr="optionalFeatures: hit-test;" renderer="colorManagement: true;">
      <a-assets>
        <a-mixin id="quote-font" text="font: mozillavr; align: center; width: 3; color: #FFFFFF"></a-mixin>
      </a-assets>

      {/* AR Camera Setup */}
      <a-entity camera look-controls position="0 1.6 0"></a-entity>

      {/* The 3D text displaying the quote */}
      <a-entity 
        position="0 1.6 -2" 
        text={`value: ${formattedText}; mixin: quote-font`}
        animation="property: position; to: 0 1.7 -2; dir: alternate; dur: 2000; loop: true"
      >
      </a-entity>

      {/* Lighting for better visibility in AR */}
      <a-light type="ambient" color="#fff" intensity="1"></a-light>
      <a-light type="directional" color="#fff" intensity="0.5" position="-1 1 1"></a-light>
    </a-scene>
  )
}

export default ARScene
