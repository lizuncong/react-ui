import React from 'react';
import { RoughCanvas } from "roughjs/bin/canvas";
import rough from "roughjs/bin/rough";
import styles from './index.module.less';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const rc = rough.canvas(document.getElementById('canvas'));
    rc.rectangle(10, 10, 200, 200);
    rc.circle(50, 50, 80, { fill: 'red' });
  }
  render() {
    return (
      <div className={styles.container}>
        <div className="demo-title">Excalidraw技术预研</div>
        <div id="desc" className="description">
          用来预研Excalidraw，Canvas
        </div>
        <div onDrop={e => {
          console.log('onDrop...', e)
        }} className={styles.wrap}>
          <canvas
            id="canvas"
            className="excalidraw__canvas"
            style={{
              width: 300,
              height: 400,
            }}
            width={500}
            height={500}
            // ref={this.handleCanvasRef}
            // onContextMenu={e => {
            //   console.log('onContextMenu', e)
            // }}
            onPointerDown={e => {
              console.log('onPointerDown...', e.button)
            }}
            // onPointerMove={e => {
            //   console.log('onPointerMove...', e)
            // }}
          // onPointerDown={this.handleCanvasPointerDown}
          // onDoubleClick={this.handleCanvasDoubleClick}
          // onPointerMove={this.handleCanvasPointerMove}
          // onPointerUp={this.handleCanvasPointerUp}
          // onPointerCancel={this.removePointer}
          // onTouchMove={this.handleTouchMove}
          >
            canvas by lzc
          </canvas>
        </div>
      </div>
    );
  }
}

export default Index;
