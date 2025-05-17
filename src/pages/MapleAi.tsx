import Layout from "../components/layout/Layout";
import { FadeIn, TypewriterText } from "../components/home/HeroSection";
import VantaHaloBackground from "../components/ui/backgrounds/HaloBg";
import useAuthStore from "../store/authStore";
import {useUserStore} from "../store/userStore";
import { useState } from "react";
import ChatBox from "../components/ui/ChatBox";
import { MessagePopup } from "../components/ui/MessagePopup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
export default function MapleAI() {

    const [isLoginPopup, setIsLoginPopup] = useState(false);
    const [isChatboxOpen, setIsChatboxOpen] = useState(false);

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isComplete = useUserStore((state) => state.userProfile.isComplete);

    const navigate = useNavigate();

    function handleTryNow(): void {
        if (isAuthenticated) {
            if (isComplete) {
                setIsChatboxOpen(true);
            } else {
                useAuthStore.getState().setIsPopupOpen(true);
            }
        } else {
            useAuthStore.getState().setIsPopupOpen(true);
        }
    }

    return (
        <>
            <Helmet>
                <title>MapleAI — Your Immigration Chat Assistant | Pathpr</title>
                <meta name="description" content="Chat with MapleAI for instant answers to your Canadian immigration questions, eligibility, and program advice." />
                <meta property="og:title" content="MapleAI — Canadian Immigration Chatbot | Pathpr" />
                <meta property="og:description" content="Ask MapleAI your immigration-related queries. Get intelligent, real-time answers powered by AI." />
                <meta property="og:url" content="https://pathpr.ca/mapleAi" />
            </Helmet>
            <Layout>
                <div className="hidden sm:block absolute inset-0 pointer-events-none w-screen h-[50vh]">
                    <VantaHaloBackground xOffset={0.18} yOffset={0.0} />
                </div>

                <div className="block absolute sm:hidden pointer-events-none w-screen h-[50vh]">
                    <VantaHaloBackground xOffset={0.0} yOffset={0.0} size={1.8}/>
                </div>

                    <div className="flex flex-col justify-center md:pt-24 h-screen w-full z-10 isolate">
                        <div className="flex flex-col rounded-lg h-min w-full md:w-1/3 p-10 md:ml-24 sm:mb-14">
                            <div className="w-full flex flex-col gap-5">
                                <div>
                                    <p className="text-white text-md md:text-2xl font-bold">
                                        Try Our
                                    </p>
                                    <p className="text-4xl md:text-7xl font-bold w-full text-white">
                                        <TypewriterText text="Maple AI" time={100} />
                                    </p>
                                </div>

                                <div className="space-y-10">
                                    <p className="text-xl font-normal w-full text-white">
                                        <FadeIn delay={1000}>
                                            <p>For Your Personalized Immigration Insights.</p>
                                        </FadeIn>
                                    </p>
                                </div>
                            {/* <div className="p-[3px] rounded-md border border-white w-1/2">
                                <button 
                                    onClick={handleTryNow}
                                    className="bg-transparent text-white border border-white rounded-sm px-4 py-2 text-md w-full">
                                    Try Now
                                </button>
                            </div> */}

                            <button 
                                onClick={handleTryNow}
                                className="p-[3px] relative w-1/2">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                                <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                    Try Now
                                </div>
                            </button>

                        </div>
                    </div>
                    <div className="hidden sm:block absolute bottom-0 w-full h-24 overflow-hidden z-[-1]">
                        <svg
                            className="w-full h-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0,0 C25,100 75,100 100,0 L100,100 L0,100 Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                </div>
                <MessagePopup
                    isOpen={isLoginPopup}
                    onClose={() => setIsLoginPopup(false)}
                    title="Login Required"
                    message="Please login to access this feature"
                    type="warning"
                    actionText="Redirect to Login"
                    onAction={() => {
                        setIsLoginPopup(false);
                        navigate('/login');
                    }}
                    cancelText="Not now"
                />
                <ChatBox
                    isOpen={isChatboxOpen}
                    onClose={() => setIsChatboxOpen(false)}
                />
            </Layout>
        </>
    );
}