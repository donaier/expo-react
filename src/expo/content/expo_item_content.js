import React from 'react';
import ReactMarkdown from 'react-markdown';

function ExpoItemContent(props) {
  const component = props.component

  switch (component.field.type) {
    case 'image':
      return (
        <div className={'content-image'} >
          <img src={'https://cockpit.donaier.ch/' + component.value.path} />
        </div>
      );
    case 'wysiwyg':
      return (
        <div className={'content-text box'} dangerouslySetInnerHTML={{__html: component.value}} />
      );
    case 'gallery':
      return (
        <div className={'content-gallery'} >
          {component.value.map(image => (
            <img src={'https://cockpit.donaier.ch/' + image.path} />
          ))}
        </div>
      );
    default:
      return null;
  }
}

export { ExpoItemContent };
