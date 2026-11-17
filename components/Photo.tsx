import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Camera } from "lucide-react";

/**
 * PHOTO SLOTS for Tyler's real job photos.
 *
 * Every image area on the site is a slot with:
 *   - a kind (what type of photo goes here),
 *   - a shot description (what to take), and
 *   - a filename.
 *
 * To fill a slot, save the photo as public/photos/<file> and rebuild.
 * If the file exists, the real photo renders. If not, the labeled slot shows.
 * Landscape JPGs at least 1600px wide work best. Don't use stock photos.
 */

export type PhotoKind = "before-after" | "truck-trailer" | "finished-lawn" | "on-the-job";

const KIND_LABEL: Record<PhotoKind, string> = {
  "before-after": "Before & after",
  "truck-trailer": "Truck & trailer",
  "finished-lawn": "Finished lawn",
  "on-the-job": "On the job",
};

function photoExists(file: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "photos", file));
  } catch {
    return false;
  }
}

type PhotoProps = {
  kind: PhotoKind;
  file: string;
  /** What Tyler should shoot. Also used as alt text once the photo exists, so describe the scene. */
  shot: string;
  /** CSS aspect-ratio. Pass "" and use className aspect utilities for responsive ratios. */
  ratio?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export function Photo({ kind, file, shot, ratio = "4/3", sizes = "(min-width: 1024px) 50vw, 100vw", className = "", priority }: PhotoProps) {
  const style = ratio ? { aspectRatio: ratio } : undefined;

  if (photoExists(file)) {
    return (
      <div style={style} className={`relative overflow-hidden bg-evergreen-700 ${className}`}>
        <Image src={`/photos/${file}`} alt={shot} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  // Grid stack: the spacer holds the aspect ratio as a *minimum*, and the
  // content layer can grow past it in narrow columns instead of overflowing.
  return (
    <div
      data-ph="photo"
      role="img"
      aria-label={`Photo slot for Tyler's ${KIND_LABEL[kind].toLowerCase()} photo: ${shot}`}
      className={`photo-slot grid grid-cols-[minmax(0,1fr)] ${className}`}
    >
      <div aria-hidden style={style} className="col-start-1 row-start-1 min-h-[160px]" />
      <div className="col-start-1 row-start-1 flex min-w-0 flex-col justify-between gap-3 p-3 [overflow-wrap:anywhere] sm:p-5">
        <p className="label-caps flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem]">
          <span className="photo-slot-chip px-2 py-1">Photo slot</span>
          <span>{KIND_LABEL[kind]}</span>
        </p>
        <div className="flex items-start gap-3">
          <Camera aria-hidden size={22} strokeWidth={2} className="mt-0.5 hidden shrink-0 opacity-70 sm:block" />
          <p className="max-w-[34ch] text-[0.9rem] leading-snug sm:text-[0.95rem]">{shot}</p>
        </div>
        <p className="break-all font-mono text-[0.68rem] leading-tight opacity-80">public/photos/{file}</p>
      </div>
    </div>
  );
}

/** Same-angle before/after pair. The two files are named <base>-before.jpg and <base>-after.jpg. */
export function BeforeAfter({
  base,
  before,
  after,
  ratio = "3/4",
  className = "",
}: {
  base: string;
  before: string;
  after: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      <figure>
        <Photo kind="before-after" file={`${base}-before.jpg`} shot={before} ratio={ratio} sizes="(min-width: 1024px) 25vw, 50vw" />
        <figcaption className="label-caps mt-2">Before</figcaption>
      </figure>
      <figure className="mt-8 sm:mt-10">
        <Photo kind="before-after" file={`${base}-after.jpg`} shot={after} ratio={ratio} sizes="(min-width: 1024px) 25vw, 50vw" />
        <figcaption className="label-caps mt-2">After</figcaption>
      </figure>
    </div>
  );
}
