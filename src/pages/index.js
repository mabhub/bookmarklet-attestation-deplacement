import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Link,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

import Layout from '../components/Layout';
import SourceCode from '../components/SourceCode';

import { getSource, asBookmarklet, formToJSON } from '../helpers';

const useStyles = makeStyles({
  paper: {
    padding: '0 1rem',
    margin: '1rem 0',
  },
  field: {
    marginTop: '1rem',
  },
  chip: {
    margin: '0 0.25rem',
  },
  final: {
    padding: '1rem',
    margin: '1rem 0',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '1rem',
  },
  sourceLabel: {
    textAlign: 'center',
  },
  source: {
    padding: '1rem',
    margin: '1rem 0',
    opacity: 0.25,
  },
});

const textFields = [
  '#field-firstname',
  '#field-lastname',
  '#field-birthday',
  '#field-placeofbirth',
  '#field-address',
  '#field-city',
  '#field-zipcode',
  // '#field-datesortie',
  // '#field-heuresortie',
];

const checkboxes = [
  '#checkbox-travail',
  '#checkbox-achats',
  '#checkbox-sante',
  '#checkbox-famille',
  '#checkbox-handicap',
  '#checkbox-sport_animaux',
  '#checkbox-convocation',
  '#checkbox-missions',
  '#checkbox-enfants',
];

const noop = e => e.preventDefault();

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

  return (
    <Layout>
      <Typography variant="h1" paragraph>
        Bookmarklet
      </Typography>

      <Typography variant="body1" paragraph>
        Ce formulaire génère un{' '}
        <Link href="https://fr.wikipedia.org/wiki/Bookmarklet">bookmarklet</Link>{' '}
        qui permet de remplir automatiquement le formulaire{' '}
        <Link href="https://media.interieur.gouv.fr/deplacement-covid-19/">d'Attestation de déplacement dérogatoire.</Link>
      </Typography>

      <Typography variant="body1">
        Ce site ne stocke ni ne traite aucune information.
      </Typography>

      <Typography variant="body1">
        Son code source est entièrement disponible
        sur <Link href="https://github.com/mabhub/bookmarklet-attestation-deplacement">Github</Link> et est automatiquement déployé
        sur <Link href="https://fr.wikipedia.org/wiki/Netlify">Netlify</Link>.
      </Typography>

      <Paper className={classes.paper}>
        <form onChange={handleFormChange}>
          {textFields.map(field => (
            <TextField
              className={classes.field}
              fullWidth
              id={field}
              key={field}
              label={field}
              variant="outlined"
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
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
          >
            {checkboxes.map(field => (
              <MenuItem key={field} value={field}>
                {field}
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

      <Paper className={classes.final}>
        <Box className={classes.buttons}>
          <Button
            href="#"
            variant="contained"
            color="primary"
            ref={setHref}
            onClick={noop}
          >
            Remplir mon attestation
          </Button>

          {Object.values(fields).shift() && (
            <Button
              href="#"
              variant="contained"
              color="primary"
              ref={setHref}
              onClick={noop}
            >
              {Object.values(fields).shift()}
            </Button>
          )}
        </Box>

        <Typography variant="body2" className={classes.sourceLabel}>
          Il est inutile de cliquer sur ces boutons.
          Il faut les glisser/déposer dans votre barre de raccourcis.
        </Typography>
      </Paper>

      <Paper className={classes.source}>
        <SourceCode content={getSource(fields, selectedCheckboxes, send)} />
      </Paper>
    </Layout>
  );
};

export default Home;
