import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const PhotoContainer = styled.div`
  margin-top: 20px;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const Photographer = styled.h2`
  margin-top: 15px;
  font-size: 1.5rem;
  color: #333;
`;

export const PhotoLink = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
