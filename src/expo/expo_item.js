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
        <div className="hero is-halfheight exhibit-header" style={{backgroundImage: `url(http://localhost:1337${expoItem.banner.formats.medium.url})`}}>
          <div className="container">
            <div className="hero-body">
              <h1 className="title has-text-success is-1">{expoItem.title}</h1>
              {/* <div className="infos">
                <time datetime={expoItem.happend_at}>{expoItem.happend_at}</time>
                <p>{expoItem.distance}</p>
                <p>{expoItem.elevation_gain}</p>
                <p>{expoItem.duration}</p>
              </div> */}
            </div>
          </div>
        </div>
        <section>
          <div className="container">
            {/* <div className="exhibit-iframe">
              <iframe src={expoItem.ride_url} title="ridewgps"></iframe>
            </div> */}
            {expoItem.content.map(component => (
              <ExpoItemContent component={component} key={component.__component + component.id} />
            ))}
          </div>
        </section>
      </>
    );
  }
}

export { ExpoItem };
