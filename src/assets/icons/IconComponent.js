import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ArrowRight } from './Icon_arrow_right.svg';
import { ReactComponent as ChevronDown } from './Icon_chevron_down.svg';
import { ReactComponent as ChevronLeft } from './Icon_chevron_left.svg';
import { ReactComponent as ChevronUp } from './Icon_chevron_up.svg';
import { ReactComponent as ChevronRight } from './Icon_chevron_right.svg';
import { ReactComponent as Close } from './Icon_close.svg';
import { ReactComponent as Menu } from './Icon_menu.svg';
import { ReactComponent as NordeaLogo } from './Icon_nordea_logo.svg';
import { ReactComponent as Notice } from './Icon_notice.svg';
import { ReactComponent as QuestionMark } from './Icon_questionmark.svg';
import { ReactComponent as SubMenu } from './Icon_submenu.svg';
import { ReactComponent as NextStep } from './Icon_next_step.svg';

import styled from 'styled-components';

export const ICON_TYPES = {
  CLOSE: 'CLOSE',
  ARROW_RIGHT: 'ARROW_RIGHT',
  CHEVRON_DOWN: 'CHEVRON_DOWN',
  CHEVRON_UP: 'CHEVRON_UP',
  CHEVRON_LEFT: 'CHEVRON_LEFT',
  CHEVRON_RIGHT: 'CHEVRON_RIGHT',
  MENU: 'MENU',
  NORDEA_LOGO: 'NORDEA_LOGO',
  NOTICE: 'NOTICE',
  QUESTION_MARK: 'QUESTION_MARK',
  NEXT_STEP: 'NEXT_STEP',
  SUB_MENU: 'SUB_MENU',
};
const Icon = ({
  type,
  onClick,
  size,
  width,
  fill,
  stroke,
  center,
  alignRight,
  alignLeft,
  absoluteRight,
  absoluteLeft,
}) => {
  const renderIcon = () => {
    switch (type) {
      case ICON_TYPES.ARROW_RIGHT:
        return <ArrowRight />;
      case ICON_TYPES.CHEVRON_DOWN:
        return <ChevronDown />;
      case ICON_TYPES.CHEVRON_LEFT:
        return <ChevronLeft />;
      case ICON_TYPES.CHEVRON_UP:
        return <ChevronUp />;
      case ICON_TYPES.CHEVRON_RIGHT:
        return <ChevronRight />;
      case ICON_TYPES.CLOSE:
        return <Close />;
      case ICON_TYPES.MENU:
        return <Menu />;
      case ICON_TYPES.NORDEA_LOGO:
        return <NordeaLogo />;
      case ICON_TYPES.NOTICE:
        return <Notice />;
      case ICON_TYPES.NEXT_STEP:
        return <NextStep />;
      case ICON_TYPES.QUESTION_MARK:
        return <QuestionMark />;
      case ICON_TYPES.SUB_MENU:
        return <SubMenu />;
      default:
        return null;
    }
  };
  return (
    <IconContainer
      onClick={onClick}
      size={size}
      width={width}
      fill={fill}
      stroke={stroke}
      center={!!center}
      absoluteRight={!!absoluteRight}
      absoluteLeft={!!absoluteLeft}
      alignLeft={!!alignLeft}
      alignRight={!!alignRight}>
      {renderIcon()}
    </IconContainer>
  );
};

export default Icon;

Icon.propTypes = {
  type: PropTypes.string,
  stroke: PropTypes.string,
  fill: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  center: PropTypes.bool,
  alignRight: PropTypes.bool,
  alignLeft: PropTypes.bool,
};

export const IconContainer = styled.div`
  width: ${(props) => props.width || props.size || '100%'};
  height: ${(props) => props.size || '100%'};
  margin: ${(props) => props.center && '0 auto'};
  margin-left: ${(props) => props.alignRight && 'auto'};
  margin-right: ${(props) => props.alignLeft && 'auto'};
  ${(props) =>
    props.absoluteRight &&
    `
        position: absolute;
        right: 30px;
        top: 35px;
    `};
  ${(props) =>
    props.absoluteLeft &&
    `
        position: absolute;
        left: 0;
        top: 0;
    `};

  .st1,
  .st0,
  .st2,
  svg {
    fill: ${(props) => props.fill};
    stroke: ${(props) => props.stroke};
  }
`;
