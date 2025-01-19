export interface IComponentAdd {
  idComponente?: string | '';
  idDescripcion: number;
  DiametroNominal: number | '';
  Diametro: number | '';
  Espesor: number | '';
  Longitud: number | '';
  Altura: number | '';
  Perfil: number | '';
  Tolerancia: string | '';
  Peso: number | '';
  idAlmacenamiento: string;
  idFraccionamiento: string
}

export interface IComponent {
  idInsumo: string;
  idDescripcion: number;
  diametro: number;
  diametroNominal: number;
  espesor: number;
  longitud: number;
  altura: number;
  perfil: number;
  tolerancia: string;
  peso: number;
  idFraccionamiento: string;
  idAlmacenamiento: string;
  idEstado: number;
  idEstadoNavigation: IDEstadoNavigation;
}

export interface IDEstadoNavigation {
  idEstado: number;
  descripcion: string;
}
