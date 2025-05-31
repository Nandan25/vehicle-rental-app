import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
type Props = {
  data: { startDate: string; endDate: string };
  onChange: (data: Partial<{ startDate: string; endDate: string }>) => void;
};

const DateRangeQuestion: React.FC<Props> = ({ data, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Select Date Range</h2>
        <DatePicker
          label="Start Date"
          enableAccessibleFieldDOMStructure={false}
          value={data.startDate ? new Date(data.startDate) : null}
          onChange={(date) =>
            onChange({ startDate: date?.toISOString().split("T")[0] || "" })
          }
          slots={{
            textField: (textFieldProps) => <TextField {...textFieldProps} />,
          }}
        />
        <DatePicker
          label="End Date"
          enableAccessibleFieldDOMStructure={false}
          value={data.endDate ? new Date(data.endDate) : null}
          onChange={(date) =>
            onChange({ endDate: date?.toISOString().split("T")[0] || "" })
          }
          slots={{
            textField: (textFieldProps) => <TextField {...textFieldProps} />,
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateRangeQuestion;
