import React from 'react';

function AllergyData({ gender, data }) {
  return (
    <div className="gender-allergy-data">
      <div className="gender-icon">
        <span>{gender === 'man' ? <img src="/images/man.png" alt="" /> : <img src="/images/woman.png" alt="" />}</span>
      </div>
      <div className="age-based-allergy-data">
        {data.map((ageGroup, index) => (
          <div
            key={index}
            className={`age-group ${ageGroup.ageRange === "0~6세" ? "low-age" : ageGroup.ageRange === "6~11세" ? "mid-age" : "high-age"}`}
          >

            <div className='base-age'>{ageGroup.ageRange}</div>
            <div className="allergy-box">
              {ageGroup.allergyTypes.map((type, index) => (
                <div key={index} className="allergy-type">
                  <p>{type.name}</p>
                  <p>{type.count}명</p>
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
