"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { authClient, signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
    const router = useRouter();

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate: handleSignIn, isPending: isSigningIn } = useMutation({
        mutationFn: async (values: SignInFormValues) => {
            const { data, error } = await signIn.email({
                email: values.email,
                password: values.password,
            });

            if (error) {
                throw new Error(error.message || "Invalid credentials");
            }
            return data;
        },
        onSuccess: () => {
            toast.success("Welcome back!");
            router.push("/interface");
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const handleGithubSignIn = async () => {
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
                <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
                <CardDescription className="text-center">Enter your email below to access your account</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 px-8">
                <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline" onClick={handleGithubSignIn} className="w-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200">
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
                    <form onSubmit={form.handleSubmit((v) => handleSignIn(v))} className="space-y-4">
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
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Password</FormLabel>
                                        <Link href="/forgot-password" className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                                            Forgot password?
                                        </Link>
                                    </div>
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
                            disabled={isSigningIn}
                        >
                            {isSigningIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-center gap-2 pb-8 pt-4">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-zinc-900 dark:text-zinc-50 font-semibold hover:underline transition-all">
                        Sign Up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
