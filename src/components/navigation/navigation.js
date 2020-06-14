import Button from 'components/button/button';
import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Context } from 'store';
import './navigation.scss';

const Navigation = () => {
  const [state, dispatch] = useContext(Context);
  const isMobile = useMediaQuery({
    query: '(max-width: 480px)'
  });

  const onSidebarToggleButtonClick = () => {
    dispatch({ type: 'SET_SIDEBAR_VISIBILITY', payload: !state.isSidebarOpen });
  }

  let classNames = `navigation`;
  if (isMobile) {
    classNames += ` is-mobile`;
  }
  if (state.isSidebarOpen) {
    classNames += ` is-fixed`;
  }

  let toggleButtonText = `Get Code`;
  if (state.isSidebarOpen) {
    toggleButtonText = `Close Code`;
  }

  return (
    <nav className={classNames}>
      <Button
        className="sidebar__toggle"
        isHover={false}
        isSmall={true}
        isPin={true}
        icon={'ri-code-line'}
        text={toggleButtonText}
        onClick={e => onSidebarToggleButtonClick()}
      />
      <ul>
        {/* <li><a href="#">About</a></li>
        <li><a href="#">Credits</a></li>
        <li><a href="#">Roadmap</a></li> */}
      </ul>
    </nav>
  )
}

export default Navigation
