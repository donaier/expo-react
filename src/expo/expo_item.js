import React from 'react';
import { useParams } from "react-router-dom";
import Moment from 'moment';

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
        <div className="hero is-large exhibit-header" style={{backgroundImage: `url(http://localhost:1337${expoItem.banner.formats.medium.url})`}}>
          <nav className="navbar is-fixed-top">
            <div className="container">
              <div className="navbar-brand">
                <div className="navbar-item">
                  <h1 className="title is-1 has-text-primary">{expoItem.title}</h1>
                </div>
              </div>
            </div>
          </nav>
          <div className="hero-body"></div>
        </div>
        <section className="exhibit-detail">
          <div className="container">
            <div className="level infos">
              <div className="level-item">
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-calendar-alt"></i>
                  </span>
                  <span><time dateTime={expoItem.happend_at}>{Moment(expoItem.happend_at).format('D. MMM \'YY')}</time></span>
                </span>
              </div>
              <div className="level-item">
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-route"></i>
                  </span>
                  <span>{expoItem.distance} km</span>
                </span>
              </div>
              <div className="level-item">
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-mountain"></i>
                  </span>
                  <span>{expoItem.elevation_gain} m</span>
                </span>
              </div>
              <div className="level-item">
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-stopwatch"></i>
                  </span>
                  <span>{expoItem.duration}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="level fancy-spacer"></div>
        </section>
        <section className="exhibit-detail content">
          <div className="container">
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
