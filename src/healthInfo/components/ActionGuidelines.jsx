import { useState } from 'react';
import '../styles/ActionGuidelines.css';
import GuideContent from './GuideContent';

function ActionGuidelines() {
  const buttons = [
    { label: '고농도미세먼지\n7가지 대응요령', image: 'https://www.airkorea.or.kr/web/2022/images/sub/info_1.jpg' },
    { label: '고농도미세먼지\n단계별 대응요령', image: 'https://www.airkorea.or.kr/web/2022/images/sub/info_2.jpg' },
    { label: '계층별 대응요령\n[유치원,초·중·고]', image: 'https://www.airkorea.or.kr/web/2022/images/sub/info_3.jpg' },
    { label: '계층별 대응요령\n[어린이집]', image: 'https://www.airkorea.or.kr/web/2022/images/sub/info_4.jpg' },
    { label: '계층별 대응요령\n[노인요양시설]', image: 'https://www.airkorea.or.kr/web/2022/images/sub/info_5.jpg' }
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="action-guidelines">
      <h3>미세먼지 & 초 미세먼지 단계별 위험도 안내</h3>
      <GuideContent />

      <article className="dust-guide">
        <div className="dust-guide-btns">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`dust-btn ${selectedIndex === index ? 'active' : ''}`}
              onClick={() => setSelectedIndex(index)}
            >
              {btn.label.split('\n').map((line, idx) => (
                <span key={idx} style={{display:'block'}}>{line}</span>
              ))}
            </button>
          ))}
        </div>
        <div className="dust-guide-img">
          <img src={buttons[selectedIndex].image} alt="미세먼지 가이드" />
        </div>
      </article>
    </section>
  );
}

export default ActionGuidelines;
