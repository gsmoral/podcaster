import { Link } from "react-router-dom";
import styles from "../styles/table.module.css";

/**
 * Return formated date
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDate = date.toLocaleDateString("es-CL", options);
  return formattedDate;
}

/**
 * Return time in mm:ss
 */
const formatTime = (timeInMillis) => {
  const duration = new Date(timeInMillis);
  const minutes = duration.getUTCMinutes().toString().padStart(2, "0");
  const seconds = duration.getUTCSeconds().toString().padStart(2, "0");
  const formattedDuration = `${minutes}:${seconds}`;
  return formattedDuration;
}

const Table = ({headers, items}) => {
  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr className={styles.headerRow}>
          {headers.map((header) => (
            <th className={styles.tableHeader} key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <>
            {item.episodeUrl && (
              <tr className={styles.tableRow} key={index}>
                <td className={styles.tableCellText}>
                  <Link
                    className={styles.episodeLink}
                    to={"episode/" + item.trackId}
                  >
                    {item.trackName}
                  </Link>
                </td>
                <td className={styles.tableCellText}>{formatDate(item.releaseDate)}</td>
                <td className={styles.tableCellText}>
                  {formatTime(item.trackTimeMillis)}
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default Table;