import React from 'react';
import { Link } from "react-router-dom";
import Moment from 'moment';

function ExpoItems() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  Moment.locale('ch_DE');

  React.useEffect(() => {
    fetch("https://cockpit.donaier.ch/api/collections/get/trip?token=account-6c57e73dbedad1d552b8a424bd4e72")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result.entries);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <section className="exhibits">
        <div className="container">
          {items.map(item => (
            <div className="expo-item" key={item._id}>
              <Link to={`/expo/${item.slug}`}>
                <div className="card exhibit">
                  <div className="card-image">
                    <figure className="image is-3by1 is-covering">
                      <img src={'https://cockpit.donaier.ch'+item.hero.path} alt={item.title}/>
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media" >
                      <div className="media-content">
                        <h2 className="title is-3">{item.title}</h2>
                        <time className="is-block subtitle is-6" dateTime={item.date}>{Moment(item.date).format('D. MMM \'YY')}</time>
                      </div>
                    </div>
                    <div className="content" dangerouslySetInnerHTML={{__html: item.subtitle}} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export { ExpoItems };
