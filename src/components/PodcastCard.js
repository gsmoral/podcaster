import styles from "../styles/podcast-card.module.css"

const PodcastCard = ({podcast}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.image}>
        <img
          src={podcast['im:image'][2]?.label ? podcast['im:image'][2].label : "podcast_icon.png"}
          alt={podcast['im:name'].label ? podcast['im:name'].label : "Artist image"}
          loading="lazy"
        />
      </div>
      <div className={styles.card}>
          <p className={styles.title}>{podcast['im:name'].label}</p>
          <p className={styles.author}>Author: {podcast['im:artist'].label}</p>
      </div>
    </div>
  );
}

export default PodcastCard;