import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
export default function useForm2(props, handleCrearEvento) {
  const [formData, setFormData] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const fechaHora = `${data.fecha}T${data.hora}`;
    let params = {
      nombre: data.nombre,
      ubicacion: data.ubicacion,
      boletos_totales: data.boletos_totales,
      boletos_disponibles: data.boletos_totales,
      precio_boleto: data.precio_boleto,
      fecha_hora: fechaHora,
    };
    console.log("Datos del formulario:", params);
    handleCrearEvento(params);
  };
  useEffect(() => {
    const { event } = props;
    if (event) {
      setValue("nombre", event.nombre);
      setValue("ubicacion", event.ubicacion);
      setValue("boletos_totales", event.boletos_totales);
      setValue("boletos_disponibles", event.boletos_disponibles);
      setValue("precio_boleto", event.precio_boleto);
      if (event.fecha_hora) {
        const [fecha, hora] = event.fecha_hora.split("T");
        setValue("fecha", fecha);
        setValue("hora", hora?.substring(0, 5)); // Toma solo HH:mm
      }
    }
  }, [props]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return {
    formData,
    handleChange,
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
  };
}
