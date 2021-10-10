import React from 'react';
import { useParams, Link } from "react-router-dom";

function ExpoItem() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [setExpoItem] = React.useState([]);

  let { expoItem } = useParams();

  React.useEffect(() => {
    fetch(`http://localhost:1337/expo-item/${expoItem}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setExpoItem(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  return <h3>{expoItem} and stuff</h3>;
}

function ExpoItems() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:1337/expo-items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {items.map(item => (
          <div className="container exhibit" key={item.id}>
            <Link to={`/expo/${item.handle}`} >
              <div className="row">
                <div className="col-12 col-xl-6">
                  <img src={'http://localhost:1337' + item.banner.formats.medium.url} />
                </div>
                <div className="col-12 col-xl-6">
                  <h2>{item.title}</h2>
                  <p>{item.intro}</p>
                  <div className="date">{item.happend_at}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </>
    );
  }
}

export { ExpoItem, ExpoItems };
