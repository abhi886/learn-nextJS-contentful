import { createClient } from "contentful";
import ReceipeCard from "../components/ReceipeCard";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "recipe" });

  return {
    props: {
      receipes: res.items,
      revalidate: 1,
    },
  };
}
export default function Recipes({ receipes }) {
  console.log(receipes);
  return (
    <div className='recipe-list'>
      {receipes.map((receipe) => (
        <ReceipeCard key={receipe.sys.id} receipe={receipe}></ReceipeCard>
      ))}
    </div>
  );
}
