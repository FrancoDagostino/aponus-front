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
  idAlmacenamiento: "Kg" | "Ud";
  idFraccionamiento: "cm" | "Ud" | "Kg" | '';
}
