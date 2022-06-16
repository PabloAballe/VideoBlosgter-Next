/**
 *
 * Styles for the VideoCard component
 *
 */
import styled from "styled-components";

export const VideoCardStyles = styled.div`
  filter: opacity(70%);
  filter: blur(1px);
  filter: brightness(0.5);

  &:hover {
    filter: opacity(100%);
    filter: brightness(1);
  }
`;
