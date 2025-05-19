const { expect } = require('chai');
const { createTransferService } = require('../../src/application/transferService');
const mockTransferRepo = require('../mocks/mockTransferRepo');

describe('transferService using mock', () => {
  const service = createTransferService({ transferRepo: mockTransferRepo });

  beforeEach(() => {
    mockTransferRepo.__clear();
  });

  it('should return companies with transfer counts from the last month', async () => {
    await mockTransferRepo.__addTransfer({
      date: new Date(),
      companyId: {
        _id: '65123456789abcdef0123456',
        CUIT: '20329642330',
        name: 'Empresa SRL'
      },
      amount: 15000,
      debitAccount: '000111222333',
      creditAccount: '333222111000'
    });

    await mockTransferRepo.__addTransfer({
      date: new Date(),
      companyId: {
        _id: '65123456789abcdef0123456',
        CUIT: '20329642330',
        name: 'Empresa SRL'
      },
      amount: 5000,
      debitAccount: '000222333444',
      creditAccount: '444333222000'
    });

    const result = await service.companiesByTransfersLastMonth();
    console.log(result);

    expect(result).to.have.lengthOf(1);
    expect(result[0]).to.include({
      CUIT: '20329642330',
      name: 'Empresa SRL',
      transferCount: 2
    });
  });

  it('should return an empty array when no recent transfers exist', async () => {
    const oldDate = new Date();
    oldDate.setMonth(oldDate.getMonth() - 2);

    await mockTransferRepo.__addTransfer({
      date: oldDate,
      companyId: {
        _id: '65123456789abcdef0123456',
        CUIT: '20999999999',
        name: 'Old Corp'
      },
      amount: 9000,
      debitAccount: '999888777000',
      creditAccount: '000777888999'
    });

    const result = await service.companiesByTransfersLastMonth();
    expect(result).to.be.an('array').that.is.empty;
  });
});
