import React from 'react';
import { navigate } from 'gatsby';
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import CustomButton from '../components/CustomButton';
import Layout from '../components/Layout';
import Link from '../components/Link';
import MDBlock from '../components/MDBlock';
import SourceCode from '../components/SourceCode';

import useFields from '../hooks/useFields';
import useCheckboxes from '../hooks/useCheckboxes';

import { getSource, asBookmarklet, formToJSON } from '../helpers';

const useStyles = makeStyles(theme => ({
  redirect: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderColor: theme.palette.secondary.main,
  },
  formWrapper: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(2, 0),
  },
  field: {
    marginTop: theme.spacing(2),
  },
  chip: {
    margin: '0 0.25rem',
  },
  buttonsWrapper: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: theme.spacing(2),
  },
  buttonsLegend: {
    textAlign: 'center',
  },
  sourceWrapper: {
    marginTop: theme.spacing(12),
    padding: theme.spacing(2, 2),
  },
  source: {
  },
}));

const Home = () => {
  const classes = useStyles();

  const [fields, setFields] = React.useState({});
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState([]);
  const [send, setSend] = React.useState(false);

  const handleSelectChange = event => setSelectedCheckboxes(event.target.value);
  const handleFormChange = event => setFields(formToJSON(event.currentTarget));
  const handleSendChange = event => setSend(event.target.checked);

  const bookmarklet = React.useMemo(
    () => asBookmarklet(getSource(fields, selectedCheckboxes, send)),
    [fields, selectedCheckboxes, send],
  );

  const setHref = React.useCallback(node => {
    // eslint-disable-next-line no-param-reassign
    if (node) { node.href = bookmarklet; }
  }, [bookmarklet]);

  const fieldsSchema = useFields();
  const checkboxes = useCheckboxes();

  return (
    <Layout title="Formulaire › Bookmarklet">
      <Paper
        button
        variant="outlined"
        className={classes.redirect}
        onClick={() => navigate('/simple')}
      >
        <Typography variant="body1">
          Une version <strong><Link color="secondary" to="/simple">plus simple</Link></strong> est
          maintenant <Link color="secondary" to="/simple">disponible ici</Link>.
        </Typography>
      </Paper>

      <MDBlock block="intro" />

      <Paper className={classes.formWrapper} variant="outlined">
        <form onChange={handleFormChange}>
          {fieldsSchema.map(({ id, label, ...rest }) => (
            <TextField
              className={classes.field}
              fullWidth
              id={id}
              key={id}
              label={label}
              variant="outlined"
              {...rest}
            />
          ))}
        </form>

        <FormControl fullWidth className={classes.field}>
          <InputLabel id="selectLabel">Cases du formulaire à cocher</InputLabel>
          <Select
            labelId="selectLabel"
            multiple
            className={classes.field}
            value={selectedCheckboxes}
            onChange={handleSelectChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value.split('-').pop()} className={classes.chip} />
                ))}
              </div>
            )}
          >
            {checkboxes.map(({ id }) => (
              <MenuItem key={id} value={id}>
                {id.split('-').pop()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth className={classes.field}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={send}
                onChange={handleSendChange}
                name="checkedB"
                color="primary"
              />
            )}
            label="Après le remplissage, envoyer le formulaire"
          />
        </FormControl>
      </Paper>

      <Paper className={classes.buttonsWrapper} variant="outlined">
        <Box className={classes.buttons}>
          <CustomButton ref={setHref}>Pré-remplir</CustomButton>

          <CustomButton ref={setHref}>Remplir mon attestation</CustomButton>

          {Object.values(fields).shift() && (
            <CustomButton ref={setHref}>
              {Object.values(fields).shift()}
            </CustomButton>
          )}
        </Box>

        <Typography variant="body2" className={classes.buttonsLegend} paragraph>
          Il est inutile de cliquer sur ces boutons.
          <br />
          Il faut en <strong>glisser/déposer</strong> un dans la barre de raccourcis du navigateur
          web pour y insérer ce bookmarklet.
          <br />
          Il suffit ensuite de se rendre sur le formulaire d'attestation et de cliquer dessus.
        </Typography>
      </Paper>

      <Paper className={classes.sourceWrapper} variant="outlined">
        <Typography variant="body1" className={classes.source} paragraph>
          Le code JavaScript ci-après correspond précisément à ce qui sera exécuté lors de
          l'utilisation du bookmarklet sur la page du formulaire d'attestation
        </Typography>

        <Paper variant="outlined">
          <SourceCode content={getSource(fields, selectedCheckboxes, send)} />
        </Paper>
      </Paper>
    </Layout>
  );
};

export default Home;
