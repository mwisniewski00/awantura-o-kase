import { Paper } from '@mui/material';
import styled from 'styled-components';

export const AnnouncementBanner = styled(Paper)<{ show: boolean }>`
  width: 100%;
  height: 60px;
  opacity: ${(props) => (props.show ? '1' : '0')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease-in-out;
`;
