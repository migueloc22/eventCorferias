import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input, // Importado para el campo hidden
} from "@mui/material";
import React from "react";
import useFormVenta from "../hooks/useFormVenta";

export const FormVenta = ({ event, handleCrearVenta, handleClose }) => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    documentTypes,
    precioUnitario,
  } = useFormVenta(event, handleCrearVenta);
  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ minWidth: 700, maxWidth: 900 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
            Crear Venta para: **{event?.nombre || "Evento Desconocido"}**
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Input
                type="hidden"
                {...register("fk_id_evento")}
                defaultValue={event?.id || 0}
              />

              <FormControl fullWidth error={!!errors.fk_id_tipo_documento}>
                <InputLabel id="fk_id_tipo_documento-label">
                  Tipo de Documento
                </InputLabel>
                <Select
                  labelId="fk_id_tipo_documento-label"
                  label="Tipo de Documento"
                  defaultValue=""
                  {...register("fk_id_tipo_documento", {
                    required: "El tipo de documento es obligatorio",
                  })}
                >
                  {documentTypes &&
                    documentTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.nombre}
                      </MenuItem>
                    ))}
                </Select>
                {errors.fk_id_tipo_documento && (
                  <Typography color="error" variant="caption">
                    {errors.fk_id_tipo_documento.message}
                  </Typography>
                )}
              </FormControl>

              <TextField
                label="Número de Documento"
                fullWidth
                type="text"
                error={!!errors.numero_documento}
                helperText={errors.numero_documento?.message}
                {...register("numero_documento", {
                  required: "El número de documento es obligatorio",
                  pattern: {
                    value: /^\d+$/,
                    message: "Solo se permiten números",
                  },
                })}
              />

              <TextField
                label="Nombre del Comprador"
                fullWidth
                type="text"
                error={!!errors.nombre_comprador}
                helperText={errors.nombre_comprador?.message}
                {...register("nombre_comprador", {
                  required: "El nombre del comprador es obligatorio",
                })}
              />
              <TextField
                label="Email del Comprador"
                fullWidth
                type="email"
                error={!!errors.email_comprador}
                helperText={errors.email_comprador?.message}
                {...register("email_comprador", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Formato de email inválido",
                  },
                })}
              />

              <TextField
                label="Cantidad de Boletos"
                fullWidth
                type="number"
                inputProps={{ min: 1 }}
                error={!!errors.cantidad_boletos}
                helperText={
                  errors.cantidad_boletos?.message ||
                  `Precio unitario: $${precioUnitario.toFixed(2)}`
                }
                {...register("cantidad_boletos", {
                  required: "La cantidad es obligatoria",
                  min: { value: 1, message: "Debe comprar al menos un boleto" },
                  valueAsNumber: true,
                })}
              />

              <TextField
                label="VALOR FINAL TOTAL (Precio Boleto)"
                fullWidth
                type="text"
                disabled
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <Typography color="textSecondary" sx={{ mr: 1 }}>
                      $
                    </Typography>
                  ),
                }}
                {...register("precio_boleto")}
                sx={{
                  "& .MuiInputBase-input": {
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  },
                  "& .MuiInputLabel-root": { fontWeight: "bold" },
                }}
              />

              <TextField
                label="Descripción (Opcional)"
                fullWidth
                multiline
                rows={2}
                type="text"
                error={!!errors.description}
                helperText={errors.description?.message}
                {...register("description")}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button variant="outlined" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="contained" type="submit" color="primary">
                  Registrar Venta
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
