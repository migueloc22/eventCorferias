import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { get } from "../../../store";
export default function useFormVenta(event, handleCrearVenta) {
  const [formData, setFormData] = useState({});
  const [documentTypes, setDocumentTypes] = useState([]);
  const precioUnitario = event?.precio_boleto || 0.0;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fk_id_evento: event?.id || 0,
      precio_boleto: precioUnitario,
      cantidad_boletos: 1,
    },
  });
  const cantidadBoletos = watch("cantidad_boletos");
  useEffect(() => {
    return () => {
      console.log(event);
      get("/v1/tipo_documentos/").then((res) => {
        setDocumentTypes(res);
      });
    };
  }, []);

  const onSubmit = (data) => {
    let params = {
      description: data.description,
      numero_documento: data.numero_documento,
      nombre_comprador: data.nombre_comprador,
      email_comprador: data.email_comprador,
      cantidad_boleto: data.cantidad_boletos,
      precio_boleto: data.precio_boleto,
      fk_id_evento: data.fk_id_evento,
      fk_id_tipo_documento: data.fk_id_tipo_documento,
    };
    handleCrearVenta(data.fk_id_evento, params);
  };
  useEffect(() => {
    const cantidad = Number(cantidadBoletos) > 0 ? Number(cantidadBoletos) : 1;
    const nuevoValorFinal = cantidad * precioUnitario;
    setValue("precio_boleto", nuevoValorFinal);
  }, [cantidadBoletos]);
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
    documentTypes,
    precioUnitario,
  };
}
