import React from "react";
import { TextField } from "@mui/material";

type Props = {
  data: {
    firstName: string;
    lastName: string;
  };
  onChange: (data: Partial<{ firstName: string; lastName: string }>) => void;
};

const NameQuestion: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold">What is your name?</h2>
      <TextField
        label="First Name"
        value={data.firstName}
        onChange={(e) => onChange({ firstName: e.target.value })}
        fullWidth
      />
      <TextField
        label="Last Name"
        value={data.lastName}
        onChange={(e) => onChange({ lastName: e.target.value })}
        fullWidth
      />
    </div>
  );
};

export default NameQuestion;
