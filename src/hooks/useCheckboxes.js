import { graphql, useStaticQuery } from 'gatsby';

export const useCheckboxes = () => {
  const { allFormField: { nodes: fields } } = useStaticQuery(graphql`
    query {
      allFormField(filter: {attributes: {type: {eq: "checkbox"}}}) {
        nodes {
          attributes {
            type
            placeholder
            pattern
            label
            id
          }
        }
      }
    }
  `);

  return fields.map(({ attributes }) => attributes);
};

export default useCheckboxes;
