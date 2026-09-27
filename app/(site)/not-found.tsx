import { MetaLink } from "@/components/site/meta";
import { getSettings } from "@/sanity/lib/fetch";

export default async function NotFound() {
  const settings = await getSettings();

  return (
    <div data-scene="theatre" className="grid-12 page-x min-h-svh content-center gap-y-10 bg-bg py-32 text-ink">
      <p data-reveal="cut" className="meta col-span-12 text-ink-3 lg:col-span-2">
        404
      </p>
      <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
        <h1 data-reveal="lines" className="display text-step-5">
          <em>{settings?.notFoundLine ?? "Not found."}</em>
        </h1>
        <div data-reveal="cut" data-delay="0.9" className="mt-12">
          <MetaLink href="/">Back to start</MetaLink>
        </div>
      </div>
    </div>
  );
}
