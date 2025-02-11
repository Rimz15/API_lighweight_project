describe('Bank of Canada Forex API', () => {
    it('should calculate the average CAD to USD conversion rate for the last 10 weeks', () => {
      cy.request('/observations/FXCADUSD?recent=10')
        .then((response) => {
          expect(response.status).to.eq(200);
          const rates = response.body.observations.map(obs => parseFloat(obs.FXCADUSD.v));
          const averageRate = rates.reduce((acc, rate) => acc + rate, 0) / rates.length;
          cy.log(`Average CAD to USD rate for last 10 weeks: ${averageRate}`);
          expect(averageRate).to.be.a('number');
        });
    });
  
    it('should handle invalid currency code', () => {
      cy.request({
        url: '/observations/INVALIDCODE?recent=10',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });