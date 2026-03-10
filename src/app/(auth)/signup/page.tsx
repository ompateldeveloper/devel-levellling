"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { authClient, signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
    const router = useRouter();

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const { mutate: handleSignUp, isPending: isSigningUp } = useMutation({
        mutationFn: async (values: SignUpFormValues) => {
            const { data, error } = await signUp.email({
                email: values.email,
                password: values.password,
                name: values.name,
                callbackURL: "/interface",
            });

            if (error) {
                throw new Error(error.message || "Something went wrong during sign up");
            }
            return data;
        },
        onSuccess: () => {
            toast.success("Account created successfully!");
            router.push("/interface");
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const handleGithubSignUp = async () => {
        try {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/interface",
            });
        } catch (error) {
            toast.error("GitHub Login failed: " + (error || "Unknown error"));
        }
    };

    return (
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-xl bg-white dark:bg-zinc-900 overflow-hidden">
            <CardHeader className="space-y-1 pb-6 pt-8">
                <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                <CardDescription className="text-center">Join the ranks and start your journey</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 px-8">
                <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline" onClick={handleGithubSignUp} className="w-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                    </Button>
                </div>
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((v) => handleSignUp(v))} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            className="bg-transparent border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-zinc-400 outline-hidden transition-all"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="name@example.com"
                                            className="bg-transparent border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-zinc-400 outline-hidden transition-all"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="bg-transparent border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-zinc-400 outline-hidden transition-all"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="w-full mt-4 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300"
                            type="submit"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-center gap-2 pb-8 pt-4">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-zinc-900 dark:text-zinc-50 font-semibold hover:underline transition-all">
                        Sign In
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
