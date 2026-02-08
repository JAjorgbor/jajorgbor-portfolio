"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-neutral-950 text-neutral-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-50">
              Projects
            </h2>
            <p className="mt-4 text-neutral-400 max-w-lg">
              A collection of projects that define my journey in engineering and
              product design.
            </p>
          </div>
          {/* <Button
            variant="link"
            className="text-neutral-50 p-0 h-auto gap-2 group hidden md:flex"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button> */}
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 transition-colors hover:border-neutral-700"
            >
              {/* Image Placeholder */}
              <Image
                src={project.thumbnail}
                alt={project.title}
                width={500}
                height={300}
                className="aspect-video object-cover"
              />

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] py-0 h-5 text-neutral-400 border-neutral-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-tighter">
                    {project.year}
                  </span>
                </div>

                <div className="mb-2">
                  <div className="text-[11px] font-bold text-amber-500 uppercase tracking-widest mb-1">
                    {project.role}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-50 group-hover:text-white transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                      <span className="absolute inset-0" />
                      {project.title}
                    </Link>
                  </h3>
                </div>

                <p className="text-sm text-neutral-400 line-clamp-2 mb-4">
                  {project.description}
                </p>

                <div className="space-y-1 mb-6">
                  {project.metrics?.slice(0, 2).map((m, i) => (
                    <div
                      key={i}
                      className="text-[11px] text-neutral-500 flex items-center gap-2"
                    >
                      <div className="h-1 w-1 rounded-full bg-neutral-700" />
                      {m}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 flex items-center text-xs font-semibold uppercase tracking-wider text-neutral-500 border-t border-neutral-800">
                  <span className="group-hover:text-neutral-300 transition-colors">
                    Case Study
                  </span>
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-all group-hover:translate-x-1 group-hover:text-neutral-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <div className="mt-12 md:hidden flex justify-center">
          <Button variant="outline" className="gap-2 w-full text-neutral-50">
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div> */}
      </Container>
    </section>
  );
}
