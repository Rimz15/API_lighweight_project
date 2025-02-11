const getAverageConversionRate = (currencyPair, weeks) => {
  return cy.request(`/observations/${currencyPair}?recent=${weeks}`)
    .then((response) => {
      expect(response.status).to.eq(200);
      const rates = response.body.observations.map(obs => parseFloat(obs[currencyPair].v));
      const averageRate = rates.reduce((acc, rate) => acc + rate, 0) / rates.length;
      cy.log(`Average ${currencyPair} rate for last ${weeks} weeks: ${averageRate}`);
      expect(averageRate).to.be.a('number');
    });
};

describe('Bank of Canada Forex API', () => {
  const currencyPairs = ['FXCADUSD', 'FXUSDCAD', 'FXEURCAD'];
  const weeks = 10;

  currencyPairs.forEach((currencyPair) => {
    it(`should calculate the average ${currencyPair} conversion rate for the last ${weeks} weeks`, () => {
      return getAverageConversionRate(currencyPair, weeks); // Ensure we return the Cypress chain
    });
  });

  it('should handle invalid currency code', () => {
    cy.request({
      url: '/observations/INVALIDCODE?recent=10',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404); // Ensure we check for the correct status code
    });
  });

});

// Additional Negative Scenarios
it('should handle invalid recent weeks parameter', () => {
  cy.request({
    url: '/observations/FXCADUSD?recent=INVALID',
    }).then((response) => {
    expect(response.status).to.eq(404);
  });
});

it('should handle empty currency code', () => {
  cy.request({
    url: '/observations/?recent=10',
    }).then((response) => {
    expect(response.status).to.eq(404);
  });
});

it('should handle missing recent parameter', () => {
  cy.request({
    url: '/observations/FXCADUSD',
   }).then((response) => {
    expect(response.status).to.eq(404);
  });
});

it('should handle future date', () => {
  cy.request({
    url: '/observations/FXCADUSD?start_date=2100-01-01',
    }).then((response) => {
    expect(response.status).to.eq(404);
  });
});