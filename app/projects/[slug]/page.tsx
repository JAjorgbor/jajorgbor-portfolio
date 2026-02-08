import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Await params because in Next.js 15+ params is a Promise
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-amber-500/30">
      <div className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <Container className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="group flex items-center text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
          <div className="flex gap-4">
            <Button
              size="sm"
              variant="outline"
              className="hidden text-foreground sm:flex"
              disabled
            >
              <Github className="mr-2 h-4 w-4" /> Repo
            </Button>
            <Button size="sm" variant="primary" asChild>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Project Link
              </a>
            </Button>
          </div>
        </Container>
      </div>

      <Container className="py-20">
        <div className="mb-16 space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-neutral-700 text-neutral-400"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-white">
            {project.title}
          </h1>
          <p className="max-w-2xl text-xl text-neutral-400">
            {project.description}
          </p>

          <div className="grid grid-cols-2 gap-8 pt-8 sm:grid-cols-4 border-t border-neutral-800 mt-12">
            <div>
              <div className="text-sm font-medium text-neutral-500">Role</div>
              <div className="mt-1 text-neutral-200">{project.role}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-neutral-500">Year</div>
              <div className="mt-1 text-neutral-200">{project.year}</div>
            </div>
            <div className="col-span-2">
              <div className="text-sm font-medium text-neutral-500">Impact</div>
              <ul className="mt-1 list-disc list-inside text-neutral-200 space-y-1">
                {project.metrics?.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Project Content / Image */}
        <video
          controls
          className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl relative"
        >
          <source src={project.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="mt-24 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-semibold text-white sticky top-32">
              Development Overview
            </h3>
          </div>
          <div className="lg:col-span-2 prose prose-invert prose-lg text-neutral-400 ">
            {project.overview}
          </div>
        </div>

        <div className="mt-32 border-t border-neutral-900 pt-16 flex justify-between items-center">
          <Link
            href="/"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </Container>
    </article>
  );
}
