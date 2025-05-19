const { expect } = require('chai');
const { createCompany } = require('../../src/domain/company');

describe('createCompany', () => {
  it('should create a company with valid CUIT and data', () => {
    const input = {
      CUIT: '20329642330',
      companyName: 'Tech SRL',
      accession_date: '2024-09-01T00:00:00Z'
    };

    const result = createCompany(input);

    expect(result).to.have.property('CUIT', input.CUIT);
    expect(result).to.have.property('companyName', input.companyName);
    expect(result.accession_date).to.be.an.instanceOf(Date);
  });

  it('should throw error for invalid CUIT format', () => {
    const input = {
      CUIT: '1234567890A',
      companyName: 'Test',
    };

    expect(() => createCompany(input)).to.throw('Invalid CUIT format or check digit.');
  });

  it('should throw error for invalid CUIT checksum', () => {
    const input = {
      CUIT: '20329642331',
      companyName: 'Bad Checksum SA',
    };

    expect(() => createCompany(input)).to.throw('Invalid CUIT format or check digit.');
  });

  it('should throw error for missing companyName', () => {
    const input = {
      CUIT: '20329642330',
    };

    expect(() => createCompany(input)).to.throw('Invalid companyName. It must be a non-empty string.');
  });

  it('should throw error for invalid accession_date', () => {
    const input = {
      CUIT: '20329642330',
      companyName: 'Invalid Date SA',
      accession_date: 'not-a-date'
    };

    expect(() => createCompany(input)).to.throw('Invalid accession_date.');
  });
});