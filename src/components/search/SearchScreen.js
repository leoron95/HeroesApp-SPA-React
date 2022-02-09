import React, {useMemo} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
// import {queryString} from 'query-string'
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {
    const queryString = require('query-string');

    const navigate = useNavigate();
    const location = useLocation();

    const {q = ''} = queryString.parse(location.search)

    const [ formValues, handleInputChange ] = useForm( {
        searchText: q
    } );

    const {searchText} = formValues;

    const handleSearch = (e) => {
        e.preventDefault();

        const lastSearch = localStorage.getItem('lastSearch') || ''

        navigate(`?q=${searchText}`)

    }


    const heroesFilter = useMemo( ()=> getHeroesByName(q), [q] );

    return (
        <>
            <h1>Search</h1>
            <hr/>

            <div className='row'>

                <div className='col-5'>
                    <h4>Search</h4>
                    <hr/>

                    <form onSubmit={handleSearch}>
                        <input
                            type='text'
                            placeholder='Search Hero'
                            className='form-control'
                            name='searchText'
                            autoComplete='off'
                            onChange={handleInputChange}
                            value={searchText}
                        />

                        <button 
                            type='submit'
                            className='btn btn-outline-primary mt-3 w-100'
                        >
                            Search...
                        </button>

                    </form>

                </div>

                <div className='col-7'>
                    <h4>Results</h4>
                    <hr/>

                    {
                        (q === '')
                            ? <div className='alert alert-info'> Search Hero </div>
                            : (heroesFilter.length === 0 ) 
                            && <div className='alert alert-danger'>No results: {q}</div>
                    }

                    {
                        heroesFilter.map( hero => (
                            <HeroCard 
                                key={hero.id}
                                {...hero}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}