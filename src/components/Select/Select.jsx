import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ label="Выберите из списка", value, values, onChange, required}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{ label }</InputLabel>
        <Select
          labelId="select-label"
          value={value}
          label={label}
          onChange={onChange}
          required={required}
        >
            {
                values && values.map(item => 
                    <MenuItem key={`select-` + item.id} value={item.id}>{item.name}</MenuItem>
                )
            }
        </Select>
      </FormControl>
    </Box>
  );
}