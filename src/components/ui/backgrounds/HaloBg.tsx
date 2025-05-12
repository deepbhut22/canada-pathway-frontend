// import { useEffect, useRef, useState } from 'react'

// declare global {
//     interface Window {
//         VANTA: any
//         THREE: any
//     }
// }

// const VantaHaloBackground = () => {
//     const vantaRef = useRef<HTMLDivElement>(null)
//     const [vantaEffect, setVantaEffect] = useState<any>(null)

//     useEffect(() => {
//         const loadScripts = async () => {
//             if (!window.THREE) {
//                 await import('three')
//                 window.THREE = (await import('three')).default
//             }

//             if (!window.VANTA?.HALO) {
//                 const vanta = await import('vanta/dist/vanta.halo.min')
//                 window.VANTA = { ...window.VANTA, HALO: vanta.default }
//             }

//             if (vantaRef.current && !vantaEffect) {
//                 const effect = window.VANTA.HALO({
//                     el: vantaRef.current,
//                     mouseControls: true,
//                     touchControls: true,
//                     gyroControls: false,
//                     minHeight: 200.0,
//                     minWidth: 200.0,
//                     backgroundColor: 0x131a43,
//                     baseColor: 0x001a59,
//                     size: 1.0,
//                     amplitudeFactor: 1.0,
//                     xOffset: 0.0,
//                     yOffset: 0.0
//                 })
//                 setVantaEffect(effect)
//             }
//         }

//         loadScripts()

//         return () => {
//             if (vantaEffect) vantaEffect.destroy()
//         }
//     }, [vantaEffect])

//     return <div ref={vantaRef} style={{ width: '100%', height: '100vh' }} />
// }

// export default VantaHaloBackground
