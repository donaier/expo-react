import React from 'react';

function ExpoItem() {
  let { topicId } = React.useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

function ExpoItems() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  React.useEffect(() => {
    fetch("http://localhost:1337/expo-items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
          <div class="container exhibit">
            <div class="row">
              <div class="col-12 col-xl-6">
                <img src={'http://localhost:1337' + item.banner.formats.medium.url} />
              </div>
              <div class="col-12 col-xl-6">
                <h2>{item.title}</h2>
                <p>{item.intro}</p>
                <div class="date">{item.happend_at}</div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}

export { ExpoItem, ExpoItems };
