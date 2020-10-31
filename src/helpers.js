export const asBookmarklet = str => {
  const code = str;
  const codeURL = encodeURIComponent(`(() => {${code}})()`);
  return `javascript:${codeURL}`;
};

export const getSource = (fields, checkboxes, send = true) =>
  `const fields = ${JSON.stringify(fields, null, 2)};

const checkboxes = ${JSON.stringify(checkboxes, null, 2)};

Object.entries(fields).forEach(
  ([field, value]) => document.querySelector('#' + field).value = value
);

checkboxes.forEach(
  checkbox => document.querySelector('#' + checkbox).checked = 'checked'
);

${send ? 'document.querySelector(\'#generate-btn\').click();' : ''}
`;

export const formToJSON = form =>
  Array.from(form.querySelectorAll('input'))
    .reduce((data, element) => {
      if (!element.value) { return data; }
      return {
        ...data,
        [element.id]: element.value,
      };
    }, {});
