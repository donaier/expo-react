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
      <div className="exhibits">
        {items.map(item => (
          <Link to={`/expo/${item.handle}`} key={item.id}>
            <div className="exhibit" key={item.id}>
              <img src={'http://localhost:1337' + item.banner.formats.medium.url} alt={item.banner.name}/>
              <h2>{item.title}</h2>
              <p>{item.intro}</p>
              <div className="date">{item.happend_at}</div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export { ExpoItems };
