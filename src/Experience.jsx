import React, { useState, useEffect, Suspense } from 'react';
import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF, useProgress } from '@react-three/drei';
import './orientationMessage.css'; // Import CSS for the orientation message

function CustomLoader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="loader">
                <p>Loading... {Math.round(progress)}%</p>
            </div>
        </Html>
    );
}

export default function Experience() {
    const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');

    useEffect(() => {
        const handleResize = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {!isLandscape ? (
                <Html>
                    <div className="orientation-message">
                        <div className="message-content">
                            <img className="rotate-phone" src="./rotate_phone.jpg" alt="rotate phone" />
                            Please rotate your device to landscape mode.
                        </div>
                    </div>
                </Html>
            ) : (
                <Suspense fallback={<CustomLoader />}>
                    <color args={['#241a1a']} attach="background" />
                    <Environment preset="city" />
                    <PresentationControls
                        global
                        rotation={[0.13, 0.1, 0]}
                        polar={[-0.4, 0.2]}
                        azimuth={[-1, 0.75]}
                        config={{ mass: 2, tension: 400 }}
                        snap={{ mass: 5, tension: 400 }}
                        zoom={1}
                    >
                        <Float rotationIntensity={0.4}>
                            <rectAreaLight
                                width={2.5}
                                height={1.65}
                                intensity={65}
                                rotation={[-0.1, Math.PI, 0]}
                                position={[0, 0.55, -1.15]}
                            />
                            <primitive object={computer.scene} position-y={-1.2}>
                                <Html
                                    transform
                                    wrapperClass="htmlScreen"
                                    distanceFactor={1.17}
                                    position={[0, 1.56, -1.4]}
                                    rotation-x={-0.256}
                                >
                                    <iframe
                                        src="https://el132.github.io/new-website/"
                                        style={{ backgroundColor: 'white' }}
                                    />
                                </Html>
                            </primitive>
                            <Text
                                font="./bangers-v20-latin-regular.woff"
                                fontSize={1}
                                position={[2, 0.75, 0.75]}
                                rotation-y={-1.25}
                                maxWidth={2}
                            >
                                Elias Lind
                            </Text>
                            <Text
                                font="./bangers-v20-latin-regular.woff"
                                fontSize={0.25}
                                position={[0, -0.65, 0.75]} // Adjusted position
                                rotation-x={-Math.PI / 2} // Rotate to face upwards
                                maxWidth={2}
                                color={'#000'}
                                textAlign="center"
                            >
                                Grab & drag to rotate
                            </Text>
                        </Float>
                    </PresentationControls>
                    <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
                </Suspense>
            )}
        </>
    );
}
