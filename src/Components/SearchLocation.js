import React from 'react';
import PropTypes from 'prop-types';

import {
  Input, Container, Spinner
} from 'reactstrap';

function SearchLocation({ value, change, submit, isLoadingContent }) {
  return (
    <>
      <Container>
        <div className="searchLocation col-sm-12 col-md-6 offset-md-3">
          <form className="SearchBar d-flex" onSubmit={submit}>
            <Input placeholder="Enter any city..." onChange={change} value={value} />&nbsp;&nbsp;&nbsp;&nbsp;
            { isLoadingContent && <Spinner type="grow" color="dark" />}
          </form>
        </div>
      </Container>
    </>
  );
}

SearchLocation.propTypes = {
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  isLoadingContent: PropTypes.bool.isRequired
};

export default SearchLocation;
