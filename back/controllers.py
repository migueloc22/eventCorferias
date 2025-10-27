from sqlalchemy.orm import Session, aliased
from fastapi import Depends, FastAPI, HTTPException
import models, schemas


# Evento CRUD Operations
def get_evento(db: Session, evento_id: int):
    db_evento = db.query(models.Evento).filter(models.Evento.id == evento_id).first()
    if not db_evento:
        raise HTTPException(status_code=404, detail="Evento not found")
    return db_evento
def get_eventos(db: Session, skip: int = 0, limit: int = 100):
    eventos = db.query(models.Evento)\
    .where(models.Evento.is_active == True)\
    .order_by(models.Evento.fecha_hora.asc())\
    .offset(skip)\
    .limit(limit)\
    .all()
    if not eventos:
        raise HTTPException(status_code=404, detail="No eventos found")
    return eventos
def create_evento(db: Session, evento: schemas.EventoCreate):
    try:
        db_evento = models.Evento(**evento.model_dump())
        db.add(db_evento)
        db.commit()
        db.refresh(db_evento)
        print(f"Evento creado con ID: {db_evento.id}")  # Log para debug
        if not db_evento.id:
            raise HTTPException(status_code=500, detail="Error al generar ID del evento")
        return db_evento
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error creating evento: {str(e)}")
def update_evento(db: Session, evento_id: int, evento: schemas.EventoCreate):
    db_evento = db.query(models.Evento).filter(models.Evento.id == evento_id).first()
    if not db_evento:
        raise HTTPException(status_code=404, detail="Evento not found")
    db_evento.nombre = evento.nombre
    db_evento.ubicacion = evento.ubicacion
    db_evento.boletos_totales = evento.boletos_totales
    db_evento.boletos_disponibles = evento.boletos_disponibles
    db_evento.precio_boleto = evento.precio_boleto
    db_evento.fecha_hora = evento.fecha_hora
    db.commit()
    db.refresh(db_evento)
    return db_evento
def delete_evento(db: Session, evento_id: int):
    db_evento = db.query(models.Evento).filter(models.Evento.id == evento_id).first()
    if not db_evento:
        raise HTTPException(status_code=404, detail="Evento not found")
    # db.delete(db_evento)
    db_evento.is_active = False
    db.commit()
    db.refresh(db_evento)
    return {"detail": "Evento deleted"}
# Tipo_Documento CRUD Operations
def get_tipo_documents(db: Session, skip: int = 0, limit: int = 100):
    tipo_documents = db.query(models.Tipo_Documento).offset(skip).limit(limit).all()
    if not tipo_documents:
        raise HTTPException(status_code=404, detail="No Tipo_Documento found")
    return tipo_documents
def create_tipo_documento(db: Session, tipo_documento: schemas.TipoDocumentoCreate):
    db_tipo_documento = models.Tipo_Documento(**tipo_documento.model_dump())
    db.add(db_tipo_documento)
    db.commit()
    db.refresh(db_tipo_documento)
    return db_tipo_documento
# Venta CRUD Operations
def get_venta(db: Session, venta_id: int):
    db_venta = db.query(models.Venta).filter(models.Venta.id == venta_id).first()
    if not db_venta:
        raise HTTPException(status_code=404, detail="Venta not found")
    return db_venta
def get_ventas(db: Session, skip: int = 0, limit: int = 100):
    ventas = db.query(models.Venta).offset(skip).limit(limit).all()
    if not ventas:
        raise HTTPException(status_code=404, detail="No ventas found")
    return ventas
def create_venta(db: Session, venta: schemas.VentaBase):
    db_venta = models.Venta(**venta.model_dump())
    db.add(db_venta)
    db.commit()
    db.refresh(db_venta)
    return db_venta
def vender_boletos(db: Session, evento_id: int, venta_data: schemas.VentaCreate):
    db_evento = db.query(models.Evento).filter(models.Evento.id == evento_id).first()
    
    if not db_evento:
        raise HTTPException(status_code=404, detail=f"Evento con ID {evento_id} no encontrado")

    cantidad = venta_data.cantidad_boleto
    
    if cantidad <= 0:
        raise HTTPException(status_code=400, detail="La cantidad de boletos debe ser positiva.")

    if db_evento.boletos_disponibles < cantidad:
        raise HTTPException(status_code=400, detail=f"Stock insuficiente. Solo quedan {db_evento.boletos_disponibles} boletos disponibles.")



    # 3. Decrementar boletos_disponibles
    db_evento.boletos_disponibles -= cantidad
    db_venta = models.Venta(**venta_data.model_dump())

    
    db.add(db_venta)
    db.commit() # Ejecuta ambas operaciones (UPDATE y INSERT) en una transacción
    db.refresh(db_venta)
    db.refresh(db_evento) # Opcional: refrescar evento para ver el nuevo stock
    
    return db_venta
def update_venta(db: Session, venta_id: int, venta: schemas.VentaBase):
    db_venta = db.query(models.Venta).filter(models.Venta.id == venta_id).first()
    if not db_venta:
        raise HTTPException(status_code=404, detail="Venta not found")
    db_venta.description = venta.description
    db_venta.numero_documento = venta.numero_documento
    db_venta.nombre_comprador = venta.nombre_comprador
    db_venta.email_comprador = venta.email_comprador
    db_venta.precio_boleto = venta.precio_boleto
    db_venta.fk_id_evento = venta.fk_id_evento
    db_venta.fk_id_tipo_documento = venta.fk_id_tipo_documento
    db.commit()
    db.refresh(db_venta)
    return db_venta