import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

export const Searchbar = ({onSubmit}) => {
  const [query, setQuery] = useState('');

const  handleInput = e => {
    setQuery(e.currentTarget.value.toLowerCase())
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return alert ('Enter your request in the search field, please');

    }

    onSubmit(query);
    setQuery('');
  };

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button className={css.SearchFormButton} type="submit">
            
            <AiOutlineSearch />
          </button>

          <input
            className={css.SearchFormInput}
            value={query}
            onChange={handleInput}
            type="text"
            placeholder="Search images and photos"
            autoComplete="off"
            autoFocus
          />
        </form>
      </header>
    );
  }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
