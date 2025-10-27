import { useEffect, useState } from "react";
import { post, get, del, put } from "../../../store";
export default function useEvento() {
  const [messageSnackbar, setMessageSnackbar] = useState(
    "This is a success Alert inside a Snackbar!"
  );
  const [events, setEvents] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [event, setEvent] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = () => {
    setOpenSnackbar(true);
  };
  const handleOpenModal = () => {
    handleOpen();
    setEvent(null);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  const selectEvent = (evento) => {
    console.log("Evento seleccionado:", evento);
    setEvent(evento);
  };
  useEffect(() => {
    LoadTableData();
  }, []);
  const LoadTableData = () => {
    get("/v1/eventos/").then((data) => {
      console.log("Fetched eventos:", data);
      setEvents(data);
    });
  };
  const handleEdit = (evento) => {
    console.log("Editar Evento", evento);
    setEvent(evento);
    handleOpen();
  };
  const handleDelete = (eventoId) => {
    console.log("Eliminar Evento con ID:", eventoId);
    del(`/v1/eventos/${eventoId.id}`).then(() => {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventoId)
      );
      setMessageSnackbar("Evento eliminado exitosamente");
      setOpenSnackbar(true);
      LoadTableData();
    });
  };
  const handleCrearEvento = (params) => {
    console.log("Crear Evento", event);
    console.log("Parametros:", params);
    if (!event) {
      crearEvento(params)
        .then((response) => {
          console.log("Evento creado exitosamente:", response);
          setMessageSnackbar("Evento creado exitosamente");
          setOpenSnackbar(true);
          LoadTableData();
          handleClose();
        })
        .catch((error) => {
          console.error("Error al crear el evento:", error);
          setMessageSnackbar("Error al crear el evento");
          setOpenSnackbar(true);
        });
    } else {
      editarEvento(event.id, params)
        .then((response) => {
          console.log("Evento editado exitosamente:", response);
          setMessageSnackbar("Evento editado exitosamente");
          setOpenSnackbar(true);
          LoadTableData();
          handleClose();
        })
        .catch((error) => {
          console.error("Error al editar el evento:", error);
          setMessageSnackbar("Error al editar el evento");
          setOpenSnackbar(true);
        });
    }
  };
  const crearEvento = async (eventoData) => {
    try {
      const response = await post("/v1/eventos/", eventoData);
      console.log("Evento creado exitosamente:", response);
      return response;
    } catch (error) {
      console.error("Error al crear el evento:", error);
      throw error;
    }
  };
  const editarEvento = async (eventoId, eventoData) => {
    try {
      const response = await put(`/v1/eventos/${eventoId}`, eventoData);
      console.log("Evento editado exitosamente:", response);
      return response;
    } catch (error) {
      console.error("Error al editar el evento:", error);
      throw error;
    }
  };

  return {
    crearEvento,
    openSnackbar,
    setOpenSnackbar,
    event,
    setEvent,
    open,
    handleOpen,
    handleClose,
    handleCrearEvento,
    handleCloseSnackbar,
    handleClick,
    messageSnackbar,
    setMessageSnackbar,
    events,
    selectEvent,
    handleEdit,
    handleDelete,
    handleOpenModal,
  };
}
