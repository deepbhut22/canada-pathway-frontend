import Layout from "../components/layout/Layout";
import BackgroundGradientAnimation from "../components/ui/backgrounds/GradientBackgroundAnimation";
import { FadeIn, TypewriterText } from "../components/home/HeroSection";
export default function MappleAI() {
    return (
        <Layout>
            <BackgroundGradientAnimation>
                <div className="flex flex-col items-center pt-24 h-screen w-full relative z-10 isolate">
                    <div className="flex flex-col rounded-lg h-min w-min p-10">
                        <div className="w-full flex flex-col items-center gap-5">
                            {/* <p className="text-5xl font-bold w-96 text-black text-stroke-transparent">
                                <TypewriterText text="Try Our Mapple AI" />
                            </p> */}
                            <p className="relative inline-block text-white font-bold text-5xl">
                                <span className="relative z-10">Try Our Mapple AI</span>
                                <span
                                    className="absolute top-0 left-0 z-0 text-black opacity-20 blur-sm"
                                    style={{
                                        WebkitTextStroke: '4px transparent',
                                    }}
                                >
                                    Try Our Mapple AI
                                </span>
                            </p>

                            <div className="space-y-10">
                                <p className="text-2xl font-bold w-96 text-secondary-400 mappleai-text-glow">
                                    <FadeIn delay={1000}>
                                        <p>Get Your Personalized Immigration Insights with Mapple AI</p>
                                    </FadeIn>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </BackgroundGradientAnimation>
            {/* V-shaped bottom cutout revealing the animated background */}
            <div className="absolute bottom-0 w-full overflow-hidden leading-none z-[-1]">
                <svg
                    className="w-full h-32"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <polygon
                        fill="white"
                        points="0,0 0,100 50,50 100,100 100,0"
                    />
                </svg>
            </div>

            <div className="flex items-center justify-center h-screen w-full bg-white z-100">
                haha
            </div>
        </Layout>
    );
}