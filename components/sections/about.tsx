"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { PortableText } from "next-sanity";
import { Badge } from "@/components/ui/badge";
import type {
  AboutContent,
  Education,
  Experience,
} from "@/sanity/lib/types";

interface AboutProps {
  content?: AboutContent | null;
  experience: Experience[];
  education: Education[];
}

export function About({ content, experience, education }: AboutProps) {
  return (
    <section
      id="about"
      className="py-24 bg-neutral-950 text-neutral-50 relative overflow-hidden"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">
              {content?.heading} <br />
              <span className="text-neutral-500">{content?.headingMuted}</span>
            </h2>
            <div className="prose prose-invert prose-lg text-neutral-400">
              {content?.body && <PortableText value={content.body} />}
            </div>

            <div className="mt-16">
              <h3 className="text-xl font-semibold mb-8 border-b border-neutral-800 pb-2 flex items-center justify-between">
                Education
              </h3>
              <div className="space-y-8">
                {education.map((edu) => (
                  <div key={edu._id} className="group">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                      <h4 className="text-lg font-bold text-neutral-100 group-hover:text-amber-500 transition-colors">
                        {edu.degree}
                      </h4>
                      <span className="text-xs text-neutral-500 font-mono">
                        {edu.period}
                      </span>
                    </div>
                    <div className="text-sm text-neutral-400 font-medium mb-4">
                      {edu.school} ·{" "}
                      <span className="text-neutral-500">{edu.location}</span>
                    </div>
                    <ul className="space-y-2">
                      {edu.achievements?.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-sm text-neutral-500 flex items-start gap-3"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/30" />
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-xl font-semibold mb-8 border-b border-neutral-800 pb-2 flex items-center justify-between">
                Professional Experience
                {content?.experienceBadge && (
                  <Badge
                    variant="outline"
                    className="text-[10px] text-neutral-500"
                  >
                    {content.experienceBadge}
                  </Badge>
                )}
              </h3>
              <div className="space-y-12">
                {experience.map((job) => (
                  <div key={job._id} className="relative pl-0 group">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 gap-2">
                      <div>
                        <h4 className="text-lg font-bold text-neutral-100 group-hover:text-amber-500 transition-colors">
                          {job.role}
                        </h4>
                        <div className="text-sm text-neutral-400 font-medium">
                          {job.company} ·{" "}
                          <span className="text-neutral-500">{job.type}</span>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-500 font-mono whitespace-nowrap bg-neutral-900/50 px-2 py-1 rounded border border-neutral-800">
                        {job.period}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-400 mb-4 leading-relaxed italic border-l-2 border-neutral-800 pl-4 py-1">
                      {job.description}
                    </p>

                    <ul className="space-y-2">
                      {job.achievements?.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-sm text-neutral-500 flex items-start gap-3"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/50" />
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
