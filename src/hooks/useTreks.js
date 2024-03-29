import { graphql, useStaticQuery } from "gatsby";

const useTreks = () => {
  const { allContentfulTrek } = useStaticQuery(graphql`
    query {
      allContentfulTrek {
        edges {
          node {
            activities
            inCamp
            name
            description {
              description
            }
          }
        }
      }
    }
  `);

  return allContentfulTrek.edges;
};

export default useTreks;