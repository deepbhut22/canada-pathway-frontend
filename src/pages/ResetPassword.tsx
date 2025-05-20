import Layout from "../components/layout/Layout";
import { FormControl, Input, FormHelperText } from "../components/ui/Form";
import Button from "../components/ui/Button";
import React from "react";
import { toast } from "react-toastify";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { Loader, ArrowLeft } from "lucide-react";

export default function ResetPassword() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [token, setToken] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password || !confirmPassword || !token) {
            toast.error('Please fill all the fields');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            setIsLoading(true);
            const response = await api.post('/auth/reset-password', { email, password, token });
            if (response.status === 200) {
                toast.success(response.data.message);
                setIsLoading(false);
                setPassword('');
                setConfirmPassword('');
                setToken('');
                setEmail('');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setIsLoading(false);
                toast.error(response.data.message);
            }
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.response?.data?.message || 'Something went wrong');
            console.log(error);
        }
    };

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');
        if (token && email) {
            setToken(token);
            setEmail(email);
        }
    }, []);

    return (
        <Layout className="flex flex-col items-center justify-center min-h-screen px-4">
            {/* Back Arrow */}
            <div
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-secondary-950 cursor-pointer self-start mb-4 hover:underline"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
            </div>

            {/* Form */}
            <form
                onSubmit={(e) => handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}
                className="flex flex-col items-center justify-center gap-4 w-full max-w-md mx-auto bg-secondary-100 border-2 border-secondary-300 py-8 px-4 rounded-lg shadow-lg"
            >
                <FormControl className="w-full">
                    <FormControl className="flex flex-col">
                        <Input
                            placeholder="Enter your new password"
                            className="bg-secondary-100 text-secondary-950"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormHelperText>Password must be at least 6 characters long</FormHelperText>
                        <div className="h-4" />
                        <Input
                            placeholder="Confirm your new password"
                            className="bg-secondary-100 text-secondary-950"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <FormHelperText>Re-enter your new password</FormHelperText>
                    </FormControl>
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
    );
}
