import React from 'react';

import { Button } from '@material-ui/core';

const noop = e => e.preventDefault();

const CustomButton = React.forwardRef((props, ref) => (
  <Button
    href="#"
    innerRef={ref}
    variant="outlined"
    color="secondary"
    onClick={noop}
    {...props}
  />
));

CustomButton.displayName = 'CustomButton';

export default CustomButton;
