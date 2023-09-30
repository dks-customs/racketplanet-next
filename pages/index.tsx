import { GetStaticProps } from "next";
import Layout from "../components/layout";
import { getAllPostsForHome } from "../lib/api";
import Meta from "../components/meta/meta";
import { Button } from "react-bootstrap";

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);

  return (
    <Layout preview={preview}>
      <Meta
        titleFollowUp={"Centrum Sportów Rakietowych"}
        canonical={process.env.NEXT_PUBLIC_HOME_CANONICAL}
        twitterCard="summary"
      />
      <main className="index">Main</main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);

  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
};
