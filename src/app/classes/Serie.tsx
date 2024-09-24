import { Media } from './Media';

export class Serie implements Media {
    titulo: string;
    ano: number;
    genero: string;
    descricao: string;
    avaliacao: number;
    temporadas: number; 
    
    constructor(
      titulo: string,
      ano: number,
      genero: string,
      descricao: string,
      avaliacao: number,
      temporadas: number
    ) {
      this.titulo = titulo;
      this.ano = ano;
      this.genero = genero;
      this.descricao = descricao;
      this.avaliacao = avaliacao;
      this.temporadas = temporadas;
    }
  }