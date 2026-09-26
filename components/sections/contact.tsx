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
  Dribbble,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { saveContactSubmission } from "@/lib/actions/contact";
import type { ContactContent, SiteSettings } from "@/sanity/lib/types";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  Message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  dribbble: Dribbble,
  website: Globe,
};

interface ContactProps {
  content?: ContactContent | null;
  settings?: SiteSettings | null;
}

export function Contact({ content, settings }: ContactProps) {
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
    const { website, ...fields } = data;

    // Save to Sanity and forward to Linkpane (email notification) in parallel;
    // the message counts as delivered if either one succeeds.
    const [saved, forwarded] = await Promise.allSettled([
      saveContactSubmission(data),
      website
        ? Promise.resolve()
        : submitForm({
            apiBaseUrl: "https://api.linkpane.com/v2",
            slug: "portfolio-website-contact-form",
            data: fields,
            pid: "42770138",
          }),
    ]);

    const savedOk = saved.status === "fulfilled" && saved.value.ok;
    if (savedOk || forwarded.status === "fulfilled") {
      setIsSubmitted(true);
      reset();
      return;
    }

    console.error(saved, forwarded);
    setError(
      (saved.status === "fulfilled" && !saved.value.ok && saved.value.error) ||
        "Something went wrong. Please try again later.",
    );
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
              {content?.heading}{" "}
              <span className="text-amber-500">{content?.headingAccent}</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-12 max-w-lg">
              {content?.body}
            </p>

            <div className="space-y-6">
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
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
                      {settings.email}
                    </div>
                  </div>
                </a>
              )}

              {settings?.chatUrl && (
                <a
                  href={settings.chatUrl}
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
                      {settings.chatLabel ?? "Chat With Me"}
                    </div>
                    <div className="text-neutral-200 group-hover:text-amber-500 transition-colors">
                      {settings.phoneDisplay}
                    </div>
                  </div>
                </a>
              )}

              <div className="flex gap-4 mt-6">
                {settings?.socials?.map((social) => {
                  const Icon = SOCIAL_ICONS[social.platform] ?? Globe;
                  return (
                    <a
                      key={social._key}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors border border-neutral-800"
                      aria-label={social.platform}
                    >
                      <Icon className="h-6 w-6 text-neutral-400 hover:text-white transition-colors" />
                    </a>
                  );
                })}
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
                <h3 className="text-2xl font-bold text-white">
                  {content?.successTitle ?? "Message Sent!"}
                </h3>
                <p className="text-neutral-400 max-w-sm">
                  {content?.successMessage}
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
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  {...register("website")}
                />
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
