import React from 'react';
import styled from 'styled-components';

function Checkbox({ onChange, checked, label }) {
  return (
    <Styled onClick={() => onChange(!checked)}>
      <input type="checkbox" onChange={() => {}} checked={checked} />
      <label>{label}</label>
    </Styled>
  );
}

export default Checkbox;

const Styled = styled.div`
  label {
    font-size: 14px;
  }
  margin-bottom: 10px;
  display: flex;
  > input {
    opacity: 0;
    display: none;
  }
  > input + label {
    position: relative; /* permet de positionner les pseudo-éléments */
    padding-left: 25px; /* fait un peu d'espace pour notre case à venir */
    cursor: pointer; /* affiche un curseur adapté */
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 1px;
      width: 17px;
      height: 17px; /* dim. de la case */
      border: 1px solid #aaa;
      background: #f8f8f8;
      border-radius: 3px; /* angles arrondis */
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3); /* légère ombre interne */
    }
    &:after {
      content: '✔';
      position: absolute;
      top: -8px;
      left: 2px;
      font-size: 24px;
      color: ${(props) => props.theme.default.primaryColor};
      transition: all 0.2s; /* on prévoit une animation */
    }
  }
  > input:not(:checked) + label {
    &:after {
      opacity: 0; /* coche invisible */
      transform: scale(0); /* mise à l'échelle à 0 */
    }
  }
  > input:disabled:not(:checked) + label {
    &:before {
      box-shadow: none;
      border-color: #bbb;
      background-color: #ddd;
    }
  }
  > input:checked + label {
    &:after {
      opacity: 1; /* coche opaque */
      transform: scale(1); /* mise à l'échelle 1:1 */
    }
  }
  > input:disabled:checked + label {
    &:after {
      color: #999;
    }
  }
  > input:disabled + label {
    color: #aaa;
  }
  > input:checked:focus + label,
  input:not(:checked):focus + label {
    &:before {
      border: 1px dotted blue;
    }
  }
`;
