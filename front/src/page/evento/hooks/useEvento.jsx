import { useEffect, useState } from "react";
import { post, get, del, put } from "../../../store";
import { DeleteOutline, EditDocument, ShoppingCart } from "@mui/icons-material";
import { IconButton } from "@mui/material";
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
  const [openVenta, setopenVenta] = useState(false);
  const handleClick = () => {
    setOpenSnackbar(true);
  };
  const handleOpenModal = () => {
    handleOpen();
    setEvent(null);
    setopenVenta(false);
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
    setopenVenta(false);
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
  const handleCrearVenta = async (id, params) => {
    // post(`/v1/eventos/${id}/vender,params`).then((res) => {});
    try {
      const response = await post(`/v1/eventos/${id}/vender`, params);
      setMessageSnackbar("Boleto vendido");
      setOpenSnackbar(true);

      setEvent(null);
      setopenVenta(false);
      LoadTableData();
      handleClose();
      return response;
    } catch (error) {
      console.error("Error al crear la venta:", error);
      throw error;
    }
  };
  const handleCrearEvento = (params) => {
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
  const handleOpenVenta = (event) => {
    handleOpen();
    setEvent(event);
    setopenVenta(true);
  };
  const columns = [
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const event1 = params.row; // params.row contiene el objeto del evento
        return (
          <>
            <IconButton
              onClick={() => handleEdit(event1)}
              size="small"
              aria-label="editar"
            >
              <EditDocument />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(event1)}
              size="small"
              aria-label="eliminar"
            >
              <DeleteOutline />
            </IconButton>
            <IconButton
              onClick={() => handleOpenVenta(event1)}
              size="small"
              aria-label="eliminar"
            >
              <ShoppingCart />
            </IconButton>
          </>
        );
      },
    },
    { field: "nombre", headerName: "Nombre", flex: 1, minWidth: 150 },
    { field: "ubicacion", headerName: "Ubicación", flex: 1, minWidth: 150 },
    { field: "fecha", headerName: "Fecha", width: 120 },
    { field: "hora", headerName: "Hora", width: 100 },
    {
      field: "boletos_disponibles",
      headerName: "Disponibles",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "precio_boleto",
      headerName: "Precio Boleto",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "boletos_totales",
      headerName: "Totales",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
  ];

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
    columns,
    openVenta,
    setopenVenta,
    handleCrearVenta,
  };
}
