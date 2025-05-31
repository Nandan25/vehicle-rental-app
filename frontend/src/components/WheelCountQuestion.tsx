import React from "react";

type WheelOption = 2 | 4;

type Props = {
  wheels: WheelOption | null;
  onChange: (data: Partial<{ wheels: WheelOption }>) => void;
};

const WheelCountQuestion: React.FC<Props> = ({ wheels, onChange }) => {
  return (
    <div className="flex flex-col items-start space-y-6">
      <h2 className="text-xl font-semibold">How many wheels?</h2>
      <div className="flex gap-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="wheels"
            value={2}
            checked={wheels === 2}
            onChange={() => onChange({ wheels: 2 as const })}
          />
          <span className="text-lg">2</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="wheels"
            value={4}
            checked={wheels === 4}
            onChange={() => onChange({ wheels: 4 as const })}
          />
          <span className="text-lg">4</span>
        </label>
      </div>
    </div>
  );
};

export default WheelCountQuestion;
