from pydantic import BaseModel, EmailStr, computed_field
from typing import Optional
from datetime import datetime

# Evento Schemas
class EventoBase(BaseModel):
    id: Optional[int] = None
    nombre: str
    ubicacion: str
    boletos_totales: int
    boletos_disponibles: int
    precio_boleto: float
    fecha_hora: datetime
class EventoCreate(EventoBase):
    nombre: str
    ubicacion: str
    boletos_totales: int
    boletos_disponibles: int
    precio_boleto: float
    fecha_hora: datetime
class Evento(EventoBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    @computed_field
    @property
    def fecha(self) -> str:
        return self.fecha_hora.strftime('%d/%m/%Y')
    
    @computed_field
    @property
    def hora(self) -> str:
        return self.fecha_hora.strftime('%H:%M')
    class Config:
        from_attributes = True
#  Tipo_Documento Schemas
class TipoDocumentoBase(BaseModel):
    nombre: str
    alias: str
class TipoDocumentoCreate(TipoDocumentoBase):
    pass
class TipoDocumento(TipoDocumentoBase):
    id: int
    nombre: str
    alias: str
    class Config:
        from_attributes = True
# Venta Schemas
class VentaBase(BaseModel):
        id: Optional[int] = None
        description: Optional[str] = None
        numero_documento: str
        nombre_comprador: str
        email_comprador: EmailStr
        cantidad_boleto: int
        precio_boleto: float
        fk_id_evento: int
        fk_id_tipo_documento: int
class VentaCreate(VentaBase):
    pass
class Venta(VentaBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    class Config:
        from_attributes = True