import { useParams } from 'react-router-dom';
import React from 'react';

export function Game() {
  const { id } = useParams();
  return <div>Game Id: {id}</div>;
}
