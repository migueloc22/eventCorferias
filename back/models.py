from sqlalchemy  import Column, Integer, String ,ForeignKey, Float, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from db.Config import Base

class Evento(Base):
    __tablename__ = "evento"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), nullable=False)
    ubicacion = Column(String(255), nullable=False)
    boletos_totales = Column(Integer, nullable=False)
    boletos_disponibles = Column(Integer, nullable=False)
    precio_boleto = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True)
    fecha_hora = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    ventas = relationship("Venta", back_populates="evento") # Relacion uno a muchos con Venta

class Tipo_Documento(Base):
    __tablename__ = "tipo_documento"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    alias = Column(String(50), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    ventas = relationship("Venta", back_populates="tipo_documento") # Relacion uno a muchos con Venta
class Venta(Base):
    __tablename__ = "venta"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String(255), nullable=True)
    numero_documento = Column(String(100), nullable=False)
    nombre_comprador = Column(String(255), nullable=False)
    email_comprador = Column(String(255), nullable=False)
    precio_boleto = Column(Float, nullable=False)
    cantidad_boleto = Column(Integer )
    fk_id_evento = Column(Integer, ForeignKey("evento.id"))
    fk_id_tipo_documento = Column(Integer, ForeignKey("tipo_documento.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    evento = relationship("Evento", back_populates="ventas") # Relacion muchos a uno con Evento
    tipo_documento = relationship("Tipo_Documento", back_populates="ventas") # Relacion muchos a uno con Tipo_Documento