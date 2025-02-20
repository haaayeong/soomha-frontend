import React from 'react';
import AllergyData from './AllergyData';



function ManAllergy({manData}) {
  return <AllergyData gender="man" data={manData} />;
}

function WomanAllergy({womanData}) {
  return <AllergyData gender="woman" data={womanData} />;
}

export { ManAllergy, WomanAllergy };
