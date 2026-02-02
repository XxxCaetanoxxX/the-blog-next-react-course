import Link from "next/link";
import Image from "next/image";

type PostCoverImageProps = {
    url?: string;
    imageSrc?: string;
    imageAlt?: string;
}

export function PostCoverImage({url, imageSrc = "/images/bryen_0.png", imageAlt = "Logo"}: PostCoverImageProps) {
    return (
        <Link href={url || "#"} className="w-full h-full overflow-hidden rounded-xl">
            <Image
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                src={imageSrc}
                alt={imageAlt}
                width={1200}
                height={720}
                priority={true}
            />
        </Link>
    )
}