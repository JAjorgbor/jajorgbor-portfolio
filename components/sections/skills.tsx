"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SKILLS } from "@/lib/data";

export function Skills() {
  // Group skills by category
  const categories = ["Frontend", "Backend", "Tools"];
  const groupedSkills = categories.reduce(
    (acc, cat) => {
      acc[cat] = SKILLS.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<string, typeof SKILLS>,
  );

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
            Technical Ecosystem
          </motion.h2>
          <motion.p
            className="text-neutral-400 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A structured breakdown of my core competencies across the full
            development stack.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="flex flex-col p-6 rounded-2xl bg-neutral-950 border border-neutral-800"
            >
              <h3 className="text-lg font-bold text-neutral-100 mb-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                {category === "Tools" ? "Tools & Infrastructure" : category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {groupedSkills[category]?.map((skill) => (
                  <div
                    key={skill.name}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-colors"
                  >
                    {skill.name}
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
