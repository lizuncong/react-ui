import React from 'react';
import Image from 'components/image';
import styles from './index.module.less';
import img01 from './imgs/01.jpg';
import img02 from './imgs/02.jpg';
import img03 from './imgs/03.jpg';
import img04 from './imgs/04.png';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        {
          id: 1,
          src: img01,
        },
        {
          id: 2,
          src: img02,
        },
        {
          id: 3,
          src: img03,
        },
        {
          id: 4,
          src: img04,
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
