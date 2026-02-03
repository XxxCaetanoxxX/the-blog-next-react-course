import { PostCoverImage } from "../PostCoverImage";
import { PostHeading } from "../PostHeading";
import { PostSummary } from "../PostSummary";

export function PostFeatured() {
    const slug = 'qualquer'
    const postLink = `/post/${slug}`
    return (
        <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">

            <PostCoverImage imageSrc="/images/bryen_5.png" imageAlt="Bryen 5" url={postLink} />

            <PostSummary
                postLink={postLink}
                postHeading="h1"
                createdAt={'2024-06-01T10:00:00Z'}
                title={'Post Destaque: Explorando o Bryen 5'}
                excerpt={'Descubra as funcionalidades e inovações do Bryen 5, o mais recente lançamento em tecnologia de ponta.'}
            />
        </section>
    )
}