import React from 'react';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import Moment from 'moment';

function ExpoItems() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  Moment.locale('ch_DE');

  React.useEffect(() => {
    fetch("http://18.192.181.108:1337/expo-items")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
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
            <div className="expo-item" key={item.id}>
              <Link to={`/expo/${item.handle}`}>
                <div className="card exhibit">
                  <div className="card-image">
                    <figure className="image is-3by1 is-covering">
                      <img src={item.banner.formats.medium.url} alt={item.banner.name}/>
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media" >
                      <div className="media-content">
                        <h2 className="title is-3">{item.title}</h2>
                        <time className="is-block subtitle is-6" dateTime={item.happend_at}>{Moment(item.happend_at).format('D. MMM \'YY')}</time>
                      </div>
                    </div>
                    <div className="content">
                      <ReactMarkdown>{item.intro}</ReactMarkdown>
                    </div>
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
