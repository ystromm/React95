import React, { useContext, useState } from 'react';
import styled from '@xstyled/styled-components';
import PropTypes from 'prop-types';

import { ModalContext } from '../Modal';
import Frame from '../Frame';

import Clock from './Clock';
import WindowButton from './WindowButton';

const Truncate = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const TaskBar = ({ list }) => {
  const [showList, toggleShowList] = useState(false);
  const { windows, activeWindow, setActiveWindow } = useContext(ModalContext);

  return (
    <Frame
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        height: 28,
      }}
      width="100%"
      p={2}
    >
      {showList && (
        <Frame
          style={{ position: 'absolute', bottom: 28 }}
          onClick={() => toggleShowList(false)}
        >
          {list}
        </Frame>
      )}
      <WindowButton small icon="logo" onClick={() => toggleShowList(!showList)}>
        Start
      </WindowButton>

      <Frame
        boxShadow="none"
        width="100%"
        paddingLeft={0}
        ml={2}
        display="flex"
      >
        {windows &&
          windows.map(({ icon, title }) => (
            <WindowButton
              key={title}
              icon={icon}
              active={title === activeWindow}
              onClick={() => setActiveWindow(title)}
            >
              <Truncate>{title}</Truncate>
            </WindowButton>
          ))}
      </Frame>

      <Clock />
    </Frame>
  );
};

TaskBar.propTypes = {
  list: PropTypes.node,
};

TaskBar.defaultProps = {
  list: undefined,
};

export default TaskBar;
