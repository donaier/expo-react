import React, { Component } from 'react';

function ExpoItemContent(props) {
  const component = props.component

  switch (component.__component) {
    case 'content.content-image':
      return (
        <div className={component.__component} >
          {component.images.map(image => 
            <img src={'http://localhost:1337' + image.formats.medium.url} />
          )}
        </div>
      );
    case 'content.content-text':
      return (
        <div className={component.__component} >
          {component.text}
        </div>
      );
    default:
      break;
  }
}

export { ExpoItemContent };
