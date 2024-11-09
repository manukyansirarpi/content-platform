import React from "react";
import { StyledSearchContainer, StyledInput } from "./MasonryGrid.styles";

interface SearchFormProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  handleSearchChange,
}) => (
  <StyledSearchContainer>
    <form onSubmit={(e) => e.preventDefault()}>
      <StyledInput
        type="text"
        placeholder="Search photos..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </form>
  </StyledSearchContainer>
);

export default SearchForm;
