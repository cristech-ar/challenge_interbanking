const { expect } = require('chai');
const { createCompanyService } = require('../../src/application/companyService');


const fakeCompanyRepo = require('../mocks/mockCompanyRepo');

describe('companyService (using mock)', () => {
  const service = createCompanyService({ companyRepo: fakeCompanyRepo });

  beforeEach(() => {
    fakeCompanyRepo.__clear();
  });

  it('should add a valid company', async () => {
    const input = {
      CUIT: '20329642330',
      companyName: 'Tech SRL',
      accession_date: new Date().toISOString()
    };

    const result = await service.addCompany(input);

    expect(result).to.include({
      CUIT: input.CUIT,
      companyName: input.companyName
    });
  });

  it('should return companies added in the last month', async () => {
    await service.addCompany({
      CUIT: '20329642330',
      companyName: 'Empresa 1',
      accession_date: new Date()
    });

    const result = await service.companiesAddedLastMonth();
    expect(result).to.have.lengthOf(1);
  });
});