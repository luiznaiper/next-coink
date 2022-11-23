import React from 'react';

const CheckoutWizard = ({ activeStep = 0 }) => {
  return (
    <div className="mb-5 flex flex-wrap">
      {[
        'Login del Usuario',
        'Dirección de Envío',
        'Método de Pago',
        'Realizar Pedido',
      ].map((step, index) => (
        <div
          key={step}
          className={`flex-1 border-b-2 text-center ${
            index <= activeStep
              ? 'border-indigo-500 text-indigo-500'
              : 'border-gray-400 text-gray-400'
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default CheckoutWizard;
