import React, { useEffect } from 'react';
import { BackButton } from '../../../components/shared/BackButton';

function PrivateNutriScoreCalculator() {
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data.toString().startsWith('cc-tool')) {
        const res = e.data.split('|');
        document.getElementsByClassName('cc-calculator-iframe-' + res[2])[0].style.height = res[1] + 'px';
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
    <h1>Calculateur de Nutri Score</h1>
    <BackButton url={'/private/home'} />
    <div
      id="452"
      className="cc-calculator"
      data-id="452"
      data-calculator="/calcul/nutri-score/"
      data-name="Calculateur Nutri Score"
      data-link-text="https://commentcalculer.fr/calcul/nutri-score/"
      data-title="Calculateur Nutri Score"
      data-description=""
      data-version="1.0.0"
      >
      <iframe
        src="https://commentcalculer.fr/calcul/nutri-score/"
        title="Calculateur Nutri Score"
        style={{ width: '100%', height: '100vh', border: 'none' }}
        
        ></iframe>
    </div>
        </>
  );
}

export default PrivateNutriScoreCalculator;
