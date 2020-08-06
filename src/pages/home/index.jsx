import React from 'react';
import mp4Src from './test.mp4';

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <video
          controls
          height="300"
          width="500"
        >
          <source
            src={mp4Src}
            type="video/mp4"
          />
          <track kind="subtitles" src="foo.en.vtt" srcLang="en" label="English" />
          <track kind="subtitles" src="foo.sv.vtt" srcLang="sv" label="Svenska" />
          Sorry, your browser does not support embedded videos.
        </video>
      </div>
    );
  }
}
