import {sanityClient, createClient} from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export  const client = createClient({
    projectId: 'e3ctx0qm',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: 'true',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source);