import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import { usePortal } from '../../helper';
import Icon, { ICON_TYPES } from '../../assets/icons/IconComponent';
import styled from 'styled-components';


export const MODAL_TYPES = {
  TECH_FORM: "TECH_FORM",
  RADAR_FORM: "RADAR_FORM",
  ABOUT: "ABOUT",
  USER_MANAGEMENT: "USER_MANAGEMENT",

}

const modalVariants = {
  enter: {
    y: '0%',

    opacity:1,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: .5,
    },
  },
  exit:{
    y: '100%',
    opacity:0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: .5,
    },
  }
}

const Modal = ({
  size,
  hideClose,
  bottom,
  rounded,
  children,
  color,
  open,
  background,
  toggleModal,
  scrollable,
  headerColor,
  noPadding,
}) => {
  const target = usePortal('modal-root');

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <StyledModal

          scrollable={!!scrollable}
          color={color}
          background={background}
          key={`modal`}
          size={size}
          variants={modalVariants}
          exit= {"exit"}
          initial ={"exit"}
          animate={open ? "enter" : "exit"}
          noPadding={!!noPadding}
          bottom={!!bottom}
          rounded={!!rounded}>
          {!hideClose && (
            <Icon
              type={ICON_TYPES.CLOSE}
              size={'1.5rem'}
              absoluteRight
              stroke={'#fff'}
              onClick={() => toggleModal(false)}
              marginRight
            />
          )}

          <ModalContent marginTop={headerColor}>{children}</ModalContent>
        </StyledModal>
      )}
    </AnimatePresence>,
    target,
  );
};
export default withRouter(Modal);

export const ModalContent = styled.div`
  padding: 30px;
  height: 100%;
  overflow-y: auto;
  h1 {
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

export const StyledModal = styled(motion.div)`
  box-shadow: 5px 5px 500rem 500rem rgb(0, 0, 0, 0.5);
  position: fixed;
  overflow: hidden;
  bottom: 10vh;
  top: 10vh;
  left: calc(50% - 200px);
  width: 600px;
  z-index: 80;
  border-radius: .5em;
  background: ${(props) => props.background || props.theme.default.backgroundColor};
  color: ${(props) => props.color || props.theme.default.lightColor};
  background: ${(props) => props.theme.default.primaryColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  svg {
    stroke-width: 30px;
  }

  @media (max-width: 768px) {
    bottom: 75px;
    left: 20px;
    right: 20px;
    top: 20px;
    width: unset;
  }

  ${(props) =>
    props.bottom &&
    `
         justify-content: flex-end;
    `}

  * {
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background: ${(props) => props.theme.default.lightColor + `aa`};
      padding-top: 40px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      height: 30px;
      width: 8px;
      border: 1px solid white;
      background: ${(props) => props.theme.default.lightColor};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${(props) => props.theme.default.secondaryColor};
    }

    ::-webkit-scrollbar-track-piece {
      height: 30px;
      width: 30px;
    }
  }
`;
