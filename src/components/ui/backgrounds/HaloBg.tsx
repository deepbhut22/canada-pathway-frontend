import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';


declare global {
    interface Window {
        VANTA: any
        THREE: any
    }
}

const VantaHaloBackground = ({xOffset, yOffset, size=1.5}: {xOffset: number, yOffset: number, size?: number}) => {
    const vantaRef = useRef<HTMLDivElement>(null)
    const [vantaEffect, setVantaEffect] = useState<any>(null)

    useEffect(() => {
        const loadScripts = async () => {
            if (!window.THREE) {
                await import('three')
                window.THREE = THREE
            }

            if (!window.VANTA?.HALO) {
                const vanta = await import('vanta/dist/vanta.halo.min')
                window.VANTA = { ...window.VANTA, HALO: vanta.default }
            }

            if (vantaRef.current && !vantaEffect) {
                const effect = window.VANTA.HALO({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    backgroundColor: 0x1e293b, 
                    baseColor: 0x001a59, 
                    size: size,
                    amplitudeFactor: 1.5,
                    xOffset: xOffset,
                    // xOffset: 0.0,
                    yOffset: yOffset
                    // yOffset: 0.0
                })
                setVantaEffect(effect)
            }
        }

        loadScripts()

        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    return <div ref={vantaRef} style={{ width: '100%', height: '100vh' }} />
}

export default VantaHaloBackground;
