import React from 'react';

function AllergyData({ gender, data }) {
  console.log(data)
  return (
    <div className="gender-allergy-data">
      <div className="gender-icon">
        <span>{gender === 'man' ? <img src="/images/man.png" alt="" /> : <img src="/images/woman.png" alt="" />}</span>
      </div>
      <div className="age-based-allergy-data">
        {data.map((ageGroup, index) => (
          <div
            key={index}
            className={`age-group ${ageGroup.ageGroup === 0 ? "low-age" : ageGroup.ageGroup === 1 ? "mid-age" : "high-age"}`}
          >
            <div className='base-age'>
              {ageGroup.ageGroup === 0 ? "0~6세" : ageGroup.ageGroup === 1 ? "6~11세" : "12~17세"}
            </div>
            <div className="allergy-box">
              {[
                { name: "비염", count: ageGroup.rhinitis },
                { name: "천식", count: ageGroup.asthma },
                { name: "아토피", count: ageGroup.atopy },
              ].map((type, index) => (
                <div key={index} className="allergy-type">
                  <p>{type.name}</p>
                  <p>{type.count.toLocaleString()}명</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllergyData;
