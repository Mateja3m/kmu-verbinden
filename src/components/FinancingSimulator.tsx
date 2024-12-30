import { useState } from 'react';
import { Slider } from "@/components/ui/slider";

const FinancingSimulator = () => {
  const [amount, setAmount] = useState(5000);
  const [months, setMonths] = useState(12);

  const monthlyPayment = amount / months;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-swiss-darkblue mb-6">
        Finanzierungssimulator
      </h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Finanzierungsbetrag: {amount.toLocaleString('de-CH')} CHF
          </label>
          <Slider
            defaultValue={[5000]}
            max={10000}
            min={1000}
            step={100}
            onValueChange={(value) => setAmount(value[0])}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Laufzeit: {months} Monate
          </label>
          <Slider
            defaultValue={[12]}
            max={48}
            min={1}
            step={1}
            onValueChange={(value) => setMonths(value[0])}
            className="w-full"
          />
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Monatliche Rate</p>
              <p className="text-lg font-semibold text-swiss-darkblue">
                {monthlyPayment.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CHF
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Gesamtrückzahlung</p>
              <p className="text-lg font-semibold text-swiss-darkblue">
                {amount.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CHF
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancingSimulator;