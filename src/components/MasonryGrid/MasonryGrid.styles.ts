import styled from "styled-components";

export const StyledGrid = styled.div`
  column-gap: 16px;
  padding: 16px;

  column-count: 1;

  @media (min-width: 600px) {
    column-count: 2;
  }

  @media (min-width: 900px) {
    column-count: 3;
  }

  @media (min-width: 1200px) {
    column-count: 4;
  }
`;

export const StyledPhoto = styled.div`
  break-inside: avoid;
  margin-bottom: 16px;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const StyledSearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
`;

export const StyledInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 10px 20px;
  font-size: 1.5rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const Loader = styled.div`
  height: 20px;
  margin-bottom: 20px;
`;
