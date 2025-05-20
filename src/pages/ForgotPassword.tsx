import React from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import { FormControl, FormLabel, Input, FormHelperText } from "../components/ui/Form";
import api from "../utils/axios";
import { toast } from "react-toastify";
import { ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || email === '') {
            toast.error('Please enter your email');
            return;
        }
        try {
            setIsLoading(true);
            const response = await api.post('/auth/forgot-password', { email });
            if (response.status === 200) {
                toast.success('Email sent successfully');
            }
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.response?.data?.message || "Something went wrong");
            console.log(error);
        }
    }

    return (
        <Layout className="flex flex-col items-center justify-center min-h-screen px-4">
            <div
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-secondary-950 cursor-pointer self-start mb-4 hover:underline"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
            </div>
            <form
                onSubmit={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
                className="flex flex-col items-center justify-center gap-4 w-full max-w-md mx-auto bg-secondary-100 border-2 border-secondary-300 py-8 px-4 rounded-lg shadow-lg"
            >
                <FormControl className="w-full">
                    <FormLabel>
                        Enter your mail id of which you want to reset your password
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Enter your email"
                            className="bg-secondary-100 text-secondary-950"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormHelperText>
                        You will receive an e-mail to reset your password
                    </FormHelperText>
                </FormControl>
                <div className="flex justify-start w-full">
                    <Button
                        disabled={isLoading}
                        className="bg-secondary-950 text-white hover:bg-secondary-600"
                        type="submit"
                    >
                        {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Reset Password'}
                    </Button>
                </div>
            </form>
        </Layout>
    )
}
