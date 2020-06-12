import Button from 'components/button/button';
import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Context } from 'store';
import './navigation.scss';

const Navigation = () => {
  const [state, dispatch] = useContext(Context);
  const isTablet = useMediaQuery({
    query: '(max-device-width: 1280px)'
  });
  const isMobile = useMediaQuery({
    query: '(max-device-width: 480px)'
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

  return (
    <nav className={classNames}>
      <Button
        className="sidebar__toggle"
        isHover={false}
        isSmall={true}
        isPin={true}
        icon={'ri-code-line'}
        text={`Get code`}
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
