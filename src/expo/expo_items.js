import React from 'react';
import { Link } from "react-router-dom";

function ExpoItems() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:1337/expo-items")
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
          <div className="columns">
            {items.map(item => (
              <div className="column" key={item.id}>
                <Link to={`/expo/${item.handle}`}>
                  <div className="card exhibit">
                    <div className="card-image">
                      <figure className="image is-3by1 is-covering">
                        <img src={'http://localhost:1337' + item.banner.formats.medium.url} alt={item.banner.name}/>
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="media" >
                        <div className="media-content">
                          <h2 className="title is-4">{item.title}</h2>
                          <time className="subtitle is-6" dateTime={item.happend_at}>{item.happend_at}</time>
                        </div>
                      </div>
                      <div className="content">
                        <p>{item.intro}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export { ExpoItems };
