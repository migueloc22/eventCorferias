import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import useForm2 from "../hooks/useform";

export const Form = ({ event, handleClose, handleCrearEvento }) => {
  const { formData, register, handleSubmit, errors, onSubmit } = useForm2(
    {
      event,
    },
    handleCrearEvento
  );

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ minWidth: 700, maxWidth: 900 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
            Crear Evento
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Nombre del evento"
                  {...register("nombre", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.nombre}
                  helperText={errors.nombre?.message}
                />
                <TextField
                  fullWidth
                  label="Fecha"
                  type="date"
                  {...register("fecha", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.fecha}
                  helperText={errors.fecha?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Hora"
                  type="time"
                  {...register("hora", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.hora}
                  helperText={errors.hora?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>

              {/* Segunda fila */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Ubicación"
                  {...register("ubicacion", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.ubicacion}
                  helperText={errors.ubicacion?.message}
                />
                <TextField
                  fullWidth
                  label="Cantidad total de boletos disponibles"
                  type="number"
                  {...register("boletos_totales", {
                    required: "Este campo es requerido",
                    min: { value: 1, message: "Debe ser al menos 1" },
                  })}
                  error={!!errors.boletos_totales}
                  helperText={errors.boletos_totales?.message}
                  inputProps={{ min: 1 }}
                />
              </Box>

              {/* Tercera fila */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Precio por boleto"
                  type="number"
                  {...register("precio_boleto", {
                    required: "Este campo es requerido",
                    min: { value: 0, message: "El precio debe ser positivo" },
                  })}
                  error={!!errors.precio_boleto}
                  helperText={errors.precio_boleto?.message}
                  inputProps={{ min: 0, step: "0.01" }}
                />
                <Box sx={{ flex: 1 }} />{" "}
                {/* Espacio vacío para mantener la estructura */}
              </Box>

              {/* Botones */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    console.log("Cancelar clicked");
                    console.log(typeof handleClose);
                    handleClose();
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" size="large">
                  {event ? "Actualizar Evento" : "Crear Evento"}
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
