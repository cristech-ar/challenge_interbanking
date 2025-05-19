const Transferencia = require('./models/transferenciaModel');
const Empresa = require('./models/empresaModel');

function createTransferenciaRepoMongo() {
  return {
    async create(transferenciaData) {
      const transferencia = new Transferencia(transferenciaData);
      return await transferencia.save();
    },

    async findEmpresasByTransferenciasLastMonth() {
      const oneMonthAgo = new Date();
      const transferencias = await Transferencia.find({ fecha: { $gte: oneMonthAgo } }).populate('companyId');
      const empresasUnicas = new Map();
      transferencias.forEach(t => {
        if (t.companyId && !empresasUnicas.has(t.companyId.cuit)) {
          empresasUnicas.set(t.companyId.cuit, t.companyId);
        }
      });
      return Array.from(empresasUnicas.values());
    },

    async findByCompanyId(companyId) {
      return await Transferencia.find({ companyId });
    }
  };
}

module.exports = { createTransferenciaRepoMongo };