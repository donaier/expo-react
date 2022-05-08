import React from 'react';

function ExpoItemContent(props) {
  const component = props.component

  switch (component.field.type) {
    case 'image':
      return (
        <div className={'content-image'} >
          <img src={'https://cockpit.donaier.ch/' + component.value.path} alt='' />
        </div>
      );
    case 'wysiwyg':
      return (
        <div className={'columns is-centered'}>
          <div className={'column is-half'}>
            <div className={'content-text box'} dangerouslySetInnerHTML={{__html: component.value}} />
          </div>
        </div>
      );
    case 'gallery':
      return (
        <div className={'content-gallery'} >
          {component.value.map((image, i) => (
            <img src={'https://cockpit.donaier.ch/' + image.path} key={i} alt='' />
          ))}
        </div>
      );
    default:
      return null;
  }
}

export { ExpoItemContent };
