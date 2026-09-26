"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import type { SectionIntro, SkillCategory } from "@/sanity/lib/types";

interface SkillsProps {
  content?: SectionIntro | null;
  categories: SkillCategory[];
}

export function Skills({ content, categories }: SkillsProps) {
  return (
    <section
      id="skills"
      className="py-24 bg-neutral-900 border-t border-neutral-800"
    >
      <Container>
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-neutral-50 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {content?.heading}
          </motion.h2>
          <motion.p
            className="text-neutral-400 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {content?.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="flex flex-col p-6 rounded-2xl bg-neutral-950 border border-neutral-800"
            >
              <h3 className="text-lg font-bold text-neutral-100 mb-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills?.map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
