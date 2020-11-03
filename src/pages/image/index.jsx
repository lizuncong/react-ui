import React from 'react';
import Image from 'components/image';
import styles from './index.module.less';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        {
          id: 1,
          src: 'http://localhost:5008/static/image-01.jpg',
          lazyLoad: true,
        },
        {
          id: 2,
          src: 'http://localhost:5008/static/image-02.jpg',
          lazyLoad: true,
        },
        {
          id: 3,
          src: 'http://localhost:5008/static/image-01.jpg',
          lazyLoad: true,
        },
        {
          id: 4,
          src: 'http://localhost:5008/static/image-04.jpg',
          lazyLoad: true,
        },
      ],
    };
  }

  render() {
    const { images } = this.state;
    return (
      <div className={styles.container}>
        <div className="demo-title">图片加载失败重载</div>
        <div className="description">
          当图片加载失败时，点击重载重新加载图片
        </div>
        {
          images.map((item, index) => (
            <Image
              key={item.id}
              size={200}
              src={item.src}
              lazyLoad={item.lazyLoad}
              random={item.random}
            />
          ))
        }
        <div>
          <span
            style={{ color: 'blue' }}
            onClick={() => {
              this.setState({
                images: images.map(item => ({
                  ...item,
                  random: Date.now(),
                })),
              });
            }}
          >
            刷新全部
          </span>
        </div>
      </div>
    );
  }
}

export default Index;
