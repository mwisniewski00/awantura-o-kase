import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const SitemarkIcon = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333'
  };

  const textStyle = {
    marginLeft: '8px'
  };

  return (
    <div style={containerStyle}>
      <FontAwesomeIcon icon={faDollarSign} />
      <span style={textStyle}>AWANTURA O KASE</span>
    </div>
  );
};

export default SitemarkIcon;
