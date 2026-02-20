"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitForm } from "@linkpane/sdk";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  Message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setError(null);
    try {
      console.log("Form Data:", data);
      await submitForm({
        apiBaseUrl: "https://api.linkpane.com/v2",
        slug: "portfolio-website-contact-form",
        data,
        pid: "42770138",
      });
      setIsSubmitted(true);
      reset();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong. Please try again later.");
    }
  };

  return (
    <section
      id="contact"
      className="py-32 bg-neutral-950 text-neutral-50 border-t border-neutral-800 relative overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8">
              Let&apos;s build something{" "}
              <span className="text-amber-500">exceptional.</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-12 max-w-lg">
              Currently open to full-time roles and select contract
              opportunities where I can contribute to building thoughtful,
              well-engineered products.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:joshuaajorgbor@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 bg-neutral-900 rounded-lg group-hover:bg-neutral-800 border border-neutral-800 transition-colors">
                  <Mail className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
                    Email
                  </div>
                  <div className="text-neutral-200 group-hover:text-amber-500 transition-colors">
                    joshuaajorgbor@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/+2349035784325"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 bg-neutral-900 rounded-lg group-hover:bg-neutral-800 border border-neutral-800 transition-colors">
                  <div className="h-6 w-6 flex items-center justify-center font-bold text-amber-500">
                    <span className="text-lg">
                      <MessageSquare />
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
                    Chat With Me
                  </div>
                  <div className="text-neutral-200 group-hover:text-amber-500 transition-colors">
                    +234 903 578 4325
                  </div>
                </div>
              </a>

              <div className="flex gap-4 mt-6">
                {[
                  {
                    icon: Github,
                    href: "https://github.com/jajorgbor",
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com/in/jajorgbor",
                    label: "LinkedIn",
                  },
                  // {
                  //   icon: Twitter,
                  //   href: "https://twitter.com/jajorgbor",
                  //   label: "Twitter",
                  // },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors border border-neutral-800"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6 text-neutral-400 hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 relative"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full space-y-4 py-12"
              >
                <div className="h-16 w-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-neutral-400 max-w-sm">
                  Thank you for reaching out. I&apos;ll get back to you within
                  24-48 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 text-white hover:text-black border-neutral-700"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="text-sm text-red-400 font-medium">
                      {error}
                    </div>
                  </motion.div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="block">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...register("firstName")}
                      className={`rounded-xl ${
                        errors.firstName
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="block">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...register("lastName")}
                      className={`rounded-xl ${
                        errors.lastName
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500 font-medium">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className={`rounded-xl ${
                      errors.email
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    {...register("Message")}
                    className={`rounded-xl ${
                      errors.Message
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.Message && (
                    <p className="text-xs text-red-500 font-medium">
                      {errors.Message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl py-4 transition-all disabled:opacity-70"
                  isLoading={isSubmitting}
                >
                  {!isSubmitting && <Send className="mr-2 h-5 w-5" />}
                  Send Message
                </Button>

                <p className="text-center text-xs text-neutral-500">
                  Powered By{" "}
                  <a
                    href="https://linkpane.com/mailer-forms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:text-amber-600 transition-colors"
                  >
                    Linkpane Mailer Forms
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
