// Tipos generados a mano a partir de sysium_constructora_tablas.sql
// Si el schema cambia, actualizar este archivo (o generarlo con `supabase gen types`).

export type Database = {
  sysium_constructora: {
    Tables: {
      constructoras: {
        Row: {
          id: string
          owner_id: string
          nombre: string
          logo_url: string | null
          plan: 'free' | 'pro'
          whatsapp_from: string | null
          created_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          nombre: string
          logo_url?: string | null
          plan?: 'free' | 'pro'
          whatsapp_from?: string | null
          created_at?: string
        }
        Update: Partial<Database['sysium_constructora']['Tables']['constructoras']['Insert']>
        Relationships: []
      }
      clientes: {
        Row: {
          id: string
          constructora_id: string
          nombre: string
          whatsapp: string
          email: string | null
          portal_token: string
          created_at: string
        }
        Insert: {
          id?: string
          constructora_id: string
          nombre: string
          whatsapp: string
          email?: string | null
          portal_token?: string
          created_at?: string
        }
        Update: Partial<Database['sysium_constructora']['Tables']['clientes']['Insert']>
        Relationships: []
      }
      obras: {
        Row: {
          id: string
          constructora_id: string
          cliente_id: string
          nombre: string
          nombre_cliente: string | null
          direccion: string | null
          presupuesto_total: number
          abonado_total: number
          avance_pct: number
          status: 'activa' | 'pausada' | 'terminada' | 'cancelada'
          fecha_inicio: string | null
          fecha_estimada_fin: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          constructora_id: string
          cliente_id: string
          nombre: string
          nombre_cliente?: string | null
          direccion?: string | null
          presupuesto_total?: number
          abonado_total?: number
          avance_pct?: number
          status?: 'activa' | 'pausada' | 'terminada' | 'cancelada'
          fecha_inicio?: string | null
          fecha_estimada_fin?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['sysium_constructora']['Tables']['obras']['Insert']>
        Relationships: []
      }
      etapas: {
        Row: {
          id: string
          obra_id: string
          nombre: string
          nombre_cliente: string
          descripcion_cliente: string | null
          orden: number
          avance_pct: number
          status: 'pendiente' | 'activa' | 'completada'
          peso_pct: number
        }
        Insert: {
          id?: string
          obra_id: string
          nombre: string
          nombre_cliente: string
          descripcion_cliente?: string | null
          orden: number
          avance_pct?: number
          status?: 'pendiente' | 'activa' | 'completada'
          peso_pct?: number
        }
        Update: Partial<Database['sysium_constructora']['Tables']['etapas']['Insert']>
        Relationships: []
      }
      checklist_items: {
        Row: {
          id: string
          etapa_id: string
          descripcion: string
          descripcion_cliente: string | null
          completado: boolean
          completado_at: string | null
          completado_by: string | null
          orden: number
        }
        Insert: {
          id?: string
          etapa_id: string
          descripcion: string
          descripcion_cliente?: string | null
          completado?: boolean
          completado_at?: string | null
          completado_by?: string | null
          orden?: number
        }
        Update: Partial<Database['sysium_constructora']['Tables']['checklist_items']['Insert']>
        Relationships: []
      }
      actualizaciones: {
        Row: {
          id: string
          obra_id: string
          usuario_id: string
          comentario: string
          avance_pct_snapshot: number | null
          hubo_retraso: boolean
          motivo_retraso: string | null
          es_interno: boolean
          created_at: string
        }
        Insert: {
          id?: string
          obra_id: string
          usuario_id: string
          comentario: string
          avance_pct_snapshot?: number | null
          hubo_retraso?: boolean
          motivo_retraso?: string | null
          es_interno?: boolean
          created_at?: string
        }
        Update: Partial<Database['sysium_constructora']['Tables']['actualizaciones']['Insert']>
        Relationships: []
      }
      fotos: {
        Row: {
          id: string
          obra_id: string
          etapa_id: string | null
          actualizacion_id: string | null
          storage_path: string
          url_publica: string
          caption: string | null
          taken_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          obra_id: string
          etapa_id?: string | null
          actualizacion_id?: string | null
          storage_path: string
          url_publica: string
          caption?: string | null
          taken_at?: string | null
          created_at?: string | null
        }
        Update: Partial<Database['sysium_constructora']['Tables']['fotos']['Insert']>
        Relationships: []
      }
      documentos: {
        Row: {
          id: string
          obra_id: string
          nombre: string
          tipo: 'factura' | 'contrato' | 'presupuesto' | 'otro'
          storage_path: string
          fecha_documento: string | null
          es_confidencial: boolean
          created_at: string | null
        }
        Insert: {
          id?: string
          obra_id: string
          nombre: string
          tipo: 'factura' | 'contrato' | 'presupuesto' | 'otro'
          storage_path: string
          fecha_documento?: string | null
          es_confidencial?: boolean
          created_at?: string | null
        }
        Update: Partial<Database['sysium_constructora']['Tables']['documentos']['Insert']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      get_constructora_id: {
        Args: Record<string, never>
        Returns: string
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
