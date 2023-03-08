import React, { Component } from "react"
import Particles from "react-tsparticles"

class ParticleSettings extends Component {
    render() {
        return (
            <div>
                <Particles
                    height="1000px" width="100vw"
                    id="tsparticles"
                    options={{
                        background: {
                            color: {
                                value: "#9bb6e0"
                            },
                        },
                        fpslimit: 60,
                        interactivity: {
                            detect_on: "canvas",
                            events: {
                                onclick: {
                                    enable: true,
                                    mode: "push"
                                },
                                onHover: {
                                    enable: true,
                                    mode: "repulse"
                                },
                                resize: true,
                            },
                            modes: {
                                bubble: {
                                    distance: 400,
                                    duration: 2,
                                    opacity: 0.8,
                                    size: 40,
                                },
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#AED6F1",
                            },
                            links: {
                                color: "#F4F4F4",
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 1,
                            },
                            collisions: {
                                enable: true,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outMode: "bounce",
                                random: false,
                                speed: 1,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    value_area: 800,
                                },
                                value: 80,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                random: true,
                                value: 5,
                            },
                        }
                    }}
                />
            </div>
        )
    }
}

export default ParticleSettings;