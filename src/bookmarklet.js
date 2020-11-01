{
  const form = document.querySelector('form');

  /**
   * Return form element checked status OR value.
   *
   * @param element Form field
   */
  const adjustValue = ({ type, checked, value }) =>
    (type === 'checkbox' ? checked === true : value);

  /**
   * Return an object containing element id and value,
   * only if value of the element is truthy
   *
   * @param element Form field
   */
  const elementValue = element => (
    adjustValue(element)
      ? { [element.id]: adjustValue(element) }
      : {}
  );

  /**
   * Return all filled field from given form
   *
   * @param wrapper Form element
   */
  const formToJSON = wrapper =>
    Array.from(wrapper.querySelectorAll('input'))
      .reduce((data, element) => (
        element.value
          ? { ...data, ...elementValue(element) }
          : data
      ), {});

  /**
   * Prepend given string with bookmarklet script requirements
   */
  const asBookmarklet = string => {
    const codeURL = encodeURIComponent(`(() => {${string}})()`);
    return `javascript:${codeURL}`;
  };

  /**
   * Return the source script of the future bookmarklet
   */
  const getSource = (fields = {}, checkboxes = []) => (`
    const fields = ${JSON.stringify(fields, null, 2)};
    const checkboxes = ${JSON.stringify(checkboxes, null, 2)};

    Object.entries(fields).forEach(
      ([field, value]) => document.querySelector('#' + field).value = value
    );

    checkboxes.forEach(
      checkbox => document.querySelector('#' + checkbox).checked = 'checked'
    );`
  );

  /**
   * Build link and the explanation text on page bottom
   *
   * @param href Full minified source of the bookmarklet
   * @param title Title to give to the bookmarklet
   */
  const buildLink = (href, title) => {
    /**
     * Delete previous instance
     */
    const previousWrapper = document.querySelector('.bookmarklet-wrapper');
    previousWrapper?.parentElement?.removeChild(previousWrapper);

    /**
     * Create Button for filling the form
     */
    const submitButton = document.querySelector('#generate-btn');

    const wrapper = document.createElement('div');
    wrapper.classList.add('bookmarklet-wrapper', 'mt-3');
    wrapper.innerHTML = `
      <p>
        Pour pouvoir <strong>réutiliser</strong> cette saisie, <br>
        vous pouvez faire glisser le lien ci dessous <br />
        vers la barre de raccourcis de votre navigateur&nbsp;:
      </p>`;

    const a = document.createElement('a');
    a.textContent = title;
    a.classList.add('btn', 'btn-primary', 'mt-3');
    a.href = href;

    wrapper.appendChild(a);
    submitButton.parentElement.appendChild(wrapper);
  };

  /**
   * Manage form change event
   */
  const handleFormChange = () => {
    const formEntries = Object.entries(formToJSON(form));

    /**
     * Build object of field values
     */
    const fields = formEntries.reduce((acc, [key, value]) => (
      (typeof value !== 'boolean') ? { ...acc, [key]: value } : acc
    ), {});

    /**
     * Build array of checkbox ids
     */
    const checkboxes = formEntries.reduce((acc, [key, value]) => (
      (typeof value === 'boolean') ? [...acc, key] : acc
    ), []);

    /**
     * Get script of future bookmarklet
     */
    const bookmarkletSource = asBookmarklet(getSource(fields, checkboxes));

    buildLink(
      bookmarkletSource,
      fields['field-firstname'] || 'Remplir l\'attestation',
    );
  };

  form.addEventListener('input', handleFormChange);

  buildLink('', 'Remplir l\'attestation');
}
