import {
  Alert,
  Box,
  Button,
  Fab,
  IconButton,
  Modal,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Form } from "./components";
// import { useNavigate } from "react-router-dom";
import useEvento from "./hooks/useEvento";
import {
  DeleteOutline,
  EditDocument,
  EditNotifications,
} from "@mui/icons-material";

export const Evento = () => {
  const {
    openSnackbar,
    event,
    // setEvent,
    open,
    // handleOpen,
    handleClose,
    handleCrearEvento,
    handleCloseSnackbar,
    // handleClick,
    messageSnackbar,
    events,
    handleEdit,
    handleDelete,
    handleOpenModal,
  } = useEvento();
  // const navigate = useNavigate();
  // const irAEvento = () => {
  //   // navigate(url); // 👈 redirige a la ruta especificada
  //   handleOpen();
  //   setEvent(null);
  // };
  return (
    <Box sx={{ p: 2, mt: 3, position: "relative", minHeight: "80vh" }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Eventos
      </Typography>
      {events.length === 0 ? (
        <Typography variant="h6">No hay eventos disponibles.</Typography>
      ) : (
        <TableContainer sx={{ maxHeight: 600, maxWidth: 1000 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  Acciones
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Nombre
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Ubicación
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Fecha
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Hora
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Boletos Disponibles
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Precio Boleto
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Boletos Totales
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event1, index) => (
                <TableRow key={index}>
                  <TableCell align="center" colSpan={2}>
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
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    {event1.nombre}
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    {event1.ubicacion}
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    {event1.fecha}
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    {event1.hora}
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    {event1.boletos_disponibles}
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    {event1.boletos_totales}
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    {event1.precio_boleto}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Fab
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        aria-label="Navigate"
        color="primary"
        onClick={handleOpenModal}
      >
        <AddIcon sx={{ mr: 1 }} />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "4px ",
            p: 4,
          }}
        >
          <Form
            event={event}
            handleClose={handleClose}
            handleCrearEvento={handleCrearEvento}
          />
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {messageSnackbar}
        </Alert>
      </Snackbar>
    </Box>
  );
};
