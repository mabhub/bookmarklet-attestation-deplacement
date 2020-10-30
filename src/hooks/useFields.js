import { graphql, useStaticQuery } from 'gatsby';

export const useFields = () => {
  const { allFormField: { nodes: fields } } = useStaticQuery(graphql`
    query {
      allFormField(filter: {
        attributes: {
          type: { ne: "checkbox" }
          id: { nin: ["field-heuresortie", "field-datesortie"] }
        }
      }) {
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

export default useFields;
