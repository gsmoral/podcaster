import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import styles from '../styles/header.module.css';

// import LoaderContext from '../contexts/loader-context';

const Header = () => {
    // const { isLoading } = useContext(LoaderContext);
    const loading = useSelector((state) => state.loading);
    
    return (
        <div className={styles.header}>
            <h1>
                <Link to="/">
                    Podcaster
                </Link>
            </h1>
            {loading && <Loader />}
        </div>
    );
}

export default Header;