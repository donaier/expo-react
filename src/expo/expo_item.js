import React from 'react';
import { useParams } from "react-router-dom";

import { ExpoItemContent } from './content/expo_item_content.js';

function ExpoItem() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [expoItem, setExpoItem] = React.useState([]);

  const { expoItemHandle } = useParams();

  React.useEffect(() => {
    fetch(`http://localhost:1337/expo-items/${expoItemHandle}`)
      .then(res => res.json())
      .then(
        (result) => {
          setExpoItem(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
  }, [expoItemHandle])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="exhibit-header">
          <img src={'http://localhost:1337' + expoItem.banner.formats.medium.url} alt={expoItem.banner.name}/>
          <h2>{expoItem.title}</h2>
          <div className="date">{expoItem.happend_at}</div>
          <div className="infos">
            <p>{expoItem.distance}</p>
            <p>{expoItem.elevation_gain}</p>
            <p>{expoItem.duration}</p>
          </div>
        </div>
        <div className="exhibit-iframe">
          <iframe src={expoItem.ride_url} title="ridewgps"></iframe>
        </div>
        {expoItem.content.map(component => (
          <ExpoItemContent component={component} />
        ))}
      </>
    );
  }
}

export { ExpoItem };
