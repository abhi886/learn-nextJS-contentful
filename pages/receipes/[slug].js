import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../components/Skeleton";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export async function getStaticPaths() {
  const res = await client.getEntries({
    content_type: "recipe",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      receipes: items[0],
    },
    revalidate: 10,
  };
}
export default function RecipeDetails({ receipes }) {
  if (!receipes) return <Skeleton></Skeleton>;

  const { featuredImage, title, cookingTime, ingredients, method } =
    receipes.fields;
  return (
    <div>
      <div className='banner'>
        <Image
          src={`https:${featuredImage.fields.file.url}`}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        ></Image>
        <h2>{title}</h2>
      </div>
      <div className='info'>
        <p>Take about {cookingTime} </p>
        <h3>Ingredients</h3>
        {ingredients.map((ing) => (
          <sppan key={ing}> {ing} </sppan>
        ))}
      </div>
      <div className='method'>
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>
    </div>
  );
}
