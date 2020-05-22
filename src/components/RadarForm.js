import React, { useState } from 'react';
import styled from 'styled-components';
import Checkbox from './commons/Checkbox';
import { SubmitButton, ButtonSelector } from './TechForm';
import { useDispatch, useSelector } from 'react-redux';
import { addRadar, updateTechRadar } from '../redux/actions/radar.action';
import { setModal } from '../redux/actions/gui.action';

const communityNames = [
  'Architecture',
  'Cloud',
  'CRM',
  'Cybersecurity',
  'Data Management',
  'Data Protection and Privacy',
  'Data Science and Artificial Intelligence',
  'DevOps',
  'Java',
  'Engagement Management',
  'Frontend',
  'Insights and Data Advisory',
  'Intelligent Automation',
  'Microsoft Developers',
  'Oracle ERP',
  'Reporting and Visualization',
  'SAP ERP',
  'Sogeti QA and Testing',
  'User Experience',
];

const RadarForm = () => {
  const dispatch = useDispatch();
  const { techList } = useSelector(state => state.radar);
  const initialRadarForm = { id: '', description: '', isPublic: false };
  const [radarForm, setRadarForm] = useState(initialRadarForm);
  const [year, setYear] = useState(Number(new Date().getFullYear()));
  const [cop, setCop] = useState('Architecture');
  const [mergeTech, toggleMergeTech] = useState(false);
  const disabled = !radarForm.id.length;
  const publicName = `${cop}-${year}`;

  const handleChange = (e) => {
    e.preventDefault();
    setRadarForm({ ...radarForm, [e.target.name]: e.target.value });
    console.log(radarForm);
  };

  const handleTogglePublicRadar = () => {
    const newState = !radarForm.isPublic;
    if (newState) toggleMergeTech(true);
    setRadarForm({
      id: newState ? publicName : '',
      description: radarForm.description,
      isPublic: newState,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return alert('Add a name to your Radar');
    const techListBeforeReset = [...techList]
    try {
      const radarResponse = await dispatch(addRadar({
        id: radarForm.isPublic ? publicName : radarForm.id,
        description: radarForm.description,
        isPublic: radarForm.isPublic,
      }));
      if (mergeTech) {
        await dispatch(updateTechRadar(radarResponse.data.createRadar, techListBeforeReset));
      }
      setRadarForm(initialRadarForm);
      toggleMergeTech(false);
      dispatch(setModal(null))
    } catch (err) {}
  };

  return (
    <StyledRadarForm onSubmit={handleSubmit}>
      <h1>Add Radar</h1>
      <p>Radar name must be unique</p>
      {radarForm.isPublic ? (
        <>
          <select name="cop" onChange={(e) => setCop(e.target.value)}>
            {communityNames.map((cop) => {
              return <option key={cop} value={cop.replace(/\s+/g, '-')}>{cop}</option>;
            })}
          </select>
          <h5>Year</h5>
          <YearSelector currentYear={year} setYear={setYear} />
        </>
      ) : (
        <input
          type="text"
          autoFocus={true}
          value={radarForm.id}
          name="id"
          onChange={handleChange}
          placeholder="name *"
        />
      )}

      <input
        type="text"
        value={radarForm.description}
        name="description"
        onChange={handleChange}
        placeholder="description"
      />
      <Checkbox
        onChange={handleTogglePublicRadar}
        checked={radarForm.isPublic}
        label="Make public radar"
      />
      {radarForm.isPublic && (
        <p>
          Radar will be added to the public API with a page{' '}
          <Highlighted>"https://cop-tech-radar.com/{publicName}"</Highlighted> for read-only access.
          This can be used to browse the other CoP radars.
        </p>
      )}
      <Checkbox
        onChange={() => toggleMergeTech(!mergeTech)}
        checked={mergeTech}
        label="Create Radar with Technology from selected radars?"
      />
      {mergeTech && (
        <p>
          Using this option will move all Tech in the list to the left to the new Radar you're
          creating.
        </p>
      )}

      <SubmitButton _disabled={disabled} type="submit">
        Submit
      </SubmitButton>
    </StyledRadarForm>
  );
};

export default RadarForm;

const YearSelector = ({ currentYear, setYear }) => {
  return (
    <ButtonSelector>
      <button type="button" onClick={() => setYear(currentYear - 1)} name={currentYear}>
        {currentYear - 1}
      </button>
      <button
        type="button"
        onClick={() => setYear(currentYear)}
        name={currentYear}
        className={'current'}>
        {currentYear}
      </button>
      <button type="button" onClick={() => setYear(currentYear + 1)} name={currentYear}>
        {currentYear + 1}
      </button>
    </ButtonSelector>
  );
};

const Highlighted = styled.span`
  background: ${(props) => props.theme.default.primaryColor};
`;
const StyledRadarForm = styled.form`
  display: flex;
  flex-direction: column;


  input,
  select {
    padding: 12px;
    width: 100%;
    margin-bottom: 10px;
    background: ${(props) => props.theme.default.lightColor};
  }
  input {
    padding: 12px 6px;
    background: transparent;
    color: white;
    border: 1px solid ${(props) => props.theme.default.lightColor};
  }
  input::placeholder {
    color: ${(props) => props.theme.default.grayColor};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
