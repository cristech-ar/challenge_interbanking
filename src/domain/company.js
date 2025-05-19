function isValidCUIT(cuit) {
  if (!/^\d{11}$/.test(cuit)) return false;
  const cleanCUIT = cuit.replace(/-/g, '');
  const digits = cuit.split('').map(Number);
  const multipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  const validPrefixes = ['20', '23', '24', '27', '30', '33', '34'];

  const prefix = cleanCUIT.slice(0, 2);
  if (!validPrefixes.includes(prefix)) return false;

  const sum = multipliers.reduce((acc, m, i) => acc + m * digits[i], 0);
  const mod = 11 - (sum % 11);
  const checkDigit = mod === 11 ? 0 : mod === 10 ? 9 : mod;

  return checkDigit === digits[10];
}

function createCompany({ CUIT, companyName, accession_date = new Date() }) {
  if (!CUIT || typeof CUIT !== 'string') {
    throw new Error('Invalid CUIT. It must be a string.');
  }

  if (!isValidCUIT(CUIT)) {
    throw new Error('Invalid CUIT format or check digit.');
  }

  if (!companyName || typeof companyName !== 'string') {
    throw new Error('Invalid companyName. It must be a non-empty string.');
  }

  if (isNaN(new Date(accession_date).getTime())) {
    throw new Error('Invalid accession_date.');
  }

  return {
    CUIT,
    companyName,
    accession_date: new Date(accession_date),
  };
}

module.exports = { createCompany };
