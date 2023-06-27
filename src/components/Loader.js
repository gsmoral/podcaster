import styles from '../styles/loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.circle}></span>
      {/* <span className={styles.outerCircle}></span> */}
    </div>
  );
}

export default Loader;