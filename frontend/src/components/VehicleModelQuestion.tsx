import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import { getVehicles } from "../api/api";

type Props = {
  data: { vehicleTypeId: number | null; vehicleId: number | null };
  onChange: (data: Partial<{ vehicleId: number }>) => void;
};

const VehicleModelQuestion: React.FC<Props> = ({ data, onChange }) => {
  const [vehicles, setVehicles] = useState<{ id: number; modelName: string }[]>(
    []
  );

  useEffect(() => {
    if (data.vehicleTypeId) {
      getVehicles(data.vehicleTypeId).then(setVehicles);
    }
  }, [data.vehicleTypeId]);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" className="text-xl mb-4">
        Specific Vehicle Model
      </FormLabel>
      <RadioGroup
        value={data.vehicleId?.toString() || ""}
        onChange={(e) => onChange({ vehicleId: parseInt(e.target.value) })}
      >
        {vehicles.map((vehicle) => (
          <FormControlLabel
            key={vehicle.id}
            value={vehicle.id.toString()}
            control={<Radio />}
            label={vehicle.modelName}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default VehicleModelQuestion;
