# from typing import Union

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, controllers
from db.Config import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
# from db.Config import settings  
from dotenv import load_dotenv
load_dotenv()
import os
models.Base.metadata.create_all(bind=engine) # crea las tablas en la base de datos

app = FastAPI()
#cors
origins = [
    "http://localhost.tiangolo.com",
    "http://localhost:5173",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Instancia la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db # yield es como return pero para generadores
    finally:
        db.close()

# @app.get("/")
# def read_root():
#     return {"Hello": "World"}
#     # return {"Hello": os.getenv("DATABASE_URL")}
# Evento Endpoints
@app.get("/v1/eventos/{evento_id}", response_model=schemas.Evento,tags=['Eventos'])
def read_evento(evento_id: int, db: Session = Depends(get_db)):
    db_evento = controllers.get_evento(db, evento_id=evento_id)
    if db_evento is None:
        raise HTTPException(status_code=404, detail="Evento not found")
    return db_evento
@app.get("/v1/eventos/", response_model=list[schemas.Evento],tags=['Eventos'])
def read_eventos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    eventos = controllers.get_eventos(db, skip=skip, limit=limit)
    return eventos
@app.post("/v1/eventos/", response_model=schemas.EventoCreate,tags=['Eventos'])
def create_evento(evento: schemas.EventoCreate, db: Session = Depends(get_db)):
    return controllers.create_evento(db=db, evento=evento)
@app.put("/v1/eventos/{evento_id}", response_model=schemas.Evento,tags=['Eventos'])
def update_evento(evento_id: int, evento: schemas.EventoCreate, db: Session = Depends(get_db)):
    db_evento = controllers.get_evento(db, evento_id=evento_id)
    if db_evento is None:
        raise HTTPException(status_code=404, detail="Evento not found")
    return controllers.update_evento(db=db, evento_id=evento_id, evento=evento)
@app.delete("/v1/eventos/{evento_id}",tags=['Eventos'],summary="Eliminado logico")
def delete_evento(evento_id: int, db: Session = Depends(get_db)):
    db_evento = controllers.get_evento(db, evento_id=evento_id)
    if db_evento is None:
        raise HTTPException(status_code=404, detail="Evento not found")
    return controllers.delete_evento(db=db, evento_id=evento_id)
# NUEVA RUTA: Vender boletos para un evento específico
@app.post(
    "/v1/eventos/{evento_id}/vender", 
    response_model=schemas.Venta,
    tags=['Eventos'],
    summary="Registra una venta de boletos y actualiza el stock del evento."
)
def vender_boletos_para_evento(
    evento_id: int, 
    venta_data: schemas.VentaCreate, # Datos del comprador y cantidad
    db: Session = Depends(get_db)
):
    # La validación fk_id_evento en venta_data es redundante aquí, 
    # pero el controlador usa el evento_id del path.
    return controllers.vender_boletos(db=db, evento_id=evento_id, venta_data=venta_data)
# Tipo_Documento Endpoints
@app.get("/v1/tipo_documentos/", response_model=list[schemas.TipoDocumento],tags=['Tipo_Documento'])
def read_tipo_documentos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tipo_documentos = controllers.get_tipo_documents(db, skip=skip, limit=limit)
    return tipo_documentos
# Venta Endpoints
@app.post("/v1/ventas/", response_model=schemas.VentaCreate,tags=['Ventas'])
def create_venta(venta: schemas.VentaCreate, db: Session = Depends(get_db)):
    return controllers.create_venta(db=db, venta=venta)
@app.get("/v1/ventas/{venta_id}", response_model=schemas.Venta,tags=['Ventas'])
def read_venta(venta_id: int, db: Session = Depends(get_db)):
    db_venta = controllers.get_venta(db, venta_id=venta_id)
    if db_venta is None:
        raise HTTPException(status_code=404, detail="Venta not found")
    return db_venta
@app.put("/v1/ventas/{venta_id}", response_model=schemas.Venta,tags=['Ventas'])
def update_venta(venta_id: int, venta: schemas.VentaCreate, db: Session = Depends(get_db)):
    db_venta = controllers.get_venta(db, venta_id=venta_id)
    if db_venta is None:
        raise HTTPException(status_code=404, detail="Venta not found")
    return controllers.update_venta(db=db, venta_id=venta_id, venta=venta)