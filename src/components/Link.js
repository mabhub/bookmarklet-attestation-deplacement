import React from 'react';
import { Link } from '@material-ui/core';
import { Link as GLink } from 'gatsby';

const CustomLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} component={GLink} {...props} />
));

export default CustomLink;
