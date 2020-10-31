import React from 'react';
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
import MDBlock from '../components/MDBlock';
import SourceCode from '../components/SourceCode';

import useFields from '../hooks/useFields';
import useCheckboxes from '../hooks/useCheckboxes';

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
    <Layout>
      <MDBlock block="intro" />

      <Paper className={classes.paper}>
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

      <Paper className={classes.final}>
        <Box className={classes.buttons}>
          <CustomButton ref={setHref}>Pré-remplir</CustomButton>

          <CustomButton ref={setHref}>Remplir mon attestation</CustomButton>

          {Object.values(fields).shift() && (
            <CustomButton ref={setHref}>
              {Object.values(fields).shift()}
            </CustomButton>
          )}
        </Box>

        <Typography variant="body2" className={classes.sourceLabel} paragraph>
          Il est inutile de cliquer sur ces boutons.
          <br />
          Il faut en <strong>glisser/déposer</strong> un dans la barre de raccourcis du navigateur
          web pour y insérer ce bookmarklet.
          <br />
          Il suffit ensuite de se rendre sur le formulaire d'attestation et de cliquer dessus.
        </Typography>
      </Paper>

      <Paper className={classes.source}>
        <SourceCode content={getSource(fields, selectedCheckboxes, send)} />
      </Paper>
    </Layout>
  );
};

export default Home;
