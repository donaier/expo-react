import React from 'react';
import ReactMarkdown from 'react-markdown';

function ExpoItemContent(props) {
  const component = props.component

  switch (component.__component) {
    case 'content.content-image':
      return (
        <div className={component.__component.split(".").pop()} >
          <figure>
            {component.images.map(image =>
              <img src={'http://localhost:1337' + image.formats.large.url} alt={image.name} key={image.id} />
            )}
            {/* <figcaption>
              Figure 1: Some beautiful placeholders
            </figcaption> */}
          </figure>
        </div>
      );
    case 'content.content-text':
      return (
        <div className={component.__component.split(".").pop() + ' box'} >
          <ReactMarkdown>{component.text}</ReactMarkdown>
        </div>
      );
    default:
      break;
  }
}

export { ExpoItemContent };
