import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import { getVehicleTypes } from "../api/api";

type Props = {
  data: { wheels: number | null; vehicleTypeId: number | null };
  onChange: (data: Partial<{ vehicleTypeId: number }>) => void;
};

const VehicleTypeQuestion: React.FC<Props> = ({ data, onChange }) => {
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    if (data.wheels) {
      getVehicleTypes(data.wheels).then(setTypes);
    }
  }, [data.wheels]);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" className="text-xl mb-4">
        Type of Vehicle
      </FormLabel>
      <RadioGroup
        value={data.vehicleTypeId?.toString() || ""}
        onChange={(e) => onChange({ vehicleTypeId: parseInt(e.target.value) })}
      >
        {types.map((type) => (
          <FormControlLabel
            key={type.id}
            value={type.id.toString()}
            control={<Radio />}
            label={type.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default VehicleTypeQuestion;
